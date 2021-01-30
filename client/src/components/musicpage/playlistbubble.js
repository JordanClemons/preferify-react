import React, {useState, useEffect} from 'react';
import logo from '../images/spotify-logo.png';
import twitterLogo from '../images/twitter-logo.png';
import './playlistbubble.css';

function PlaylistBubble({limit, time, savePlaylist, playlistname, setPlaylistname, finishPlaylist, playlistURL, playlistImages}) {

    const [timespan, setTimespan] = useState();
    const [submitPlaylistName, setSubmitPlaylistName] = useState("");
    const [tweetSpan, setTweetSpan] = useState("");
    const [tweetIntent, setTweetIntent] = useState("");

    const changePlaylistName = e =>{
        if(e.target.value.length <= 200){
            setPlaylistname(e.target.value);
        }
    }

    const checkPlaylistName = () =>{
        console.log("j");
        if(playlistname === ""){
            setSubmitPlaylistName("Preferify top songs " + timespan);
        }
        else{setSubmitPlaylistName(playlistname);}
    }


    useEffect(() =>{
        if(time === "short_term"){
            setTimespan("of the month");
            setTweetSpan("of+the+month");
        }
        else if(time ==="medium_term"){
            setTimespan("of 6 months");
            setTweetSpan("of+the+last+6+months");
        }
        else if(time === "long_term"){
            setTimespan("of all time");
            setTweetSpan("of+all+time");
        }
      }, [time]);

    useEffect(() =>{
        if(submitPlaylistName.length > 0){
            savePlaylist(submitPlaylistName);
        }
    }, [submitPlaylistName]);

    useEffect(() => {
        setTweetIntent("https://twitter.com/intent/tweet?hashtags=Preferify&text=Check+out+my+top+songs " + tweetSpan + "!&url=" + playlistURL);
    }, [playlistURL]);

  return (
    <div className="playlistbubble-container">
        <div className={`playlist-flexbox-${finishPlaylist}`}>
            <p1 className="playlist-title">Playlist Title</p1>
            <input className="playlist-input" type="text" placeholder={`Preferify top songs ${timespan}`} onChange={e => changePlaylistName(e)} value={playlistname}></input>
            <button className="playlistbubble-button" onClick={() => checkPlaylistName()}>Make Playlist</button>
        </div>
        <div className={`playlistdone-flexbox-${finishPlaylist}`}>
            <p1 className="playlist-created">Playlist created!</p1>
            <div className="images-flex">
            {playlistImages.map((image) =>
                <img className="playlist-image" src={image} alt="playlist thumbnail"></img>
            )}
            </div>
            <div className="option-container">
                <form action={playlistURL} target="_blank" rel="noreferrer">
                    <button className="open-container">
                        <p1 className="playlist-link">Open in Spotify &nbsp; </p1>
                        <img src={logo} alt="spotify logo" className="spotify-logo"></img>
                    </button>
                </form>
                <a href={tweetIntent} target="_blank" rel="noreferrer" className="twitter-link">
                    <button className="open-container">
                        <p1 className="playlist-link">Share on Twitter &nbsp; </p1>
                        <img src={twitterLogo} alt="spotify logo" className="twitter-logo"></img>
                    </button>
                </a>
            </div>
        </div>
    </div>
  );
}

export default PlaylistBubble;