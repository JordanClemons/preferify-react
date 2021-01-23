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

    const DEVOPMENTLINK= "http://localhost:8888/login";
    const PRODUCTIONLINK= "https://preferify.herokuapp.com/login";

    return(
        <div>
            <div className="welcome-container">
                <div className="welcome-header-container">
                    <h1 className='welcome-header'>Preferify</h1>
                </div>
                <div className="welcome-paragraph">
                    <Typed
                    className="moving-text"
                    strings={['Find your favorite songs. At any time.', 'Make an awesome playlist.', 'Weclome to Preferify.']}
                    typeSpeed={40}
                    />
                    <p1 className="welcome-para-subtext header-sub">A place for all your favorite Spotify songs.</p1>
                </div>
                <form action={PRODUCTIONLINK}>
                    <button className="welcome-button">Connect to Spotify</button>
                </form>
            </div>
            <div className="otherinfo-container">
                <div>
                    <img src= {Placeholder} className="image"  data-aos="fade-up"/>
                </div>
                <div className="other-div" data-aos="fade-up">
                    <p1 className="welcome-para-text"  > Find your favorite songs. At any time.</p1>
                    <p1 className="welcome-para-subtext"  > Preferify uses Spotify's official API to find your most listened to songs of any time period.</p1>
                    <img src= {Placeholder} className="image" />
                </div>
                <div className="other-div" data-aos="fade-up">
                    <p1 className="welcome-para-text" >Make an awesome playlist.</p1>
                    <p1 className="welcome-para-subtext" >Transform your most listened to songs into a playlist with the touch of a button.</p1>
                    <img src= {Placeholder} className="image" />
                </div>
            </div>
            <div className="github-info" >
                <p1 className="creator">Created by Jordan Clemons</p1>
                <img src= {git} className="git-logo"/>
            </div>
        </div>
    )
}
export default WelcomePage;