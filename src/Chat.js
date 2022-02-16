import React, {useEffect, useRef, useState} from "react";
import './Chat.css';
import ChatHeader from "./ChatHeader";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";
import {selectChannelId, selectChannelName} from "./features/appSlice";
import db from './firebase';
import firebase from "firebase";


function Chat() {
    const user =useSelector(selectUser);
    const channelId =useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input,setInput] = useState("");
    const [messages,setMessages] = useState([]);

    useEffect(() => {
        if(channelId){
            db.collection("channels")
                .doc(channelId)
                .collection('messages')
                .orderBy('timestamp','asc')
                .onSnapshot((snapshot =>
                        setMessages(snapshot.docs.map((doc) => doc.data()))

                ))
        }

    },[channelId])
    const sendMessage = (event) => {
        event.preventDefault();
        db.collection("channels").doc(channelId).collection("messages")
            .add({
                message:input,
                user:user,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            })
        setInput('')

    }
    const chatBox = useRef()
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };
    return(
        <div className='chat'>
            <ChatHeader channelName={channelName}/>
            <div className='chat_messages' ref={chatBox}>
                {
                    messages.map((message) => (
                        <Message
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}

                        />
                    ))
                }
                <AlwaysScrollToBottom />
            </div>

            <div className='chat_input'>
                <AddCircleIcon font-size='large'/>
                <form>
                    <input
                        value={input}
                        type='text'
                        disabled={!channelId}
                        onChange={e => setInput(e.target.value)}
                        placeholder={`Mesaage # ${channelName}`}/>
                    <button  className='chat_InputButton' type='submit'onClick={sendMessage}>Send Message</button>
                </form>
                <div className="chat_InputIcons">
                    <CardGiftcardIcon font-size="large"/>
                    <GifIcon font-size="large"/>
                    <EmojiEmotionsIcon font-size="large"/>

                </div>
            </div>

        </div>
    )
}
export default Chat;
