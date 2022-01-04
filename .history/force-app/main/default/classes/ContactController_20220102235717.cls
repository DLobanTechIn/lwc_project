public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {

        List<Contact> contactList = [SELECT Id, AccountId, AccountName,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact LIMIT 15];


        for(Contact con : contactList) {
            System.debug('Account Name : ' + con);
        }

		return contactList;
    }
}
