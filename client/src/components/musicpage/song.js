import React, {useEffect} from 'react';
import './song.css';
import Aos from 'aos';
import "aos/dist/aos.css";


function Song({song, onClick}) {

    useEffect(() => {
        Aos.init({duration: 1000, offset:20});
    }, []);

  return (
    <div className="song-bubble" data-aos="fade-up" onClick={() => onClick(song)}>
      <img className="album-art" src={song.album.images[0].url} alt="album art"></img>
      <div className ="song-info-container">
        <p1 className="song-title">{song.name}</p1>
        <p1 className="song-artist">{song.artists[0].name}</p1>
      </div>
    </div>
  );
}

export default Song;