import React, { Component } from 'react';
import {firebaseMatches} from '../../../firebase-db'
import {firebaseForEach} from '../../ui/misc'

class Blocks extends Component {

    state = {
        matches:[]
    }

    componentDidMount(){
        firebaseMatches.limitToLast(6).once('value').then((snap)=> {
            const matches = firebaseForEach(snap) 
            console.log(snap.val())
            console.log(matches)
        })
    }

    showMatches = (val) => (
        <div>aw</div>
    )

    render() {
        return (
            <div className='home_matches'>
                {this.showMatches(this.state.matches)}
            </div>
        );
    }
}

export default Blocks;