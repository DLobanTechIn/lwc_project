@isTest
private with sharing class ContactControllerTest {
    @isTest static void testGetContact() {
        List <Contact> listContact = ContactController.getContactList();
        System.assertEquals(
            [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact LIMIT 20],
            listContact
        );
    }

    @isTest static void testGetContactByFilterEmpty() {
        List <Contact> listContact = ContactController.getContactFilter('');
        System.assertEquals(
            [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact WHERE Name LIKE :'%%'],
            listContact
        );
    }

    @isTest static void testGetContactByFilter() {
        List <Contact> listContact = ContactController.getContactFilter('Jo');
        System.assertEquals(
            [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact WHERE Name LIKE :'%Jo%'],
            listContact
        );
    }
}