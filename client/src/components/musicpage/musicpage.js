import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Song from './song.js';
import './musicpage.css';



function MusicPage() {

  var token = queryString.parse(window.location.search).access_token;
  const [songs, setSongs] = useState([]);

  const getSongs = () =>{
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10',{
    headers: {'Authorization': 'Bearer ' + token}
    }).then(response => response.json())
    .then(data => setSongs(data.items)) 
}

  useEffect(() =>{
    getSongs();
  }, []);

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
          <select className="dropdown">
            <option value="50">10 songs</option>
            <option value="100">25 songs</option>
            <option value="500">50 songs</option>
          </select>
          <select className="dropdown">
            <option value="1 month">1 month</option>
            <option value="6 months">6 months</option>
            <option value="all time">all time</option>
          </select>
        </div>
        <div className="songs-container">
          {songs.map((song) =>
            <Song song={song}></Song>
          )}
        </div>
      </div>
    </div>
  );
}

export default MusicPage;