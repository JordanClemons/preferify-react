import React, {useEffect} from 'react';
import Typed from 'react-typed';
import Aos from 'aos';
import "aos/dist/aos.css";
 import './welcomepage.css';
 import Placeholder from '../images/placeholder-image1.jpg';
 import git from '../images/github-logo.png';

const WelcomePage = () =>{
    useEffect(() => {
        Aos.init({duration: 2000});
    }, []);

    return(
        <div>
            <div className="welcome-container">
                <div className="welcome-header-container">
                    <h1 className='welcome-header'>Preferify</h1>
                </div>
                <div className="welcome-paragraph">
                    <Typed
                    strings={['Find your favorite songs. At any time.', 'Make an awesome playlist.', 'Weclome to Preferify.']}
                    typeSpeed={40}
                    />
                </div>
                <button className="welcome-button">Connect to Spotify</button>
            </div>
            <div className="otherinfo-container">
                <img src= {Placeholder} className="image"  data-aos="fade-up"/>
                <p1 className="welcome-para-text"  data-aos="fade-up"> Find your favorite songs. At any time.</p1>
                <p1 className="welcome-para-subtext"  data-aos="fade-up"> Preferify uses Spotify's official API to find your most listened to songs of any time period.</p1>
                <img src= {Placeholder} className="image" data-aos="fade-up"/>
                <p1 className="welcome-para-text" data-aos="fade-up">Make an awesome playlist.</p1>
                <p1 className="welcome-para-subtext"  data-aos="fade-up">Transform your most listened to songs into a playlist with the touch of a button.</p1>
                <img src= {Placeholder} className="image" data-aos="fade-up"/>
            </div>
            <div className="github-info" >
                <p1 className="creator">Created by Jordan Clemons</p1>
                <img src= {git} className="git-logo"/>
            </div>
        </div>
    )
}
export default WelcomePage;