import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease'
import Animate from 'react-move/Animate'

class Stripes extends Component {

    state = {
        stripes: [
            {
                background: '#98c5e9',
                left: 120,
                rotate: 25,
                top: -260,
                delay: 50

            },
            {
                background: '#ffffff',
                left: 360,
                rotate: 25,
                top: -397,
                delay: 250

            },
            {
                background: '#98c5e9',
                left: 600,
                rotate: 25,
                top: -498,
                delay: 450

            },

        ]
    }

    showStripes = () => (
        this.state.stripes.map((value, i) => (
            <Animate
                key={i}
                show={true}

                start={{
                    background:'#ffffff',
                    opacity: 0,
                    left: 0,
                    rotate: 0,
                    top: 0
                }}

                enter={{
                    background: value.background,
                    opacity: [1],
                    left: [value.left],
                    rotate:[value.rotate],
                    top: [value.top],
                    timing:{delay:value.delay, duration: 300, ease:easePolyOut},
                    events: {
                        end() {
                            console.log('animation end')
                        }
                    }
                }}
            >
                {({opacity, left, rotate, top, background})=>{
                    return(                    
                        <div
                            className='stripe'
                            style={{
                                background,
                                opacity,
                                transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
                            }}
                        ></div>
                    )
                }}
            </Animate>
        ))
    )

    render() {
        return (
            <div className='featured_stripes'>
                {this.showStripes()}
            </div>
        );
    }
}

export default Stripes;