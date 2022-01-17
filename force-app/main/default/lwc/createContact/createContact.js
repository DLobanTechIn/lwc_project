import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContact from '@salesforce/apex/createContactController.createContact';

export default class CreateContact extends LightningElement {
    rec = {};

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleNameChange(event) {
        this.rec.FirstName = event.detail.value;
    }
    handleSecNameChange(event) {
        this.rec.LastName =event.detail.value;
    } 
    handleEmailChange(event) {
        this.rec.Email = event.detail.value;
    }
    handleAccountChange(event) {
        this.rec.AccountId = event.target.value;
    }
    handlePhoneChange(event) {
        this.rec.Phone = event.detail.value;
    }

    createContact(){
        let bValid = true;
        /*
            this.template.querySelector('lightning-input-field').dataset.name
            reduce в резульате общую переменную вместо bvallid
        */

        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            if(element.reportValidity() == false){
                bValid = false;
            }
        });
        if(bValid){
            createContact({ con : this.rec })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.dispatchEvent(new CustomEvent('close'));
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Contact created',
                            variant: 'success',
                        }),
                    );
                }
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(new CustomEvent('close'));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
        }

    }

}