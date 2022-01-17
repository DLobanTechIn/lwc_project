@isTest
private with sharing class ContactControllerTest {
    @isTest static void testGetContactByFilter() {
        
        Contact Joe = new Contact(FirstName='Joe', LastName='Bouling');
        insert Joe;
        
        Test.startTest();
        List <Contact> listContact = ContactController.getContactFilter('Jo');
        Test.stopTest();

        System.assertEquals(
            [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact WHERE Name LIKE :'%Jo%'],
            listContact,
            'We did not find contact with this name'
        );

    }

    @isTest static void testGetContactByEmptyFilter() {
        
        Contact Joe = new Contact(FirstName='Joe', LastName='Bouling');
        insert Joe;

        Test.startTest();
        List <Contact> listContact = ContactController.getContactFilter('');
        Test.stopTest();

        System.assertEquals(
            [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact],
            listContact,
            'We did not find contact with this name'
        );

    }
}