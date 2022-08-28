import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../context/Modal';
import UserProfile from './UserProfile';
import EditServerForm from './EditServerForm'
import ChannelPage from './ChannelPage';
import ChannelForm from './ChannelForm';
import hashtag from '../CSS/images/channel-hashtag.svg'
import editGear from '../CSS/images/edit-channel-gear.svg'
import noChannels from '../CSS/images/no-text-channels.svg'
import '../CSS/ServerPage.css';
import '../CSS/EditServerForm.css'


const ServerPage = ({ serverId, generalChannelId, setGeneralChannelId, channelName, setChannelName, channelTopic, setChannelTopic }) => {
    const server = useSelector(state => state.servers[serverId])

    const users = useSelector(state => state.userSorted)
    const channelsObj = useSelector(state => state.servers.channels)

    let channels;
    if (channelsObj) {
        channels = Object.values(channelsObj)
    }
    const [isLoaded, setIsLoaded] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [channelId, setChannelId] = useState()
    const [showModal, setShowModal] = useState(false)
    const [showEditChannel, setShowEditChannel] = useState(false)
    const [showSection, setShowSection] = useState()
    const [showChannels, setShowChannels] = useState(true)
    const [editActive, setEditActive] = useState(false)

    console.log('serverId', serverId)
    console.log("SERVER", server)
    console.log('CHANNELS OBJ', channelsObj)

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
                <div className='ServerPage-name' onClick={() => { editServer(); setEditActive(!editActive) }}>{server.name}
                    <button className={editActive ? 'server-name-button fa-solid fa-x' : 'server-name-button fa-solid fa-angle-down'}></button>
                </div>
                <div className='ServerPage-channel-name'>
                    {channelName && <div className='noServer-nav'>
                        <img src={hashtag} alt='hashtag' className='noServer-icon-at' />
                        <div>{channelName}</div>
                        <div className='serverPage-channel-name-topic'>{channelTopic}</div>
                    </div>}
                </div>
                <div className='ServerPage-NavBar-buttons'></div>
                {showDropdown && (<EditServerForm setShowDropdown={setShowDropdown} serverId={serverId} setIsLoaded={setIsLoaded} />)}
            </div>
            <div className='ServerPage-content-container'>
                <div className='ServerPage-left-container'>
                    <div className='channel-header'>
                        <div className='channel-header-left' onClick={() => setShowChannels(!showChannels)}>
                            <div className={showChannels ? 'fa-solid fa-angle-down channel-down' : 'fa-solid fa-angle-down channel-down close'}></div>
                            <div className='channel-title'>CHANNEL</div>
                        </div>
                        <div className='add-channel-button'>
                            <div className='add-channel-icon fa-solid fa-plus' onClick={() => { setShowModal(true) }} />
                            {showModal && (
                                <Modal onClose={() => { setShowModal(false); setShowEditChannel(false) }}>
                                    <ChannelForm serverId={serverId} channelId={channelId} setShowModal={setShowModal} showEditChannel={showEditChannel} setShowEditChannel={setShowEditChannel} setChannelId={setChannelId} />
                                </Modal>
                            )}
                        </div>
                    </div>
                    <div className='serverPage-server-channels-outer'>
                        {showChannels ?
                            <div className='channels-main'>
                                {channels?.map((channel, i) => {
                                    return (
                                        <div key={i} className='server-channels' onClick={() => { setChannelId(channel.id); setGeneralChannelId(channel.id); setChannelName(channel.name); setChannelTopic(channel.topic) }}>
                                            <div className='channel-section-header' onMouseOver={() => { setShowSection(channel.id) }} onMouseLeave={() => setShowSection(0)}>
                                                <div className='channel-section-left'>
                                                    <div className='channel-hash-icon'><img src={hashtag} alt='hash' className='channel-hash-img' /></div>
                                                    <div className='channel-name'>{channel.name}</div>
                                                </div>
                                                <div className='edit-channel-button'>
                                                    <img src={editGear} alt='edit' className={channel.id === showSection ? 'channel-edit-gear' : 'channel-edit-gear-hidden'}
                                                        onClick={() => { setShowModal(true); setShowEditChannel(true) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div> : <>
                                {generalChannelId && (<div className='channels-main'>
                                    <div className='server-channels' onClick={() => { setChannelId(channelsObj[channelId]?.id) }}>
                                        <div className='channel-section-header' onMouseOver={() => { setShowSection(channelsObj[channelId]?.id) }} onMouseLeave={() => setShowSection(0)}>
                                            <div className='channel-section-left'>
                                                <div className='channel-hash-icon'><img src={hashtag} alt='hash' className='channel-hash-img' /></div>
                                                <div className='channel-name'>{channelsObj[channelId]?.name}</div>
                                            </div>
                                            <div className='edit-channel-button'>
                                                <img src={editGear} alt='edit' className={channelsObj[channelId]?.id === showSection ? 'channel-edit-gear' : 'channel-edit-gear-hidden'}
                                                    onClick={() => { setShowModal(true); setShowEditChannel(true) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                            </>
                        }
                    </div>
                    <div className='user-profile-container'>
                        <UserProfile />
                    </div>
                </div>
                {channels?.length > 0 ?
                    <div className='ServerPage-middle-container'>
                        <ChannelPage serverId={serverId} generalChannelId={generalChannelId} channelId={channelId} />
                    </div> :
                    <div className='no-text-channel-middle-container'>
                        <div><img src={noChannels} alt='no channels' /></div>
                        <div className='no-text-header'>NO TEXT CHANNELS</div>
                        <div className='no-text-caption'>You find yourself in a strange place. You don't have access to any text channels, or there are none in this server.</div>
                    </div>
                }
                <div className='ServerPage-right-container'>
                    <div className='Serverpage-right-content'>
                        {users?.map((user, i) => {
                            return (
                                <div key={i} className='server-user-container'>
                                    <div className='server-user'>
                                        <img src={user.profile_pic} alt='profile' className='user-profile-pic'></img>
                                        <p className='username'>{user.username}</p>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerPage;
