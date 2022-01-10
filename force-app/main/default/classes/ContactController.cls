public with sharing class ContactController {

  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactList() {
    return  [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact];
  }


  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactFilter(String searchName) {
    searchName = searchName.trim();
    if (searchName == '') {
      return getContactList();
    }
    searchName = '%' + searchName + '%';
    return  [SELECT Id, AccountId, Account.Name,  FirstName, LastName, Email,  Phone, CreatedDate FROM Contact WHERE Name LIKE :searchName];
  }




}