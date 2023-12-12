import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Title = () => (
  <>
    <h1 className="header">PiiJeyのページ</h1>
  </>
  );

const Footer = () => (
  <><p className="footer">
    <p className="cc">
      Sounds: <a href="https://freesound.org/people/DrinkingWindGames/sounds/572954/">"Chicks" by DrinkingWindGames, Freesound</a> (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>), <a href="https://freesound.org/people/mickleness/sounds/269198/">"game-win.mp3" by mickleness, Freesound</a> (<a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a>).
    </p>
    <a href="https://github.com/piijey/home-react-app">このページのソースコードを見る (GitHub)</a></p>
  </>
  );
  
const links = [
  { id: 0, title: "@xiPJ", at: "X/Twitter", url: "https://twitter.com/xiPJ", icon: "bi bi-twitter" },
  { id: 1, title: "PiiJey", at: "GitHub", url: "https://github.com/piijey", icon: "bi bi-github" },
  { id: 2, title: "アイソモカ", at: "はてなブログ", url: "https://isomocha.hatenablog.com", icon: "bi bi-vector-pen" },
];

const ListLinks = () => {
  const listLinks = links.map(link =>
    <div key={link.id}>
      <a className="icon-link" href={link.url}>
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
  const audioRef = useRef(new Audio('./572954__drinkingwindgames__chicks.wav'));

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
  const colors = ['transparent', '#FDB967', '#6B82B8', '#55BF76'];
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
  const [squares, setSquares] = useState(Array.from({ length: 9 }, () => Math.floor(Math.random() * 4)));

  function handleClick(i){
    const nextSquares = squares.slice();
    if (nextSquares[i] === 3){
      nextSquares[i] = 0;
    } else{
      nextSquares[i] = nextSquares[i]+1;
    }
    setSquares(nextSquares);
  }
  useEffect(() => {
    const allZeros = squares.every(square => square === 0);
    if (allZeros) {
      const audio = new Audio('./269198__mickleness__game-win.mp3');
      audio.play();
    }
  }, [squares]);

  return (
    <div className="board-container">
      {[...Array(9)].map((_, index) => (
        <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />
      ))}
    </div>
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
      <div className="game">
        <Board />
      </div>
      <p className="caption">
      カラータイルをクリックして透明にしてね
      </p>
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
