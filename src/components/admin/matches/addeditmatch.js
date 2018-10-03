import React, { Component } from 'react';
import AdminLayout from '../../../high-order-comp/admin-layout'
import FormField from '../../ui/formFields'
import {validateFunction} from '../../ui/misc'

class AddEditMatch extends Component {

    state = {
        matchId:'',
        formType:'',
        forError: false,
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
                                    Check Error
                                </div>
                                :''
                            }
                            <div className='admin_submit'>
                                <button onClick={(event) => this.submitForm(event)}>
                                    {this.state.formType}
                                    Submit
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