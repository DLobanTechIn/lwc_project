public with sharing class createContactController {
    @AuraEnabled
    public static void createContact(Contact con) {
        try {
            system.debug('contact:'+con);
            insert con;
        } catch (Exception error) {
            system.debug('We have mistake:'+error.getMessage());
        }

    }
}