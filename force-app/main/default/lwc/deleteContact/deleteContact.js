import { LightningElement, api, track, wire } from 'lwc';
import {deleteRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class DeleteContact extends LightningElement {
    @api recordId;
    @track error;

    closeModal() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    deleteContact(){ 

        deleteRecord(this.recordId) 
        .then(() =>{
           this.dispatchEvent(new CustomEvent('close'));
           const toastEvent = new ShowToastEvent({
               title:'Record Deleted',
               message:'Record deleted successfully',
               variant:'success',
           })
           this.dispatchEvent(toastEvent);
           
        })
        .catch(error =>{
            this.dispatchEvent(new CustomEvent('close'));
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