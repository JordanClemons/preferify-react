import React from 'react';
import Typing from 'react-typing-animation';
import './welcomepage.css';
import Placeholder from '../images/placeholder-image1.jpg';
import Github from '../images/github-logo.png';

function WelcomePage() {
  return (
    <div className="welcome-container">
        <div className="welcome-header-container">
            <h1 className='welcome-header'>Preferify</h1>
        </div>
        <Typing speed={40} className="welcome-paragraph">
            Your favorite Spotify songs. All in one place.
        </Typing>
        <button className="welcome-button">Connect to Spotify</button>
        <div className="otherinfo-container">
            <img src= {Placeholder} className="image"/>
            <p1 className="welcome-para-text">Find your most listened to songs, at any time.</p1>
            <img src= {Placeholder} className="image"/>
            <p1 className="welcome-para-text">Easily make an awesome playlist.</p1>
            <img src= {Placeholder} className="image"/>
        </div>
        <div className="github-info">
            <p1 className="creator">Created by Jordan Clemons</p1>
            <img src= {Github} className="git-logo"/>
        </div>
    </div>
  );
}

export default WelcomePage;