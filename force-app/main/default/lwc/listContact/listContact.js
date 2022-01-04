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
    { 
        label: 'CreatedDate', fieldName: 'CreatedDate', type: "date", 
        typeAttributes:{ month: "2-digit", day: "2-digit" ,  year: "numeric", hour: "2-digit", minute: "2-digit" } 
    },
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

	handleSearchTermChange(event) {
		window.clearTimeout(this.delayTimeout);
		const searchName = event.target.value;

        if(!searchName){
            this.searchName = searchName;
        }
	}
    
    handleSearchContacts(event) {
		window.clearTimeout(this.delayTimeout);
        let valueInput =  this.template.querySelector('lightning-input[data-id=username]').value;
		this.delayTimeout = setTimeout(() => {
			this.searchName = valueInput;
		}, 100);
	}


    get hasNoResults() {
        let result  = this.allActivitiesData.length;
		return (result<=0);
	}
}