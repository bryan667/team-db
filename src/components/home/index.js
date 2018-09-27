import React from 'react';
import Featured from './featured'
import Matches from './matches/index'
import MeetPlayers from './meetPlayers'

const Home = () => {
    return (
        <div className='bck_blue'>
            <Featured></Featured>
            <Matches></Matches>
            <MeetPlayers></MeetPlayers>
        </div>
    );
};

export default Home;