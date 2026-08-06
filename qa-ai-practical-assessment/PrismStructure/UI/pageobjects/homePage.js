import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class homePage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
  }

  field(testId) {
    return this.page.locator(`[data-test="${testId}"]`);
  }

  async goto() {
    const baseUrl = (process.env.BASE_URL || "https://practicesoftwaretesting.com").replace(
      /\/$/,
      ""
    );
    await this.page.goto(`${baseUrl}/`, { waitUntil: "load", timeout: 120000 });
    await this.field("search-query").waitFor({ state: "visible", timeout: 120000 });
    this.log.logger("Navigated to Toolshop home page");
  }

  async searchProduct(query) {
    await this.field("search-query").fill(query);
    await this.field("search-submit").click();
    await this.page.waitForTimeout(2000);
    this.log.logger(`Searched for product: ${query}`);
  }

  async verifySearchResultsContainProduct(productName) {
    const productCards = this.page.locator('a[data-test^="product-"]');
    await expect(productCards.first()).toBeVisible({ timeout: 60000 });
    const matchingNames = this.page.locator('[data-test="product-name"]').filter({
      hasText: productName,
    });
    await expect(matchingNames.first()).toBeVisible({ timeout: 60000 });
    const count = await matchingNames.count();
    expect(count).toBeGreaterThanOrEqual(1);
    this.log.logger(`Verified search results contain product: ${productName}`);
  }

  async openProductFromSearchResults(productName) {
    const productLink = this.page
      .locator('a[data-test^="product-"]')
      .filter({ hasText: productName })
      .first();
    await expect(productLink).toBeVisible({ timeout: 60000 });
    await productLink.click();
    await this.page.waitForURL(/\/product\//, { timeout: 60000 });
    this.log.logger(`Opened product details from search results: ${productName}`);
  }
}

export default { homePage };
