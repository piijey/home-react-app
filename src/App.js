import React, { useState, useEffect, useRef } from 'react';
import WebFont from 'webfontloader';
import { BsTwitterX, BsGithub, BsVectorPen, BsInstagram } from "react-icons/bs";
import { RiRobot2Line } from "react-icons/ri";
import { PiButterfly } from "react-icons/pi";
import './App.css';
import { useBoard } from './Board';

WebFont.load({
  google: {
    families: ['Monomaniac One:400']
  }
});

const Title = () => (
  <>
    <div className="title">
      <h1>ピージェイのページ</h1>
    </div>
  </>
  );

const Footer = () => (
  <>
    <div className="footer">
    {/*
      <p className="cc">
      Sounds: 
      <a href="https://freesound.org/people/DrinkingWindGames/sounds/572954/">"Chicks" by DrinkingWindGames, Freesound</a> (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>), 
      <a href="https://freesound.org/people/mickleness/sounds/269198/">"game-win.mp3" by mickleness, Freesound</a> (<a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a>)
      </p>
    */}
    <a href="https://github.com/piijey/home-react-app"><BsGithub/>このページのソース</a>
    </div>
  </>
  );

const icons = {
  BsTwitterX: BsTwitterX,
  BsGithub: BsGithub,
  BsVectorPen: BsVectorPen,
  BsInstagram: BsInstagram,
  RiRobot2Line: RiRobot2Line,
  PiButterfly: PiButterfly,
};

const ListLinks = () => {
  const links = [
    { id: 0, title: "PiiJey", at: "GitHub", url: "https://github.com/piijey", icon: "BsGithub" },
    { id: 1, title: "@xiPJ", at: "X/Twitter", url: "https://twitter.com/xiPJ", icon: "BsTwitterX" },
    { id: 2, title: "@xipj.bsky.social", at: "Bluesky", url: "https://bsky.app/profile/xipj.bsky.social", icon: "PiButterfly" },
    { id: 2.5, title: "Piijey - Qiita", at: "Qiita", url: "https://qiita.com/piijey", icon: "BsVectorPen"},
    { id: 3, title: "アイソモカ", at: "はてなブログ", url: "https://isomocha.hatenablog.com", icon: "BsVectorPen" },
    { id: 4, title: "じんかい収集指定場所", at: "Instagram", url: "https://www.instagram.com/53syusyu/", icon: "BsInstagram" },
    { id: 5, title: "しりとりぼっと", at: "しりとりアプリ", url: "https://piijey.github.io/shiritori/", icon: "RiRobot2Line" },
  ];

  const listLinks = links.map(link => {
    const IconComponent = icons[link.icon];
    return (
      <div key={link.id}>
        <a className="icon-link" href={link.url} rel="me noreferrer" target="_blank">
          <IconComponent/>{link.title}
        </a>
      </div>
    );
  });
  return (<> {listLinks} </>);
}

// eslint-disable-next-line
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
      <button className="btn btn-primary" onClick={handleClick}>
        {isPlaying ? 'キュェー':'ぴぇぴぇ'}
      </button>
    </>
  );
}

function App() {
  const { Board } = useBoard();

  return (
    <div className="app">
    <Title />
    {//<div className="card p-0 mb-1">
      //<div className="card-body">
      //  <p>こんにちは、みなさん！</p>
      //    <SoundButton />
      //</div>
    //</div>
    }
    <div className="card p-0 mb-1">
      <div className="card-header"><h2>ミニゲーム</h2></div>
      <div className="card-body p-1">
        <Board />
      </div>
    </div>
    <div className="card p-0 mb-1">
      <div className="card-header"><h2>リンク</h2></div>
      <div className="card-body p-1">
        <ListLinks />
      </div>
    </div>
    <Footer />
  </div>
)};

export default App;
