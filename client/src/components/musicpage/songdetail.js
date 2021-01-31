import React from 'react';
import './songdetail.css';
import logo from '../images/spotify-logo.png';

function SongDetail({song}) {

    if(song !== undefined){
        return (
            <div className="modal-rectangle-detail">
                <img className="album-art-detail" src={song.album.images[0].url} alt="album art"></img>
                <div className="song-name">{song.name}</div>
                <form action={song.external_urls.spotify} target="_blank" rel="noreferrer">
                    <button className="open-song-container">
                        <p1 className="spotify-link">Open in Spotify&nbsp;</p1>
                        <img src={logo} alt="spotify logo" className="spotify-logo-song"></img>
                    </button>
                </form>
            </div>
  );
    }

    return(
        <div></div>
    );
}


export default SongDetail;