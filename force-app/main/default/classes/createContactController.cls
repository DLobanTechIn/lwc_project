public with sharing class createContactController {
    @AuraEnabled
    public static Contact createContact(Contact con) {
        system.debug('contact:'+con);
        insert con;
        return con;
    }
}
