import React from 'react';
import Featured from './featured'
import Matches from './matches/index'

const Home = () => {
    return (
        <div className='bck_blue'>
            <Featured></Featured>
            <Matches></Matches>
        </div>
    );
};

export default Home;