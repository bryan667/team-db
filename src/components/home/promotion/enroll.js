import React, { Component } from 'react';
import Fade from 'react-reveal'
import FormField from '../../ui/formFields'
import {validateFunction} from '../../ui/misc'

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
                    type: 'text',
                    placeholder: 'Enter Email here'
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

        //validation check
        let validateResult = validateFunction(tempElement)
        tempElement.valid = validateResult[0]
        tempElement.validationMessage = validateResult[1]
        tempFormData[tempID] = tempElement

        this.setState({
            formData: tempFormData
        })
    }

    submitForm(event) {
        event.preventDefault()

        let dataToSubmit = {}
        let formIsValid = true

        //for in statement
        for (let items in this.state.formData) {
            dataToSubmit[items] = this.state.formData[items].value
        }

        console.log(dataToSubmit)

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
                            <button onClick={(event) => this.submitForm(event)}>Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;