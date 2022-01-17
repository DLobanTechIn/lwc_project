public with sharing class createContactController {
    @AuraEnabled
    public static void createContact(Contact con) {
        try {
            system.debug('contact:'+con);
            insert con;
        } catch (Exception error) {
            System.debug('We have mistake:'+error.getMessage());
        }

    }
}