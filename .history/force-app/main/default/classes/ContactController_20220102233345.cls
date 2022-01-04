public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {

        List<Contact> contactList = [SELECT Id,  AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact LIMIT 15];


        for(Contact con : contactList) {
            System.debug('Account Name : ' + con.AccountName);
        }

		return [SELECT Id,  AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact LIMIT 15];
    }
}