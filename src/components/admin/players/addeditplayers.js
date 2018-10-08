import React, { Component } from 'react'
import AdminLayout from '../../../high-order-comp/admin-layout'

import FormField from '../../ui/formFields'
import { validateFunction } from '../../ui/misc'

import FileLocalUploader from '../../ui/fileuploader'
import { firebasePlayers, firebaseDB, firebase } from '../../../firebase-db'

class AddEditPlayers extends Component {

    state = {
        playerId:'',
        formType:'',
        formError: false,
        formSuccess:'',
        defaultImg:'',
        formData:{
            name:{
                element:'input',
                value:'',
                config:{
                    label: 'Player Name',
                    name:'name_input',
                    type: 'text'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            lastname:{
                element:'input',
                value:'',
                config:{
                    label: 'Player Last name',
                    name:'lastname_input',
                    type: 'text'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            number:{
                element:'input',
                value:'',
                config:{
                    label: 'Player number',
                    name:'number_input',
                    type: 'text'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            position:{
                element:'select',
                value:'',
                config:{
                    label: 'Select a position',
                    name:'select_position',
                    type: 'select',
                    options: [
                        {key:"Keeper",value:"Keeper"},
                        {key:"Defence",value:"Defence"},
                        {key:"Midfield",value:"Midfield"},
                        {key:"Striker",value:"Striker"}
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showLabel: true
            },
            image:{
                element:'image',
                value:'',
                validation:{
                    required: true
                },
                valid:false
            }
        }
    }

    updateFields = (player, playerId, formType , defaultImg) => {
        const newFormdata = { ...this.state.formData}

        for(let key in newFormdata){
            newFormdata[key].value = player[key];
            newFormdata[key].valid = true
        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formData: newFormdata
        })
    }


    componentDidMount(){
        console.log('props', this.props)
        const playerId = this.props.match.params.id;

        if(!playerId){
            this.setState({
                formType:'Add Player'
            })
        } else {
            console.log('awyis')
           firebaseDB.ref(`players/${playerId}`).once('value')
           .then(snapshot => {
               const playerData = snapshot.val();

                firebase.storage().ref('players')
                .child(playerData.image).getDownloadURL()
                .then( url => {
                    this.updateFields(playerData,playerId,'Edit Player',url)
                }).catch( e => {
                    this.updateFields({
                        ...playerData,
                        image:''
                    },playerId,'Edit Player','')
                })
           })
        }

    }


    updateForm(element, content = ''){
        const newFormdata = {...this.state.formData}
        const newElement = { ...newFormdata[element.id]}

        if(content === ''){
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content
        }
        
        let validData = validateFunction(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormdata
        })
    }


    successForm = (message) => {
        this.setState({
            formSuccess: message
        });
        setTimeout(()=>{
            this.setState({
                formSuccess:''
            });
        },2000)

    }

    submitForm(event){
        event.preventDefault();
        
        let dataToSubmit = {};
        let formIsValid = true;

        for(let items in this.state.formData){
            dataToSubmit[items] = this.state.formData[items].value;
            formIsValid = this.state.formData[items].valid && formIsValid;
        }
    
        if(formIsValid){
            if(this.state.formType === 'Edit Player'){
                firebaseDB.ref(`players/${this.state.playerId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Player has been updated');
                }).catch(e=>{
                    this.setState({formError: true})
                })
            } else {
                firebasePlayers.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_players')
                }).catch(e=>{
                    this.setState({
                        formError: true
                    })
                })
            }
           
        } else {
            this.setState({
                formError: true
            })
        }
    }

    resetImage = () => {
        const newFormdata = {...this.state.formData}
        newFormdata['image'].value = '';
        newFormdata['image'].valid = false;
        
        this.setState({
            defaultImg:'',
            formData: newFormdata
        })
    }

    storeFilename = (filename) => {
        this.updateForm({id:'image'},filename)
    }

    render() {
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event)=> this.submitForm(event)}>
            
                            <FileLocalUploader
                                dir="players"
                                tag={"Player Image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formData.image.value}
                                resetImage={()=> this.resetImage()}
                                filename={(filename)=> this.storeFilename(filename)}
                            />


                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                change={(event)=> this.updateForm(event)}
                                
                            />

                            <FormField
                                id={'lastname'}
                                formData={this.state.formData.lastname}
                                change={(event)=> this.updateForm(event)}
                            />

                            <FormField
                                id={'number'}
                                formData={this.state.formData.number}
                                change={(event)=> this.updateForm(event)}
                            />

                            <FormField
                                id={'position'}
                                formData={this.state.formData.position}
                                change={(event)=> this.updateForm(event)}
                            />

                            <div className="success_label">{this.state.formSuccess}</div>
                                {this.state.formError ? 
                                    <div className="error_label">
                                        Please verify all fields are correct
                                    </div>
                                    : ''
                                }
                            <div className="admin_submit">
                                <button onClick={(event)=> this.submitForm(event)} style={{cursor:'pointer'}}>
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

export default AddEditPlayers;