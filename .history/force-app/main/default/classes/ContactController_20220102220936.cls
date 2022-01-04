public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, FirstName, LastName, Email, Account.Name, Account.Id,  Phone, CreatedDate FROM Contact LIMIT 15];
    }
}
