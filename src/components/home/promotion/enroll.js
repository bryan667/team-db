import React, { Component } from 'react';
import Fade from 'react-reveal'
import FormField from '../../ui/formFields'
import {validateFunction} from '../../ui/misc'
import { firebasePromotions } from '../../../firebase-db'

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
            formData: tempFormData,
            formError: false
        })
    }

    resetForm(bool){
        const tempFormData = this.state.formData

        for (let items in tempFormData) {
            tempFormData[items].value = ''
            tempFormData[items].valid = false
            tempFormData[items].validationMessage = ''        
        }

        this.setState({
            formError: false,
            formData: tempFormData,
            formSuccess: bool ? 'Congratulations!' : 'Email already registered'
        })
        
        this.successMessage()

    }

    successMessage(){
        setTimeout(()=> {
            this.setState({
                formSuccess:''
            })
        },2000)
    }

    submitForm(event) {
        event.preventDefault()

        let dataToSubmit = {}
        let formIsValid = true

        //for in
        for (let items in this.state.formData) {
            
            dataToSubmit[items] = this.state.formData[items].value
            formIsValid = this.state.formData[items].valid
            
        }

        if (formIsValid) {
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value').then((snap) => {
                console.log(dataToSubmit)
                console.log(snap.val())
                if (snap.val() === null) {
                    firebasePromotions.push(dataToSubmit)
                    this.resetForm(true)
                } else {
                    this.resetForm(false)
                }

            })

        } else {
            this.setState({
                formError: true
            })
        }

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
                            {this.state.formError ? <div className='error_label'>Invalid email, please try again</div> : null}
                            <div className='success_label'>{this.state.formSuccess}</div>
                            <button onClick={(event) => this.submitForm(event)}>Enroll</button>
                            <div className='enroll_discl'>
                                Lorem ipsum dolor sit amet
                            </div>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;