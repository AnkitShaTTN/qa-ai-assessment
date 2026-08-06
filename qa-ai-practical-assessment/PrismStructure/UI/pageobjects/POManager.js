const { navigationBar } = require("./navigationBar");
const { loginPage } = require("./loginPage").default;
const { databaseManager } = require("../utilities/databaseManager");
const { webUtils } = require("../utilities/webUtils");
const { settingPage } = require("./settingPage");
const { districtPage } = require("./districtPage");
const { registrationPage } = require("./registrationPage").default;
const { homePage } = require("./homePage").default;
const { productDetailsPage } = require("./productDetailsPage").default;
const { shoppingCartPage } = require("./shoppingCartPage").default;
const { checkoutPage } = require("./checkoutPage").default;

/**This is common class to create object and refrences for each page
 *  and then calling getter methods in test cases using POManager*/
class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new loginPage(this.page);
    this.databaseManager = new databaseManager();
    this.navigationBar = new navigationBar(page);
    this.webUtils = new webUtils(page);
    this.databaseManager = new databaseManager(this.page);
    this.settingPage = new settingPage(this.page);
    this.districtPage = new districtPage(this.page);
    this.registrationPage = new registrationPage(this.page);
    this.homePage = new homePage(this.page);
    this.productDetailsPage = new productDetailsPage(this.page);
    this.shoppingCartPage = new shoppingCartPage(this.page);
    this.checkoutPage = new checkoutPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDatabaseManager() {
    return this.databaseManager;
  }

  getNavigationBar() {
    return this.navigationBar;
  }

  getWebUtils() {
    return this.webUtils;
  }

  getSettingPage() {
    return this.settingPage;
  }

  getDistrictPage() {
    return this.districtPage;
  }

  getRegistrationPage() {
    return this.registrationPage;
  }

  getHomePage() {
    return this.homePage;
  }

  getProductDetailsPage() {
    return this.productDetailsPage;
  }

  getShoppingCartPage() {
    return this.shoppingCartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

}

module.exports = { POManager };
