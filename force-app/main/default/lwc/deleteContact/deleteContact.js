import { LightningElement, api, track, wire } from 'lwc';
import {deleteRecord} from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import getContactFilter from '@salesforce/apex/ContactController.getContactFilter';
//import deleteContactList from '@salesforce/apex/ContactController.deleteContactList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class DeleteContact extends LightningElement {
    @api recordId;
    @track error;

    @wire(getContactFilter, {searchName: ''})getContact;

    closeModal(event) {
        this.dispatchEvent(new CustomEvent('close', {}));
    }

    deleteContact(event){ 

        deleteRecord(this.recordId) 
        .then(() =>{
           this.dispatchEvent(new CustomEvent('close', {}));
           const toastEvent = new ShowToastEvent({
               title:'Record Deleted',
               message:'Record deleted successfully',
               variant:'success',
           })
           this.dispatchEvent(toastEvent);
           refreshApex(this.getContact);
           
        })
        .catch(error =>{
            this.dispatchEvent(new CustomEvent('close', {}));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });    
    }



}