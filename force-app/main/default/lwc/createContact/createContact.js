import { LightningElement, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContactFilter from '@salesforce/apex/ContactController.getContactFilter';
import createContact from '@salesforce/apex/createContactController.createContact';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

export default class CreateContact extends LightningElement {
    fields = {
        contactObject:  CONTACT_OBJECT,
        firstName:  FIRST_NAME_FIELD,
        lastName:  LAST_NAME_FIELD,
        email:  EMAIL_FIELD,
        account:  ACCOUNT_FIELD,
        phone:  PHONE_FIELD,

    }
    rec = {
        FirstName : this.firstName,
        LastName : this.lastName,
        Phone : this.phone,
        Email: this.email,
        AccountId: this.account
    }

    closeModal(event) {
        this.dispatchEvent(new CustomEvent('close', {}));
    }

    @wire(getContactFilter, {searchName: ''})getContact;


    handleContactCreated(){
        console.log(333333);
    }

    handleNameChange(event) {
        this.rec.FirstName = event.detail.value;
        console.log(this.rec.FirstName);
    }
    handleSecNameChange(event) {
        this.rec.LastName =event.detail.value;
        console.log(this.rec.LastName);
    }
    handleEmailChange(event) {
        this.rec.Email = event.detail.value;
        console.log(this.rec.Email);
    }
    handleAccountChange(event) {
        this.rec.AccountId = event.target.value;
        console.log(this.rec.AccountId);
    }
    handlePhoneChange(event) {
        this.rec.Phone = event.detail.value;
        console.log(this.rec.Phone);
    }

    createContact(event){
        let bValid = true;
        
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            element.reportValidity();
            if(element.reportValidity() == false){
                bValid = false;
            }
        });
        if(bValid){
            console.log(this.rec);
            createContact({ con : this.rec })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.dispatchEvent(new CustomEvent('close', {}));
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Contact created',
                            variant: 'success',
                        }),
                    );
                    refreshApex(this.getContact);
                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(new CustomEvent('close', {}));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
        }

    }

}