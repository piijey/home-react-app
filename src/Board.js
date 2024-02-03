import React, { useState, useEffect, useRef } from "react";

export const useBoard = () => {
    function Square({value, onSquareClick}) {
        const colors = ['transparent', '#FBBE30', '#3CA69B', '#C72C65'];
        const colorNames = ['クリア', '黄', '青', '赤']; 
        const bgColor = colors[value] || 'transparent';
        const colorName = colorNames[value] || 'クリア';
        return (
        <button
        onClick={onSquareClick}
        className="btn rounded-0"
        style={{backgroundColor: bgColor, width: '50px', height: '50px'}}
        aria-label={`色: ${colorName}`}>
          {}
        </button>
        );
      }
      
      let clickTime = 0;
      function Board(){
        const [squares, setSquares] = useState(initSquares());
        const prevSquareRef = useRef(squares); //前回の squares
        const [playAudio, setPlayAudio] = useState(false);
        const timeoutRef = useRef(null); //setTimeout の id
      
        function initSquares() {
          // 0~3 の値（4未満の整数）をランダムに、9個生成
          return Array.from({ length: 9 }, () => Math.floor(Math.random() * 4))
        }
      
        function handleClick(i){
          clickTime += 1;
          const nextSquares = squares.slice();
          if (nextSquares[i] === 3){
            nextSquares[i] = 1;
          } else{
            nextSquares[i] = nextSquares[i]+1;
          }
          setSquares(nextSquares);
        }
      
        useEffect(() => {
          const changedIndex = hasBoardChanged()
          if (changedIndex !== -1){
            clearAligned(changedIndex);
          }
          prevSquareRef.current = squares;
      
          const allZeros = squares.every(square => square === 0);
          if (allZeros && !playAudio) {
            setPlayAudio(true);
          };
          // eslint-disable-next-line
        }, [squares]);
      
        useEffect(() => {
          if (playAudio) {
            let audio = new Audio('./sound/269198__mickleness__game-win.mp3');
            audio.play();
            audio.onended = () => {
              setSquares(initSquares())
              clickTime = 0;
              setPlayAudio(false);
            }
            return () => {
              audio.onended = null;
            }
          };
        }, [playAudio]);
      
        function hasBoardChanged(){
          for (let i = 0; i < squares.length; i++) {
            if (squares[i] !== prevSquareRef.current[i]) {
              return i //変化した（クリックされた）インデックスを返す
            }
          }
          return -1; //変化がない場合
        }
      
        function clearAligned(changedIndex) {
          let detected = false;
          //縦横斜めのいずれかが揃ったら、値を 0 にする
          const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
          ];
          const linesToCheck = lines.filter(line => line.includes(changedIndex))
          const nextSquares = squares.slice();
          for (let i = 0; i<linesToCheck.length; i++) {
            const [a, b, c] = linesToCheck[i];
            if (squares[a] !== 0 && squares[a] === squares[b] && squares[a] === squares[c] ) {
              detected = true;
              nextSquares[a] = 0;
              nextSquares[b] = 0;
              nextSquares[c] = 0;
            }
          }
          if (detected){
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
              setSquares(nextSquares)
              timeoutRef.current = null;
            }, 400);
          }
        };
      
        return (
        <>
          <div className="game-board">
            {[...Array(9)].map((_, index) => (
              <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />
            ))}
          </div>
          <div className="game-caption">
            {playAudio ? "おめでとう！" : "カラータイルをクリックして、色を揃えてね！"}<br/>
            クリックした回数: {clickTime}
          </div>
        </>
        )
      }
    return { Board };
};
