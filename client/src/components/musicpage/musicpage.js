import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Song from './song.js';
import './musicpage.css';



function MusicPage() {

  var token = queryString.parse(window.location.search).access_token;
  const [songs, setSongs] = useState([]);
  const [time, setTime] = useState("short_term");
  const [limit, setLimit] = useState();
  const [load, setLoad] = useState(false);

  const [shortTerm, setShortTerm] = useState([]);
  const [mediumTerm, setMediumTerm] = useState([]);
  const [longTerm, setLongTerm] = useState([]);

  const getSongs = () =>{
    setLoad(true);
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50',{
    headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json())
    .then(data => setShortTerm(data.items))
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50',{
    headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json())
    .then(data => setMediumTerm(data.items))
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50',{
    headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json())
    .then(data => setLongTerm(data.items))
    setTimeout(() => setLoad(false), 500);
}

//Changes number of songs shown
const songSlice = () =>{

}

const handleLimit = e =>{
  setLimit(e.target.value);
  var newSongs =songs.slice(0, limit);
}

const handleTerm = e =>{
  setTime(e.target.value);
}

  useEffect(() =>{
    getSongs();
  }, []);

  useEffect(() =>{
    if(shortTerm.length > 0){
      setSongs(shortTerm);
      setLimit(10);
    }
  }, [shortTerm]);

  useEffect(() =>{
    if(time === "short_term"){
      var newSongs =shortTerm.slice(0, limit);
      setSongs(newSongs);
    }
    else if(time === "medium_term"){
      var newSongs = mediumTerm.slice(0, limit);
      setSongs(newSongs);
    }
    else if(time === "long_term"){
      var newSongs = longTerm.slice(0, limit);
      setSongs(newSongs);
    }
  }, [limit]);

  useEffect(() =>{
    if(time === "short_term"){
      var newSongs =shortTerm.slice(0, limit);
      setSongs(newSongs);
    }
    else if(time === "medium_term"){
      var newSongs =mediumTerm.slice(0, limit);
      setSongs(newSongs);
    }
    else if(time === "long_term"){
      var newSongs = longTerm.slice(0, limit);
      setSongs(newSongs);
    }
  }, [time]);

  useEffect(() =>{
  }, [limit, time]);

  if(token == null){
    return(
      <Redirect to="/"></Redirect>  //If not logged in go back to login
    )
  }

  return (
    <div>
      <div className="music-container">
        <div className="music-header-container">
          <h1 className='music-header'>Preferify</h1>
        </div>
        <div className ="music-input-container">
          <h1 className="music-top-header">Your top songs</h1>
          <select className="dropdown" onChange={handleLimit}>
            <option value="10">10 songs</option>
            <option value="25">25 songs</option>
            <option value="50">50 songs</option>
          </select>
          <select className="dropdown" onChange={handleTerm}>
            <option value="short_term">1 month</option>
            <option value="medium_term">6 months</option>
            <option value="long_term">all time</option>
          </select>
        </div>
        <div className="songs-container">
          {songs.map((song) =>
            <Song song={song}></Song>
          )}
        </div>
      </div>
      <div className={`visible-${load}`}><div>Loading</div></div>
    </div>
  );
}

export default MusicPage;