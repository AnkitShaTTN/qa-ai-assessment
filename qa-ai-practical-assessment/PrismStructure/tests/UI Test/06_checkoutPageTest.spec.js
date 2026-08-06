const { test } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
import * as searchData from "../../UI/resources/data/productSearchData.json";
import * as checkout from "../../UI/resources/data/checkoutData.json";
const utils = require("../../commonUtils/utils");

test.describe("Toolshop Checkout Module", () => {
  let poManager = null;
  let homePage = null;
  let productDetailsPage = null;
  let shoppingCartPage = null;
  let checkoutPage = null;

  const addThorHammerToCart = async () => {
    const { searchQuery, expectedProductName } = searchData.thorHammerSearch;
    await homePage.searchProduct(searchQuery);
    await homePage.openProductFromSearchResults(expectedProductName);
    await productDetailsPage.addProductToCart();
  };

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    homePage = poManager.getHomePage();
    productDetailsPage = poManager.getProductDetailsPage();
    shoppingCartPage = poManager.getShoppingCartPage();
    checkoutPage = poManager.getCheckoutPage();
    await homePage.goto();
  });

  /**UI TC — TC_CHK_001 */
  test("TC_CHK_001 - Complete checkout with valid shipping and credit card payment @smoke @regression", async () => {
    await utils.addTestAnnotationsByKeyword("checkout");
    await addThorHammerToCart();
    await shoppingCartPage.openCart();
    await shoppingCartPage.clickProceedToCheckout();
    const guestEmail = await utils.generateRandomData("email");
    const guestData = {
      ...checkout.guestUser,
      email: guestEmail,
    };
    await checkoutPage.completeGuestCheckoutWithCreditCard(
      guestData,
      checkout.billingAddress,
      checkout.creditCard
    );
    console.log("TC_CHK_001 Passed");
  });

  /**UI TC — TC_CHK_002 */
  test("TC_CHK_002 - Proceed from cart into checkout shipping step @regression", async () => {
    await utils.addTestAnnotationsByKeyword("checkout");
    await addThorHammerToCart();
    await shoppingCartPage.openCart();
    await shoppingCartPage.clickProceedToCheckout();
    await checkoutPage.verifyCheckoutEntryFromCart();
    console.log("TC_CHK_002 Passed");
  });
});
