import React, { Component } from 'react';
import {firebaseMatches} from '../../../firebase-db'
import {firebaseForEach, reverseArray} from '../../ui/misc'
import MatchesBlock from '../../ui/matches_block'

class Blocks extends Component {

    state = {
        matches:[]
    }

    componentDidMount(){
        firebaseMatches.limitToLast(6).once('value').then((snap)=> {
            const matches = firebaseForEach(snap)
            
            this.setState({
                matches: reverseArray(matches)
            })
        })
    }

    showMatches = (matches) => (
        matches ?
            matches.map((match, i) => (
                <div className='item' key={i}>
                    <div className='wrapper' key={i}>
                        <MatchesBlock match={match} />
                    </div>
                </div>
            ))
        :null
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