public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, FirstName, LastName, Email, (SELECT Id , Name from Account),  Phone, CreatedDate FROM Contact LIMIT 15];
    }
}
