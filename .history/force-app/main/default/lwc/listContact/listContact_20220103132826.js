import { LightningElement, api, track, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { 
        label: 'Account Name', fieldName: 'Link', type: 'url',
        typeAttributes: {label: { fieldName: 'Account.Name' }, target: '_blank'}
    },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'CreatedDate', fieldName: 'CreatedDate', type: 'date' },
];

export default class ListContact extends LightningElement {
    error;
    columns = columns;
    searchName = '';
    @track allActivitiesData;
    
    
    @wire(getContactFilter, {searchName: '$searchName'})
	wiredActivities({ error, data }) {
	  this.allActivitiesData = data;
      if (data) 
      {
           this.allActivitiesData =  data.map( 
               record => Object.assign( { 
                   "Account.Name": record.Account.Name,
                   "Link":'/lightning/r/Account/' + record.Account.Id + '/view'}, record )
           );
        
       }
       else if (error) {
                   this.error = error;
                   this.allActivitiesData = undefined;   
       }
	}

	handleSearchTermChange(event) {
		window.clearTimeout(this.delayTimeout);
		const searchName = event.target.value;
		this.delayTimeout = setTimeout(() => {
			this.searchName = searchName;
		}, 300);
	}

    get hasResults() {
		return (this.allActivitiesData.data.length > 0);
	}
}
