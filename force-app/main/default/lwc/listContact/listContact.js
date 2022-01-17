import { LightningElement, api, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
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
    @track dataToRefresh;
    @track ShowCreateModal; //ПЕРЕНАЗЫВАТЬ ПО ЛОГИКЕ
    @track ShowDeleteModal; 

    get hasNoResults() { //переменная поэтому НЕ В КОНЦЕ
        let result  = this.allActivitiesData.length;
		return (result<=0);
	}
    
    
    @wire(getContactFilter, {searchName: '$searchName'})
	wiredActivities(result) {
	  this.allActivitiesData = result;
      this.dataToRefresh = result;
      const {data, error} = result;         //деструктуризация это независимое место со своим значением
      if (data) 
      {
           this.allActivitiesData =  data.map( 
               record => Object.assign( { 
                    "Account.Name": record.Account?.Name,
                    "Link":record.Account?'/lightning/r/Account/' + record.Account.Id + '/view':""
                }, record )
           );
        
       }
       if(error){
           console.log(error.body.message);
       }
      
	}



    handleClickDelete(event) {
        const row = event.detail.row;
        this.record = row;
        this.ShowDeleteModal = true;
    }

    handleCreateContact(event){
        this.ShowCreateModal = true;
    }

    closeModal() {
        this.ShowDeleteModal = false;
        this.ShowCreateModal = false;  
        refreshApex(this.dataToRefresh);
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
		}, 200);
	}
}