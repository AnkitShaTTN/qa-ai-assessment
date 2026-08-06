import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class shoppingCartPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
  }

  field(testId) {
    return this.page.locator(`[data-test="${testId}"]`);
  }

  async openCart() {
    await this.page.locator('[data-test="nav-cart"]').click();
    await this.page.waitForURL(/\/checkout/, { timeout: 60000 });
    await expect(this.field("cart-total")).toBeVisible({ timeout: 60000 });
    this.log.logger("Opened shopping cart / checkout cart view");
  }

  async verifySingleLineItem({ productName, unitPrice, quantity = 1 }) {
    await expect(this.page.getByText(productName, { exact: false }).first()).toBeVisible({
      timeout: 60000,
    });
    await expect(this.field("product-title")).toContainText(productName);
    await expect(this.field("product-price").first()).toContainText(unitPrice);
    await expect(this.field("line-price").first()).toBeVisible();
    const linePriceText = (await this.field("line-price").first().innerText()).trim();
    await expect(this.field("cart-total")).toContainText(linePriceText);
    const qtyField = this.field("product-quantity").first();
    if (await qtyField.isVisible()) {
      const qtyValue = (await qtyField.inputValue().catch(() => "")) || (await qtyField.innerText());
      if (qtyValue) {
        expect(qtyValue.toString()).toContain(String(quantity));
      }
    }
    this.log.logger("Verified shopping cart line item and cart total");
  }

  async clickProceedToCheckout() {
    await this.field("proceed-1").waitFor({ state: "visible", timeout: 60000 });
    await this.field("proceed-1").click();
    await this.page.waitForTimeout(2000);
    this.log.logger("Clicked Proceed to checkout from cart");
  }
}

export default { shoppingCartPage };
