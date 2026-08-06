const { test } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
import * as searchData from "../../UI/resources/data/productSearchData.json";
const utils = require("../../commonUtils/utils");

test.describe("Toolshop Product Search Module", () => {
  let poManager = null;
  let homePage = null;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    homePage = poManager.getHomePage();
    await homePage.goto();
  });

  /**UI TC — TC_SEARCH_001 */
  test("TC_SEARCH_001 - Search by exact product name @smoke @regression", async () => {
    await utils.addTestAnnotationsByKeyword("product_search");
    const { searchQuery, expectedProductName } = searchData.thorHammerSearch;
    await homePage.searchProduct(searchQuery);
    await homePage.verifySearchResultsContainProduct(expectedProductName);
    console.log("TC_SEARCH_001 Passed");
  });
});
