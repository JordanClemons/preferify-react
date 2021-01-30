import React, { useEffect, useRef, useState } from 'react';
import queryString from 'query-string';
import {BrowserRouter as Router, Route, Switch, Link, Redirect, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faCompactDisc} from '@fortawesome/free-solid-svg-icons'
import Typed from 'react-typed';
import Song from './song.js';
import SongDetail from './songdetail.js';
import PlaylistBubble from './playlistbubble.js';
import git from '../images/github-logo.png';
import './musicpage.css';



function MusicPage() {

  const [token, setToken] = useState("");
  const [songs, setSongs] = useState([]);
  const [time, setTime] = useState("short_term");
  const [limit, setLimit] = useState();
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState();
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlistname, setPlaylistname] = useState("");
  const [songURI, setSongURI] = useState([]);
  const [playlistURL, setPlaylistURL] = useState("");
  const [finishplaylist, setFinishplaylist] = useState(false);
  const [playlistImages, setPlaylistImages] = useState([]);

  const [shortTerm, setShortTerm] = useState([]);
  const [mediumTerm, setMediumTerm] = useState([]);
  const [longTerm, setLongTerm] = useState([]);

  const node = useRef();
  const node2 = useRef();

  /* UseEffect renders */

  useEffect(() =>{
    getToken();
  }, []);

  useEffect(() =>{
    if(token !== "" && token !== undefined){
      getSongs();
    }
  }, [token]);

  useEffect(() =>{
    if(shortTerm !== undefined){
      if(shortTerm.length > 0 && shortTerm !== undefined){
        setSongs(shortTerm);
        setLimit(10);
      }
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

  useEffect(() => {
      setSongURI(songs.map(song => song.uri))
      /* Generating playlist image */
      if(songs.length > 0){
        var images = [];
        for(var x = 0; x < 4; x++){
          images.push(songs[x].album.images[0].url);
        }
        setPlaylistImages(images);
      }
  }, [songs]);

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);

    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, []);

  var init = useLocation().token;
  if(init === undefined && localStorage.getItem("token") === undefined){
    return(<Redirect to= "/"></Redirect>)
  }

  /* Spotify functions */
  
  const getToken = () => {
    if(init !== undefined){
      localStorage.setItem('token', init.token);
      setToken(init.token);
    }
    else if(localStorage.getItem("token") !== undefined){
      setToken(localStorage.getItem("token"));
    }
  }

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

const savePlaylist = (playlistName) =>{
  fetch('https://api.spotify.com/v1/me',{
    headers: {'Authorization': 'Bearer ' + token}
  }).then(response => response.json())
  .then((data) => {
    var userID = data.id;
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
      body: JSON.stringify({name: playlistName})
    }).then(response => response.json())
    .then((data) => {
      setPlaylistURL(data.external_urls.spotify);
      var playlistID = data.id;
      fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        method: 'POST', 
        headers: {'Authorization': 'Bearer ' + token},
        body: JSON.stringify({uris: songURI})
      }).then((setFinishplaylist(true)))
    })
  })
}

/* Little Functions */

const handleLimit = e =>{
  setLimit(e.target.value);
}

const handleTerm = e =>{
  setTime(e.target.value);
}

const modalOn = (song) => {
  setModal(!modal);
  setSelectedSong(song);
}

const playlistModalOn = () =>{
  setPlaylistModal(!playlistModal);
}

const closeModal = e => {
  if(node.current !== undefined && node2.current !== undefined){
    if (node.current.contains(e.target) || node2.current.contains(e.target)){
      // inside click
      return;
    }
  }
  // outside click
  setModal(false);
  setSelectedSong();
  setPlaylistModal(false);
  setPlaylistname("");
  setPlaylistURL("");
  setFinishplaylist(false);
};



  /* Returns */

  if(token === undefined){
    return (<Redirect to="/" />);
  }

  if(shortTerm === undefined){
    return (<Redirect to="/" />);
  }

  return (
    <div>
      <div className="music-container">
        <div className ="music-input-container">
          <h1 className="music-top-header">Your top songs</h1>
          <div className="select-container">
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
          
        </div>
        <div className="songs-container">
          {songs.map((song) =>
            <Song song={song} onClick={modalOn}></Song>
          )}
        </div>
        <div className="git-info">
                <a className="git-creator" href={"mailto:devbyjordan@gmail.com"}>Created by Jordan Clemons</a>
        </div>
        <div className='music-header'>
            <Typed
                    strings={['Preferify']}
                    typeSpeed={40}
                    />
          </div>
      </div>
      <div className="playlist-button"><div className="button-flex" onClick={() => playlistModalOn()}><FontAwesomeIcon icon={faCompactDisc} size="3x" className="playlist-icon"/> <div className="playlist-button-text">Playlist</div></div></div>
      <div className={`modal-background modalvisible-${modal}`}>
        <div ref={node}><SongDetail song={selectedSong} ></SongDetail></div>
      </div>
      <div className={`visible-${load}`}><div className="spinner"><FontAwesomeIcon icon={faCircleNotch} class="fa-spin"/>Loading</div></div>
      <div className={`modal-background modalvisible-${playlistModal}`}>
        <div ref={node2}><PlaylistBubble limit={limit} time={time} savePlaylist={savePlaylist} playlistname={playlistname} setPlaylistname={setPlaylistname} finishPlaylist={finishplaylist} playlistURL={playlistURL} playlistImages={playlistImages}></PlaylistBubble></div>
      </div>
    </div>
  );
}

export default MusicPage;