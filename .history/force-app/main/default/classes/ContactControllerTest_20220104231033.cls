@isTest
private with sharing class ContactControllerTest {
    @isTest static void testGetContactByFilter() {
        List <Contact> listContact = ContactController.getContactList();
        List <Contact> listContactTest =  [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact LIMIT 20];
        System.assertEquals( listContactTest, listContact);
    }
}
