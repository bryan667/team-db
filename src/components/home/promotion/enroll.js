import React, { Component } from 'react';
import Fade from 'react-reveal'
import FormField from '../../ui/formFields'

class Enroll extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }


    updateForm(event) {
        const tempValue = event.event.target.value
        const tempID = event.id
        
        const tempFormData = this.state.formData
        const tempElement = tempFormData[tempID]

        tempElement.value = tempValue
        tempFormData[tempID] = tempElement

        this.setState({
            formData: tempFormData
        })
    }

    render() {
        return (
            <Fade>
                <div className='enroll_wrapper'>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <div className='enroll_title'>
                            Enter your Email
                        </div>
                        <div className='enroll_input'>
                            <FormField
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(event) => this.updateForm(event)}
                            ></FormField>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;