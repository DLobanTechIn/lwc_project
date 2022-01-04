public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id,  AccountID, AccountNAME,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact LIMIT 15];
    }
}
