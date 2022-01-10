import { LightningElement, api, track, wire } from 'lwc';
import getContactFilter from '@salesforce/apex/ContactController.getContactFilter';

const columns = [
    { label: 'First Name', fieldName: 'FirstName', hideDefaultActions: true, },
    { label: 'Last Name', fieldName: 'LastName', hideDefaultActions: true, },
    { label: 'Email', fieldName: 'Email', type: 'email', hideDefaultActions: true, },
    { 
        label: 'Account Name', fieldName: 'Link', type: 'url', hideDefaultActions: true, 
        typeAttributes: {label: { fieldName: 'Account.Name' }, target: '_blank'}
    },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', hideDefaultActions: true,},
    { 
        label: 'CreatedDate', fieldName: 'CreatedDate', type: "date", hideDefaultActions: true,
        typeAttributes:{ 
            month: "2-digit", day: "2-digit" ,  year: "numeric", hour: "2-digit", minute: "2-digit" 
        } 
    },
    { 
        label: 'Delete', fieldName: 'Delete', type: "button",
        typeAttributes:{ 
            iconPosition:"right", iconName:"utility:delete", 
            title:"Delete", variant:"destructive", label:"Delete", class:"slds-var-m-left_x-small myclass-test"
        } 
    }  
];

export default class ListContact extends LightningElement {
    error;
    @track columns = columns;
    searchName = '';
    @track record = {};
    @track allActivitiesData;
    @api сShowModal;
    @track dShowModal; 

    
    
    @wire(getContactFilter, {searchName: '$searchName'})
	wiredActivities(result) {
	  this.allActivitiesData = result;
      if (result.data) 
      {
           this.allActivitiesData =  result.data.map( 
               record => Object.assign( { 
                    "Account.Name": record.Account.Name,
                    "Link":'/lightning/r/Account/' + record.Account.Id + '/view',
                    "Id": record.Id
                }, record )
           );
        
       }
	}

    handleClickDelete(event) {
        const row = event.detail.row;
        this.record = row;
        this.dShowModal = true;
    }

    closeModal(event) {
        this.dShowModal = false;
        this.сShowModal = false;  

    }

    handleCreateContact(event){
        this.сShowModal = true;
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