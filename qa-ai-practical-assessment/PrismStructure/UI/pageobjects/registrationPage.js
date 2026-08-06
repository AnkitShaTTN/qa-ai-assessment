import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class registrationPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.registrationHeading = page.getByRole("heading", { name: "Customer registration" });
    this.registerBtn = page.getByRole("button", { name: "Register", exact: true });
  }

  field(testId) {
    return this.page.locator(`[data-test="${testId}"]`);
  }

  async navigateToRegistrationPage() {
    const baseUrl = (process.env.BASE_URL || "https://practicesoftwaretesting.com").replace(
      /\/$/,
      ""
    );
    await this.page.goto(`${baseUrl}/`);
    await this.page.getByRole("link", { name: "Sign in" }).click();
    await this.page.getByRole("link", { name: "Register your account" }).click();
    await this.registrationHeading.waitFor({ state: "visible", timeout: 60000 });
    this.log.logger("Navigated to Toolshop registration page");
  }

  async goto() {
    await this.navigateToRegistrationPage();
  }

  async enterFirstName(firstName) {
    await this.field("first-name").click();
    await this.field("first-name").fill(firstName);
    this.log.logger("Entered first name on registration page");
  }

  async enterLastName(lastName) {
    await this.field("last-name").click();
    await this.field("last-name").fill(lastName);
    this.log.logger("Entered last name on registration page");
  }

  async enterDateOfBirth(dateOfBirth) {
    await this.field("dob").click();
    await this.field("dob").fill(dateOfBirth);
    this.log.logger("Entered date of birth on registration page");
  }

  async enterPhone(phone) {
    await this.field("phone").click();
    await this.field("phone").fill(phone);
    this.log.logger("Entered phone on registration page");
  }

  async enterEmail(email) {
    await this.field("email").click();
    await this.field("email").fill(email);
    this.log.logger("Entered email on registration page");
  }

  async enterPassword(password) {
    await this.field("password").click();
    await this.field("password").fill(password);
    this.log.logger("Entered password on registration page");
  }

  async enterStreet(street) {
    await this.field("street").click();
    await this.field("street").fill(street);
    this.log.logger("Entered street on registration page");
  }

  async enterHouseNumber(houseNumber) {
    await this.field("house_number").click();
    await this.field("house_number").fill(houseNumber);
    this.log.logger("Entered house number on registration page");
  }

  async enterCity(city) {
    await this.field("city").click();
    await this.field("city").fill(city);
    this.log.logger("Entered city on registration page");
  }

  async enterState(state) {
    await this.field("state").click();
    await this.field("state").fill(state);
    this.log.logger("Entered state on registration page");
  }

  async selectCountry(countryCode) {
    await this.field("country").selectOption(countryCode);
    this.log.logger("Selected country on registration page");
  }

  async enterPostalCode(postalCode) {
    await this.field("postal_code").click();
    await this.field("postal_code").fill(postalCode);
    this.log.logger("Entered postal code on registration page");
  }

  async clickRegister() {
    await this.registerBtn.click();
    this.log.logger("Clicked register submit");
  }

  async registerNewUser(userData) {
    const {
      firstName,
      lastName,
      dateOfBirth,
      phone,
      email,
      password,
      street,
      houseNumber,
      city,
      state,
      countryCode,
      postalCode,
    } = userData;

    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterDateOfBirth(dateOfBirth);
    await this.enterPhone(phone);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.enterStreet(street);
    await this.enterHouseNumber(houseNumber);
    await this.enterCity(city);
    await this.enterState(state);
    await this.selectCountry(countryCode);
    await this.enterPostalCode(postalCode);
    await this.clickRegister();
    this.log.logger("Submitted registration with valid user data");
  }

  async verifySuccessfulRegistration() {
    await this.page.waitForURL((url) => !url.pathname.includes("/auth/register"), {
      timeout: 60000,
    });
    await expect(this.page.getByRole("heading", { name: "Login" })).toBeVisible({
      timeout: 60000,
    });
    this.log.logger("Verified successful registration");
  }
}

export default { registrationPage };
