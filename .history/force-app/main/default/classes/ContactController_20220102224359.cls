public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id,  (SELECT  Id, Name FROM Accounts),  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact LIMIT 15];
    }
}
