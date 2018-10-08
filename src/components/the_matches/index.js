import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'

import {firebaseMatches} from '../../firebase-db'
import { firebaseForEach, reverseArray } from "../ui/misc";

class TheMatches extends Component {
    render() {
        return (
            <div>
                the matches
            </div>
        );
    }
}

export default TheMatches;