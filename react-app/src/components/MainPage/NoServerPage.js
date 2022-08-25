import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import wumpus from '../CSS/images/wumpus.svg'
import empty_dms from '../CSS/images/empty_dms.svg'
import '../CSS/NoServerPage.css';


const NoServerPage = () => {
    const users = useSelector(state => Object.values(state.users))
    const [isLoaded, setIsLoaded] = useState(false)


    return (
        <div className='NoServerPage-container'>
            <div className='NoServerPage-NavBar'></div>
            <div className='NoServerPage-content-container'>
                <div className='NoServerPage-left-container'>
                    <img alt='empty_dms' src={empty_dms} className='empty_dms'/>
                </div>
                <div className='NoServerPage-middle-container'>
                    <img alt='Wumpus' src={wumpus} className='wumpus-image' />
                    <div>
                        <p className='wumpus-image'>Wumpus is waiting on friends. You don't have to though!</p>
                    </div>
                </div>
                <div className='NoServerPage-right-container'>
                    <h3>It's quiet for now...</h3>
                    <p>When a friend starts an activity-like playing a game or hanging out on voice-we'll show it here!</p>
                </div>
            </div>
        </div>
    );

};

export default NoServerPage;
