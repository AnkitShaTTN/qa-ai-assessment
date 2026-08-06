const { test } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
import * as registration from "../../UI/resources/data/registrationData.json";
const utils = require("../../commonUtils/utils");

test.describe("Toolshop Registration Module", () => {
  /**Initilizing variables to be used in different test cases*/
  let poManager = null;
  let registrationPage = null;
  let loginPage = null;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    registrationPage = poManager.getRegistrationPage();
    loginPage = poManager.getLoginPage();
    await registrationPage.goto();
  });

  /**UI TC — TC_REG_001 */
  test("TC_REG_001 - Register new user with valid data @smoke @regression", async ({ page }) => {
    await utils.addTestAnnotationsByKeyword("registration");
    const email = await utils.generateRandomData("email");
    const randomPart = await utils.generateRandomData("text");
    const password = `Px7!${randomPart}Zq9`;
    const userData = {
      ...registration.validRegistration,
      email,
      password,
    };

    await registrationPage.registerNewUser(userData);
    await registrationPage.verifySuccessfulRegistration();
    await loginPage.loginUser(email, password);
    await loginPage.verifySuccessfulLogin();
    console.log("TC_REG_001 Passed");
  });
});
