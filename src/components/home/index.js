import React from 'react';
import Featured from './featured'
import Matches from './matches/index'
import MeetPlayers from './meetPlayers'
import Promotion from './promotion/index'

const Home = () => {
    return (
        <div className='bck_blue'>
            <Featured></Featured>
            <Matches></Matches>
            <MeetPlayers></MeetPlayers>
            <Promotion></Promotion>
        </div>
    );
};

export default Home;