import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import wumpus from '../CSS/images/wumpus.svg'
import messageBubble from '../CSS/images/message-bubble.svg'
import { createDirectChat, removeDirectChat } from '../../store/directChat';
import DirectChat from './DirectChat'

import '../CSS/NoServerPage.css';
import '../CSS/ServerPage.css';
import { findDirectChat } from '../../store/directMessages';

const NoServerPage = ({ directChatId, setDirectChatId, showFriends, setShowFriends }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session)
    const users = useSelector(state => Object.values(state.users))
    const directChats = useSelector(state => Object.values(state.directChat))
    const [recipientId, setRecipientId] = useState()
    const [userChat, setUserChat] = useState()


    const allUsersInChat = []
    directChats.forEach(chat => {
        allUsersInChat.push(chat.recipient_id)
        allUsersInChat.push(chat.sender_id)
    })

    const displayDirectChat = (chatId, userId) => {
        dispatch(findDirectChat(chatId))

        console.log(chatId)

        setDirectChatId(chatId)
        setRecipientId(userId)
        setUserChat(users[userId - 1]?.username)
        setShowFriends(false)
    }

    const uniqueUsersInChat = new Set(allUsersInChat)

    const newDirectChat = (recipientId) => {

        const chatData = {
            sender_id: currentUser.user.id,
            recipient_id: recipientId
        }

        dispatch(createDirectChat(chatData))
    }

    const openDirectChat = (recipientId) => {
        setRecipientId(recipientId)
        setShowFriends(false)

        let check = false
        directChats.forEach(chat => {
            if (chat.recipient_id === recipientId) check = true
            if (chat.sender_id == recipientId) check = true

            if (check === true) setDirectChatId(chat.id)
        })
    }

    return (
        <div className='ServerPage-container'>
            <div className='ServerPage-NavBar'>
                <div className='ServerPage-name'></div>
                <div className='ServerPage-channel-name'>
                    {directChatId &&
                        <div>
                            @{userChat}
                        </div>}
                    {showFriends && <div>Friends</div>}
                </div>
                <div className='ServerPage-NavBar-buttons'></div>
                <div></div>
                <div></div>
            </div>
            <div className='ServerPage-content-container'>
                <div className='ServerPage-left-container'>
                    <div className='noServer-channel-header'>
                        <div onClick={() => { setShowFriends(true); setDirectChatId(null) }}>Friends</div>
                        <div>Direct Messages</div>
                    </div>
                    {directChats?.map((directChat, i) => {
                        if (currentUser.user.id === directChat.recipient_id) {
                            return (
                                <div key={i} className='direct-chat-recipient' onClick={() => { displayDirectChat(directChat.id, directChat.sender_id) }}>
                                    <div className='direct-chat-profile-pic'>
                                        <img src={users[directChat.sender_id - 1]?.profile_pic} style={{ height: "38px" }} />
                                    </div>
                                    {users[directChat.sender_id - 1]?.username}
                                </div>
                            )
                        } else
                            return (
                                <div key={i} className='direct-chat-recipient' onClick={() => { displayDirectChat(directChat.id, directChat.recipient_id) }}>
                                    <div className='direct-chat-profile-pic'>
                                        <img src={users[directChat.recipient_id - 1]?.profile_pic} style={{ height: "38px" }} />
                                    </div>
                                    {users[directChat.recipient_id - 1]?.username}
                                </div>
                            )
                    })}
                </div>
                {directChatId ? (
                    <div className='ServerPage-middle-container'>
                        <div>
                            <img src={users[recipientId - 1]?.profile_pic} style={{ height: "100px" }} />
                        </div>
                        <div>
                            {users[recipientId - 1]?.username}
                        </div>
                        <div>This is the beginning of your direct message history with @{users[recipientId - 1]?.username}</div>
                        <DirectChat directChatId={directChatId} />
                    </div>
                ) : showFriends ? (
                    <div className='ServerPage-middle-container'>
                        <div className='main-friends-list'>
                            {users?.map((user, i) => {
                                if (!uniqueUsersInChat.has(user.id)) {
                                    return (
                                        <>
                                            <div key={i} className='friends-users'>
                                                <div className='friend-users-left'>
                                                    <div>
                                                        <img src={user.profile_pic} className='friend-profile-pic'></img>
                                                    </div>
                                                    <div><span className='friend-username'>{user.username}</span></div>
                                                </div>
                                                <div className='message-bubble-outer' onClick={() => newDirectChat(user.id)}>
                                                    <img src={messageBubble} className='message-bubble-icon' />
                                                </div>
                                            </div>
                                        </>
                                    )
                                } else if (user.id !== currentUser.user.id) {
                                    return (
                                        <>
                                            <div key={i} className='friends-users'>
                                                <div className='friend-users-left'>
                                                    <div>
                                                        <img src={user.profile_pic} className='friend-profile-pic'></img>
                                                    </div>
                                                    <div><span className='friend-username'>{user.username}</span></div>
                                                </div>
                                                <div className='message-bubble-outer' onClick={() => { openDirectChat(user.id) }}>
                                                    <img src={messageBubble} className='message-bubble-icon' />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            })}
                        </div>
                    </div>
                ) : (
                    <div className='noServerPage-middle-container'>
                        <div className='wumpus-main'>
                            <img alt='Wumpus' src={wumpus} className='wumpus-image' />
                            <div className='wumpus-caption'>Wumpus is waiting on friends. You don't have to though!</div>
                        </div>
                    </div>
                )}
                {showFriends && (<div className='noServerPage-right-container'>
                    <h3>It's quiet for now...</h3>
                    <div className='no-online-friends'>When a friend starts an activity-like playing a game or hanging out on voice-we'll show it here!</div>
                </div>)}
            </div>
        </div >
    );
};

export default NoServerPage;
