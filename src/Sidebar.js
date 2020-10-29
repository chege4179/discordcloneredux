import React, {useEffect, useState} from "react";
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CallIcon from '@material-ui/icons/Call';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import MicIcon from "@material-ui/icons/Mic";
import HeadSetIcon from "@material-ui/icons/Headset";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";
import db, {auth} from "./firebase";


function Sidebar() {
    const user = useSelector(selectUser);
    const  [channels,setChannnels] = useState([]);
    useEffect(() => {
        db.collection("channels").onSnapshot((snapshot => {
            setChannnels(snapshot.docs.map((doc) => ({
                id:doc.id,
                channel:doc.data(),

            })))
        }))
    },[])
    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");
        if(channelName){
            db.collection("channels").add({
                channelName:channelName,

            })
        }
    }
    return(
        <div className='sidebar'>
            <div className='sidebar_top'>
                <h3>DDD</h3>
                <ExpandMoreIcon/>
            </div>
            <div className='sidebar_channels'>
                <div className='sidebar_channelsHeader'>
                    <div className='sidebar_header'>
                        <ExpandMoreIcon/>
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon className='sidebar_addChannels'onClick={handleAddChannel}/>
                </div>
                <div className='sidebar_channelList'>
                    {
                        channels.map(({id,channel}) => (
                            <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                        ))
                    }
                </div>

            </div>
            <div className='sidebar_voice'>
                <SignalCellularAltIcon
                className = "sidebar_voiceIcon"
                font-size="large"
                />
                <div className='sidebar_voiceInfo'>
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className='sidebar_voiceIcons'>
                    <InfoOutlinedIcon/>
                    <CallIcon/>
                </div>
            </div>
            <div className='sidebar_profile'>
                <Avatar src={user.photo} onClick={()=>auth.signOut()}/>
                <div className='sidebar_profileInfo'>
                    <h3>{user.displayName}</h3>
                    <p>{user.uid.substring(0,5)}</p>
                </div>
                <div className='sidebar_profileIcons'>
                    <MicIcon/>
                    <HeadSetIcon/>
                    <SettingsIcon/>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;
