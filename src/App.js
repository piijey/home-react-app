import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Title = () => (
  <>
    <h1 className="header">PiiJeyのページ</h1>
    <p>こんにちは、みなさん！</p>
  </>
  );

const Footer = () => (
  <>
    <p className="footer"><a href="https://github.com/piijey/home-react-app">このページのソースコードを見る (GitHub)</a></p>
  </>
  );
  
const links = [
  { title: "@xiPJ - X/Twitter", url: "https://twitter.com/xiPJ", id: 0 },
  { title: "PiiJey - GitHub", url: "https://github.com/piijey", id: 1 },
  { title: "アイソモカ - はてなブログ", url: "https://isomocha.hatenablog.com", id: 2}
];

const ListLinks = () => {
  const listLinks = links.map(link =>
    <li key={link.id}><a href={link.url}>{link.title}</a></li>
    );
  return (
    <>
    <ul className="text-start">
      {listLinks}
    </ul>
    </>
  );
}

function MyButton() {
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
      <Button onClick={handleClick}>
        {isPlaying ? 'キュェー':'ぴぇぴぇ'}
      </Button>
      <p className="cc">Sound: <a href="https://freesound.org/people/DrinkingWindGames/sounds/572954/">"Chicks" by DrinkingWindGames Freesound</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>
    </>
  );
}

const App = () => (
  <div className="app">
    <Title />
    <img src="./icon.png" alt="(･ξ･)" />
    <MyButton />
    <Container className="d-flex justify-content-center">
      <ListLinks />
    </Container>
    <Footer />
  </div>
);

export default App;
