import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

console.log(getContactList);
console.log(22222222);
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

    @wire(getContactList)
    contacts;
}
