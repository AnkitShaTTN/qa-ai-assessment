const { test } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
import * as searchData from "../../UI/resources/data/productSearchData.json";
const utils = require("../../commonUtils/utils");

test.describe("Toolshop Product Details Module", () => {
  let poManager = null;
  let homePage = null;
  let productDetailsPage = null;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    homePage = poManager.getHomePage();
    productDetailsPage = poManager.getProductDetailsPage();
    await homePage.goto();
  });

  /**UI TC — TC_PD_001 */
  test("TC_PD_001 - View core product information on details page @regression", async () => {
    await utils.addTestAnnotationsByKeyword("product_details");
    const { searchQuery, expectedProductName } = searchData.thorHammerSearch;
    await homePage.searchProduct(searchQuery);
    await homePage.openProductFromSearchResults(expectedProductName);
    await productDetailsPage.verifyCoreProductInformation(expectedProductName);
    console.log("TC_PD_001 Passed");
  });
});
