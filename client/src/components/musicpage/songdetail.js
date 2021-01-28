import React from 'react';
import './songdetail.css';

function SongDetail({song}) {

    if(song !== undefined){
        return (
            <div className="modal-rectangle-detail">
                <div className="songdetail-flexbox">
                    <div className="song-details">
                        <img className="album-art-detail" src={song.album.images[0].url} alt="album art"></img>
                    </div>
                    <div className="song-name-artist-detail">
                        <div>{song.name}</div>
                        <div ><a href={song.external_urls.spotify} target="_blank" className="spotify-link" rel="noreferrer">Open in Spotify</a></div>
                    </div>
                </div>
            </div>
  );
    }

    return(
        <div></div>
    );
}


export default SongDetail;