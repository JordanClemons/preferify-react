import React, {useState, useEffect} from 'react';
import './playlistbubble.css';

function PlaylistBubble({limit, time, savePlaylist, playlistname, setPlaylistname, finishPlaylist, playlistURL, playlistImages}) {

    const [timespan, setTimespan] = useState();
    const [submitPlaylistName, setSubmitPlaylistName] = useState("");

    const changePlaylistName = e =>{
        if(e.target.value.length <= 200){
            setPlaylistname(e.target.value);
        }
    }

    const checkPlaylistName = () =>{
        if(playlistname === ""){
            setSubmitPlaylistName("Preferify top songs " + timespan);
        }
        else{setSubmitPlaylistName(playlistname);}
    }


    useEffect(() =>{
        if(time === "short_term"){
            setTimespan("of the month")
        }
        else if(time ==="medium_term"){
            setTimespan("of 6 months");
        }
        else if(time === "long_term"){
            setTimespan("of all time");
        }
      }, [time]);

    useEffect(() =>{
        if(submitPlaylistName.length > 0){
            savePlaylist(submitPlaylistName);
        }
    }, [submitPlaylistName]);

  return (
    <div className="playlistbubble-container">
        <div className={`playlist-flexbox-${finishPlaylist}`}>
            <p1 className="playlist-title">Playlist Title</p1>
            <input className="playlist-input" type="text" placeholder={`Preferify top songs ${timespan}`} onChange={e => changePlaylistName(e)} value={playlistname}></input>
            <button className="playlistbubble-button" onClick={() => checkPlaylistName()}>Make Playlist</button>
        </div>
        <div className={`playlistdone-flexbox-${finishPlaylist}`}>
            <p1>Playlist created!</p1>
            <div className="images-flex">
            {playlistImages.map((image) =>
                <img className="playlist-image" src={image} alt="playlist thumbnail"></img>
            )}
            </div>
            <a href={playlistURL} target="_blank" className="playlist-link" rel="noreferrer">Open in Spotify</a>
        </div>
    </div>
  );
}

export default PlaylistBubble;