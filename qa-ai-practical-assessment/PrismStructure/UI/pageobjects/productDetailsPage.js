import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class productDetailsPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
  }

  field(testId) {
    return this.page.locator(`[data-test="${testId}"]`);
  }

  async verifyCoreProductInformation(expectedProductName) {
    await expect(this.field("product-name")).toBeVisible({ timeout: 60000 });
    await expect(this.field("product-name")).toContainText(expectedProductName);
    await expect(this.field("unit-price")).toBeVisible();
    const unitPriceText = await this.field("unit-price").innerText();
    expect(unitPriceText.trim()).toMatch(/\d/);
    await expect(this.field("product-description")).toBeVisible();
    await expect(this.field("product-description")).not.toBeEmpty();
    await expect(this.field("specs-title")).toBeVisible();
    await expect(this.field("product-specs")).toBeVisible();
    await expect(this.field("spec-row").first()).toBeVisible();
    this.log.logger("Verified core product information on product details page");
  }

  async getDisplayedProductName() {
    return (await this.field("product-name").innerText()).trim();
  }

  async getDisplayedUnitPrice() {
    const raw = (await this.field("unit-price").innerText()).trim();
    return raw.startsWith("$") ? raw : `$${raw}`;
  }

  async addProductToCart() {
    await this.field("add-to-cart").waitFor({ state: "visible", timeout: 60000 });
    await this.field("add-to-cart").click();
    await expect(this.page.locator('[data-test="nav-cart"]')).toContainText("1", {
      timeout: 60000,
    });
    this.log.logger("Added product to cart from product details page");
  }
}

export default { productDetailsPage };
