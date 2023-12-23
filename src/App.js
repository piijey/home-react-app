import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

import 'bootstrap-icons/font/bootstrap-icons.css';
import Form from 'react-bootstrap/Form';

const Title = () => (
  <>
    <h1 className="header">PiiJeyのページ</h1>
  </>
  );

const Footer = () => (
  <>
    <div className="footer">
    <p className="cc">
      Sounds: <a href="https://freesound.org/people/DrinkingWindGames/sounds/572954/">"Chicks" by DrinkingWindGames, Freesound</a> (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>), <a href="https://freesound.org/people/mickleness/sounds/269198/">"game-win.mp3" by mickleness, Freesound</a> (<a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a>).
    </p>
      <a href="https://github.com/piijey/home-react-app">このページのソースコードを見る (GitHub)</a>
    </div>
  </>
  );
  

const ListLinks = () => {
  const links = [
    { id: 0, title: "@xiPJ", at: "X/Twitter", url: "https://twitter.com/xiPJ", icon: "bi bi-twitter-x" },
    { id: 1, title: "PiiJey", at: "GitHub", url: "https://github.com/piijey", icon: "bi bi-github" },
    { id: 2, title: "アイソモカ", at: "はてなブログ", url: "https://isomocha.hatenablog.com", icon: "bi bi-vector-pen" },
  ];
  
  const listLinks = links.map(link =>
    <div key={link.id}>
      <a className="icon-link" href={link.url} rel="me">
        <i className={link.icon}/>{link.title}
      </a>
    </div>
    );
  return (
    <>
        {listLinks}
    </>
  );
}

function SoundButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('./sound/572954__drinkingwindgames__chicks.wav'));

  function handleClick() {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);
  
  return (
    <>
      <Button className="btn btn-primary" onClick={handleClick}>
        {isPlaying ? 'キュェー':'ぴぇぴぇ'}
      </Button>
    </>
  );
}


function Square({value, onSquareClick}) {
  const colors = ['transparent', '#FBBE30', '#3CA69B', '#C72C65']
  const bgColor = colors[value] || 'transparent';
  return (
  <button
  onClick={onSquareClick}
  className="btn rounded-0"
  style={{backgroundColor: bgColor, width: '50px', height: '50px'}}>
    {}
  </button>
  );
}

function Board(){
  const clickTimeRef = useRef(0);
  const [squares, setSquares] = useState(initSquares());
  const prevSquareRef = useRef(squares); //前回の squares
  const [playAudio, setPlayAudio] = useState(false);
  const timeoutRef = useRef(null); //setTimeout の id
  const soundOn = useRef(true);

  function initSquares() {
    // 0~3 の値（4未満の整数）をランダムに、9個生成
    return Array.from({ length: 9 }, () => Math.floor(Math.random() * 4))
  }

  function handleClick(i){
    clickTimeRef.current += 1;
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
  }, [squares, playAudio]);

  useEffect(() => {
    if (playAudio) {
      let audio = new Audio('./sound/269198__mickleness__game-win.mp3');
      if (!soundOn.current) {
        audio.volume = 0;
      };
      audio.play();
      audio.onended = () => {
        setSquares(initSquares())
        clickTimeRef.current = 0;
        setPlayAudio(false);
      }
      return () => {
        audio.onended = null;
      }
  };
  }, [playAudio]);

  function SwitchSound() {
    const handleSwitchChange = (event) => {
      soundOn.current = event.target.checked;
      console.log("スイッチが切り替わりました。現在の状態: ", soundOn.current);
      // ここで必要な処理を追加する
    };
  
    return (
      <>
      <Container>
        <Stack direction="horizontal" gap={1}>
          <span xxs="true"><i className="bi bi-volume-mute"/></span>
          <span xxs="true">
            <Form>
              <Form.Check 
                type="switch"
                id="custom-switch" 
                aria-label="sound switch"
                defaultChecked={soundOn.current}
                onClick={handleSwitchChange}
              />
            </Form>
          </span>
          <span xxs="true" ><i className="bi bi-volume-down" /></span>
        </Stack>
      </Container>
    </>
    );
  }

  return (
  <>
  <div className='game'>
    <div className="board-container">
      {[...Array(9)].map((_, index) => (
        <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />
      ))}
    </div>
    </div>
    <p className="caption">
      {playAudio ? "おめでとう！" : "カラータイルをクリック！"}<br/>
      クリックした回数: {clickTimeRef.current}
    </p>
    <div className="gamesoundswitch">
      <SwitchSound/>
    </div>
  </>
  )
}

const App = () => (
  <div className="app">
    <Title />
    <div className="card text-bg-light mb-2" style={{width: '18rem'}}>
      <Container>
        <div className="card-body">
        <p>こんにちは、みなさん！</p>
          <SoundButton />
        </div>
      </Container>
    </div>
    <div className="card text-bg-light p-2 mb-2" style={{width: '18rem'}}>
        <Board />
    </div>
    <div className="card text-bg-light" style={{width: '18rem'}}>
      <div className="card-body">
        <ListLinks />
      </div>
    </div>
    <Footer />
  </div>
);

export default App;
