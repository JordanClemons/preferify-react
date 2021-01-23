import React, {useEffect} from 'react';
import './song.css';
import Aos from 'aos';
import "aos/dist/aos.css";


function Song(song) {

    useEffect(() => {
        Aos.init({duration: 1000, offset:20});
    }, []);

  return (
    <div className="song-bubble" data-aos="fade-up">
      <img className="album-art" src={song.song.album.images[0].url}></img>
      <p1 className="song-title">{song.song.name}</p1>
    </div>
  );
}

export default Song;