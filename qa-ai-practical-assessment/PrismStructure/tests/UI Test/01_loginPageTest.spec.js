const { test } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
import * as login from "../../UI/resources/data/loginData.json";
const utils = require("../../commonUtils/utils");

test.describe("Toolshop Login Module", () => {
  /**Initilizing variables to be used in different test cases*/
  let poManager = null;
  let loginPage = null;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    await loginPage.goto();
  });

  /**UI TC 01 — TC_LOGIN_001 */
  test("TC_LOGIN_001 - Successful login with valid credentials @smoke @regression", async ({ page }) => {
    await utils.addTestAnnotationsByKeyword("login");
    const { email, password } = login.validUser;
    await loginPage.loginUser(email, password);
    await loginPage.verifySuccessfulLogin();
    console.log("TC_LOGIN_001 Passed");
  });

  /**UI TC 02 — TC_LOGIN_002 */
  test("TC_LOGIN_002 - Login with invalid credentials @regression", async ({ page }) => {
    await utils.addTestAnnotationsByKeyword("login");
    const { email, password, expectedLoginError } = login.invalidPassword;
    await loginPage.loginWithInvalidCredentials(email, password);
    await loginPage.verifyLoginErrorMessage(expectedLoginError);
    console.log("TC_LOGIN_002 Passed");
  });
});
