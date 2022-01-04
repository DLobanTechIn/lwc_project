import { LightningElement, api, track, wire } from 'lwc';
import getContactFilter from '@salesforce/apex/ContactController.getContactFilter';

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
	wiredActivities(result) {
	  this.allActivitiesData = result;
      if (result.data) 
      {
           this.allActivitiesData =  result.data.map( 
               record => Object.assign( { 
                   "Account.Name": record.Account.Name,
                   "Link":'/lightning/r/Account/' + record.Account.Id + '/view'}, record )
           );
        
       }
	}

	// handleSearchTermChange(event) {
	// 	window.clearTimeout(this.delayTimeout);
    //     const valueInput = event.target.value;
	// 	const searchName = event.target.value;
	// 	this.delayTimeout = setTimeout(() => {
	// 		this.searchName = searchName;
	// 	}, 100);
	// }
    
    handleSearchContacts(event) {
		window.clearTimeout(this.delayTimeout);
        let valueInput = document.getElementsByClassName("input-contact").value;
		this.delayTimeout = setTimeout(() => {
			this.searchName = valueInput;
		}, 100);
	}


    get hasResults() {
		return (this.allActivitiesData.length >0);
	}
}
