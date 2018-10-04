import React, { Component } from 'react';
import AdminLayout from '../../../high-order-comp/admin-layout'
import FormField from '../../ui/formFields'
import {validateFunction} from '../../ui/misc'

import {firebaseTeams, firebaseDB, firebaseMatches} from '../../../firebase-db'
import { firebaseForEach, reverseArray } from '../../ui/misc'

class AddEditMatch extends Component {

    state = {
        matchId:'',
        formType:'Add Match',
        formError: false,
        formSuccess:'',
        teams:[],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event date',
                    name: 'date_input',
                    type: 'date',
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select Local Team',
                    name: 'select_local',
                    type: 'select',
                    options:[]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select Away Team',
                    name: 'select_away',
                    type: 'select',
                    options:[]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Away',
                    name: 'result_away_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text',
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text',
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team Result',
                    name: 'select_result',
                    type: 'select',
                    options:[
                        {key:'W', value:'W'},
                        {key:'L', value:'L'},
                        {key:'D', value:'D'},
                        {key:'n/a', value:'n/a'},
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game Played ?',
                    name: 'select_played',
                    type: 'select',
                    options:[
                        {key:'Yes', value:'Yes'},
                        {key:'No', value:'No'},
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
        }
    }

    componentDidMount() {
        const matchId = this.props.match.params.id

        const getTeams = (match, type) => {
            firebaseTeams.once('value')
            .then((snap) => {
                const teams = firebaseForEach(snap)
                const teamOptions = []
                snap.forEach((item) => {
                    teamOptions.push ({
                        key: item.val().shortName,
                        value: item.val().shortName
                    })
                })

                this.updateFields(match,teamOptions,teams,type,matchId)
            })
        }

        if (!matchId) {
                getTeams(false, 'Add Match')
        } else {
            firebaseDB.ref(`matches/${matchId}`).once('value')
            .then((snap) => {
                const match = snap.val()
                getTeams(match, 'Edit Match')
            })
        }
    }

    updateFields(match,teamOptions,teams,type,matchId) {
        const newFormdata = {
            ...this.state.formData
        }

        for (let awyis in newFormdata) {
            if (match) {
                newFormdata[awyis].value = match[awyis]
                newFormdata[awyis].valid = true
            }
            if (awyis === 'local' || awyis === 'away') {
                newFormdata[awyis].config.options = teamOptions
            }
        }

        this.setState ({
            matchId: matchId,
            formType: type,
            formData: newFormdata,
            teams: teams
        })
    }

    updateForm(event) {
        const tempValue = event.event.target.value
        const tempID = event.id

        const tempFormData = this.state.formData
        const tempElement = tempFormData[tempID]

        tempElement.value = tempValue

        //validation check
        let validateResult = validateFunction(tempElement)
        tempElement.valid = validateResult[0]
        tempElement.validationMessage = validateResult[1]
        tempFormData[tempID] = tempElement

        this.setState({
            formData: tempFormData,
            formError: false
        })
    }

    successForm(message) {
        this.setState({
            formSuccess: message
        })

        setTimeout(()=> {
            this.setState({
                formSuccess: ''
            })
        }, 2000)
    }

    submitForm(event) {
        event.preventDefault()

        let dataToSubmit = {}
        let formIsValid = true

        //for in
        for (let items in this.state.formData) {
            
            dataToSubmit[items] = this.state.formData[items].value
            formIsValid = this.state.formData[items].valid && formIsValid
        }

        //append thumbnails
        this.state.teams.forEach((team)=> {
            if (team.shortName === dataToSubmit.local) {
                dataToSubmit['localThmb'] = team.thmb
            }
            if (team.shortName === dataToSubmit.away) {
                dataToSubmit['awayThmb'] = team.thmb
            }
        })

        if (formIsValid) {
            if (this.state.formType === 'Edit Match') {
                //EDIT MATCH
                firebaseDB.ref(`matches/${this.state.matchId}`)
                .update(dataToSubmit).then(()=> {
                    this.successForm('This match has been updated')
                }).catch((e)=> {
                    this.setState({
                        formError: true
                    })
                })
            } else {
                //ADD MATCH
                firebaseMatches.push(dataToSubmit).then(()=> {
                    //route back to admin_matches
                    this.props.history.push('/admin_matches')
                }).catch((e)=> {
                    this.setState({formError: true})
                })
            }

        } else {
            this.setState({
                formError: true
            })
        }

    }

    render() {
        return (
            <AdminLayout>
                <div className='editmatch_dialog_wrapper'>
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>
                                <FormField
                                    id={'date'}
                                    formData={this.state.formData.date}
                                    change={(event) => this.updateForm(event)}
                                ></FormField>

                                <div className='select_team_layout'>
                                    <div className='label_inputs'>Local</div>
                                    <div className='wrapper'>
                                        <div className='left'>
                                            <FormField
                                                id={'local'}
                                                formData={this.state.formData.local}
                                                change={(event) => this.updateForm(event)}
                                            ></FormField>
                                        </div>
                                        <div>
                                            <FormField
                                                id={'resultLocal'}
                                                formData={this.state.formData.resultLocal}
                                                change={(event) => this.updateForm(event)}
                                            ></FormField>
                                        </div>
                                    </div>
                                </div>

                                <div className='select_team_layout'>
                                    <div className='label_inputs'>Away</div>
                                    <div className='wrapper'>
                                        <div className='left'>
                                            <FormField
                                                id={'away'}
                                                formData={this.state.formData.away}
                                                change={(event) => this.updateForm(event)}
                                            ></FormField>
                                        </div>
                                        <div>
                                            <FormField
                                                id={'resultAway'}
                                                formData={this.state.formData.resultAway}
                                                change={(event) => this.updateForm(event)}
                                            ></FormField>
                                        </div>
                                    </div>
                                </div>
                                <div className='split_fields'>
                                    <FormField
                                        id={'referee'}
                                        formData={this.state.formData.referee}
                                        change={(event) => this.updateForm(event)}
                                    ></FormField>
                                    <FormField
                                        id={'stadium'}
                                        formData={this.state.formData.stadium}
                                        change={(event) => this.updateForm(event)}
                                    ></FormField>
                                </div>
                                <div className='split_fields'>
                                    <FormField
                                        id={'result'}
                                        formData={this.state.formData.result}
                                        change={(event) => this.updateForm(event)}
                                    ></FormField>
                                    <FormField
                                        id={'final'}
                                        formData={this.state.formData.final}
                                        change={(event) => this.updateForm(event)}
                                    ></FormField>                           
                                </div>

                                <div className='success_label'>{this.state.formSuccess}</div>

                                {this.state.formError ?
                                    <div className='error_label'>
                                        Please check some of the required fields
                                    </div>
                                    :''
                                }

                                <div className='admin_submit'>
                                    <button onClick={(event) => this.submitForm(event)}>
                                        {this.state.formType}
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditMatch;