@isTest
private with sharing class ContactControllerTest {
    @isTest static void testGetContactByFilter() {
        Contact Joe = new Contact(FirstName='Joe', LastName='Bouling');
        insert Joe;
        List <Contact> listContact = ContactController.getContactFilter('Jo');
        Test.startTest();
        System.assertEquals(
            [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact WHERE Name LIKE :'%Jo%'],
            listContact,
            'We did not find contact with this name'
        );
        Test.stopTest();
    }

    @isTest static void testGetContactByEmptyFilter() {
        Contact Joe = new Contact(FirstName='Joe', LastName='Bouling');
        insert Joe;
        List <Contact> listContact = ContactController.getContactFilter('');
        Test.startTest();
        System.assertEquals(
            [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact],
            listContact,
            'We did not find contact with this name'
        );
        Test.stopTest();
    }
}