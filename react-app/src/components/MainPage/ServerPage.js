import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditServerForm from './EditServerForm'
import '../CSS/ServerPage.css';
import '../CSS/EditServerForm.css'


const ServerPage = ({ id }) => {
    // const dispatch = useDispatch()
    const server = useSelector(state => state.server[id])
    const channels = useSelector(state => Object.values(state.server.channels))
    const [isLoaded, setIsLoaded] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        if (channels) {
            setIsLoaded(true)
        }
    }, [isLoaded, channels])

    const editServer = () => {
        setShowDropdown(!showDropdown)
    }

    return isLoaded && (
        <div className='ServerPage-container'>
            <div className='ServerPage-NavBar'>
                <div className='ServerPage-name'>{server.name}<button className='server-name-button' onClick={editServer}><i className="fas fa-angle-down"></i></button></div>
                <div className='ServerPage-channel-name'></div>
                <div className='ServerPage-NavBar-buttons'></div>
                {showDropdown && (<EditServerForm setShowDropdown={setShowDropdown} />)}
            </div>
            <div className='ServerPage-left-container'>
                <div className='channels-main'>
                    {channels?.map((channel, i) => { return (<div key={i} className='server-channels'>{channel.name}</div>) })}
                </div>
            </div>
            <div className='ServerPage-middle-container'>
                <div className='channel-chat'>

                </div>
            </div>
            <div className='ServerPage-right-container'>

            </div>
        </div>

    );

};

export default ServerPage;
