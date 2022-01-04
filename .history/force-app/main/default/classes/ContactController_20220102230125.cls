public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id,  AccountId, Contact.Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact LIMIT 15];
    }
}
