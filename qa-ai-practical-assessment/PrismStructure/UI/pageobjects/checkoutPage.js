import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class checkoutPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
  }

  field(testId) {
    return this.page.locator(`[data-test="${testId}"]`);
  }

  async continueAsGuest(guestData) {
    await this.page.locator('.nav-link[href="#guest-tab"]').click();
    await this.field("guest-email").waitFor({ state: "visible", timeout: 60000 });
    await this.field("guest-email").fill(guestData.email);
    await this.field("guest-first-name").fill(guestData.firstName);
    await this.field("guest-last-name").fill(guestData.lastName);
    await this.field("guest-submit").click();
    await this.page.waitForTimeout(1500);
    await this.field("proceed-2-guest").waitFor({ state: "visible", timeout: 60000 });
    await this.field("proceed-2-guest").click();
    await this.page.waitForTimeout(1500);
    this.log.logger("Continued checkout as guest");
  }

  async fillBillingAddress(addressData) {
    await this.field("country").waitFor({ state: "visible", timeout: 60000 });
    await this.field("country").selectOption(addressData.countryCode);
    await this.field("postal_code").fill(addressData.postalCode);
    await this.field("house_number").fill(addressData.houseNumber);
    await this.field("street").fill(addressData.street);
    await this.field("city").fill(addressData.city);
    await this.field("state").fill(addressData.state);
    await this.field("proceed-3").click();
    await this.page.waitForTimeout(2000);
    this.log.logger("Filled billing/shipping address and continued to payment");
  }

  async payWithCreditCard(cardData) {
    await this.field("payment-method").waitFor({ state: "visible", timeout: 60000 });
    await this.field("payment-method").selectOption("credit-card");
    await this.page.waitForTimeout(1000);
    await this.field("credit_card_number").pressSequentially(cardData.cardNumber, { delay: 15 });
    await this.field("expiration_date").click();
    await this.field("expiration_date").pressSequentially(cardData.expirationDate, { delay: 30 });
    await this.field("cvv").fill(cardData.cvv);
    await this.field("card_holder_name").fill(cardData.cardHolderName);
    await expect(this.field("finish")).toBeEnabled({ timeout: 60000 });
    this.log.logger("Entered credit card payment details");
  }

  async confirmPayment() {
    const confirmButton = this.field("finish");
    await expect(confirmButton).toBeEnabled({ timeout: 60000 });
    await confirmButton.click();
    this.log.logger("Clicked Confirm to submit payment");
  }

  async verifyCheckoutSuccess() {
    await expect(
      this.page.getByText(/payment was successful|thanks for your order/i)
    ).toBeVisible({ timeout: 120000 });
    this.log.logger("Verified checkout payment success or order confirmation");
  }

  async verifyCheckoutEntryFromCart() {
    await expect(this.field("cart-total")).toBeAttached();
    await expect(this.field("cart-total")).toContainText(/\$/);
    await this.page.locator('.nav-link[href="#guest-tab"]').click();
    await expect(this.field("guest-email")).toBeVisible({ timeout: 60000 });
    await expect(this.field("guest-first-name")).toBeVisible();
    await expect(this.field("country")).toBeAttached();
    this.log.logger("Verified checkout entry shows cart summary and sign-in/billing steps");
  }

  async completeGuestCheckoutWithCreditCard(guestData, addressData, cardData) {
    await this.continueAsGuest(guestData);
    await this.fillBillingAddress(addressData);
    await this.payWithCreditCard(cardData);
    await this.confirmPayment();
    await this.verifyCheckoutSuccess();
  }
}

export default { checkoutPage };
