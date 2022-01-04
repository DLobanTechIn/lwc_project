import { LightningElement, api, track, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Account Name', fieldName: 'Account.Name'},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'CreatedDate', fieldName: 'CreatedDate', type: 'date' },
];

export default class ListContact extends LightningElement {
    error;
    columns = columns;
    @track allActivitiesData;

    @wire(getContactList, {})
    wiredActivities({ error, data }) {
       if (data) 
       {
            this.allActivitiesData =  data.map( 
                record => Object.assign( { "Account.Name": record.Account.Name}, record )
            );
         
        }
        else if (error) {
                    this.error = error;
                    this.allActivitiesData = undefined;
                
                }
    }
}
