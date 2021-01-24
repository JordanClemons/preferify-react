import React, {useState, useEffect} from 'react';
import './playlistbubble.css';

function PlaylistBubble({limit, time}) {

    const [timespan, setTimespan] = useState();

    useEffect(() =>{
        if(time === "short_term"){
            setTimespan("of the past month")
        }
        else if(time ==="medium_term"){
            setTimespan("of the past 6 months");
        }
        else if(time === "long_term"){
            setTimespan("of all time");
        }
      }, [time]);

  return (
    <div className="playlistbubble-container">
        <p1 className="playlist-title">Playlist Title</p1>
        <input className="playlist-input" type="text" placeholder={`My top ${limit} songs ${timespan}`}></input>
        <button className="playlistbubble-button">Make Playlist</button>
    </div>
  );
}

export default PlaylistBubble;