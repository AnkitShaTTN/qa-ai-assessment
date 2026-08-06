const { test } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
import * as searchData from "../../UI/resources/data/productSearchData.json";
const utils = require("../../commonUtils/utils");

test.describe("Toolshop Shopping Cart Module", () => {
  let poManager = null;
  let homePage = null;
  let productDetailsPage = null;
  let shoppingCartPage = null;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    homePage = poManager.getHomePage();
    productDetailsPage = poManager.getProductDetailsPage();
    shoppingCartPage = poManager.getShoppingCartPage();
    await homePage.goto();
  });

  /**UI TC — TC_CART_001 */
  test("TC_CART_001 - View cart details for a single line item @smoke @regression", async () => {
    await utils.addTestAnnotationsByKeyword("shopping_cart");
    const { searchQuery, expectedProductName } = searchData.thorHammerSearch;
    await homePage.searchProduct(searchQuery);
    await homePage.openProductFromSearchResults(expectedProductName);
    const unitPrice = await productDetailsPage.getDisplayedUnitPrice();
    await productDetailsPage.addProductToCart();
    await shoppingCartPage.openCart();
    await shoppingCartPage.verifySingleLineItem({
      productName: expectedProductName,
      unitPrice,
      quantity: 1,
    });
    console.log("TC_CART_001 Passed");
  });
});
