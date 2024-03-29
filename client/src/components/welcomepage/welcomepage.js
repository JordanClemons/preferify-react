import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Typed from 'react-typed';
import Aos from 'aos';
import queryString from 'query-string';
import "aos/dist/aos.css";
import './welcomepage.css';
import Image1 from '../images/mac-iphone.png';
import iPadImg from '../images/ipad.png';
import demo from '../images/demo-trim.gif';
import git from '../images/github-logo.png';

const WelcomePage = () =>{

    const [token, setToken] = useState();

    useEffect(() => {
        Aos.init({duration: 2000, offset:15});
    }, []);

    useEffect(() => {
        var str = queryString.parse(window.location.search).access_token;
        setToken(str);
    }, []);

    const DEVOPMENTLINK= "http://localhost:8888/login";
    const PRODUCTIONLINK= "https://www.preferify.app/login";

    if(token !== undefined){
        return(
            <Redirect to={{pathname: "/music", token:{token}}}></Redirect>
        )
    }

    return(
        <div>
            <div className="welcome-container">
                <div className="welcome-header-container">
                    <h1 className='welcome-header'>Preferify</h1>
                </div>
                <div className="welcome-paragraph">
                    <Typed
                    className="moving-text"
                    strings={['Find your top songs. At any time.', 'Make an awesome playlist.', 'Welcome to Preferify.']}
                    typeSpeed={40}
                    />
                    <p1 className="welcome-para-subtext header-sub">A place for all your favorite Spotify songs.</p1>
                </div>
                <form action={PRODUCTIONLINK}>
                    <button className="welcome-button">Connect to Spotify</button>
                </form>
            </div>
            <div className="otherinfo-container">
                <div className="main-div" data-aos="fade-up">
                    <img src= {Image1} className="image main-image" alt="design on mac"/>
                </div>
                <div className="ipad-div" data-aos="fade-up">
                    <div className="vert-flex">
                        <p1 className="welcome-para-text"  > Find your favorite songs.</p1>
                        <p1 className="welcome-para-subtext"  > Preferify uses Spotify's official API to find your most listened to songs.</p1>
                    </div>
                    <img src= {iPadImg} className="ipad" alt="design on ipad"/>
                </div>
                <div className="other-div" data-aos="fade-up">
                    <p1 className="welcome-para-text" >Make an awesome playlist.</p1>
                    <p1 className="welcome-para-subtext" >Transform your most listened to songs into a playlist with the touch of a button.</p1>
                    <img src= {demo} className="image2" alt="demo gif"/>
                </div>
            </div>
            <div className="github-info" >
                <a className="creator" href={"mailto:devbyjordan@gmail.com"}>Created by Jordan Clemons</a>
            </div>
        </div>
    )
}
export default WelcomePage;