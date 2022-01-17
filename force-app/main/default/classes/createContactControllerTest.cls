@isTest
private with sharing class createContactControllerTest {
    @isTest static void testCreate() {

        Test.startTest();
        createContactController.createContact(new Contact(
            FirstName='Test', LastName='Test1', Email='test@test.com', 
            AccountId='0015j00000OuRikAAF', Phone='73333333333')
        );
        Test.stopTest();

        Contact verifyContact = [SELECT LastName FROM Contact LIMIT 1];

        System.assertEquals('Test1', verifyContact.LastName, 'We did not find contact with LastName Test1');
        //есть еще asser - почитать
    }
}