public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        lstcontacts.clear();
		accIds.clear();
		lstaccount.clear();
		lstaccount=[select id,name from Account];

        for(Integer i=0;i<lstaccount.size();i++) {
			accIds.add(lstaccount[i].Id);
		}

        lstcontacts =[select id,FirstName, LastName, Email,  Phone, CreatedDate, accountId, accountName  from contact where accountid in : accIds];
		return lstcontacts;
        // return [SELECT Id,  AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact LIMIT 15];
    }
}
