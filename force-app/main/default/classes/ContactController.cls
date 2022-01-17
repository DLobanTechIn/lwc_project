public with sharing class ContactController {

  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactFilter(String searchName) {
    try {
      searchName = searchName.trim();
      searchName = '%' + searchName + '%';
      return  [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact WHERE Name LIKE :searchName];
    } catch (Exception error) {
      System.debug('Sorry, we have some mistakes: ' + error.getMessage());
      return null;
    }
    
  }




}