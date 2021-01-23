import React, {useEffect} from 'react';
import './song.css';
import Aos from 'aos';
import "aos/dist/aos.css";


function Song(song) {

    useEffect(() => {
        Aos.init({duration: 1000, offset:20});
    }, []);

    console.log(song.song.artists[0].name);
  return (
    <div className="song-bubble" data-aos="fade-up">
      <img className="album-art" src={song.song.album.images[0].url}></img>
      <div className ="song-info-container">
        <p1 className="song-title">{song.song.name}</p1>
        <p1 className="song-artist">{song.song.artists[0].name}</p1>
      </div>
    </div>
  );
}

export default Song;