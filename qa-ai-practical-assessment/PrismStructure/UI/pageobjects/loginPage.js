import { expect } from "@playwright/test";
require("dotenv").config();
import loggerUtilities from "../../commonUtils/loggerUtil";

class loginPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.email = page.getByRole("textbox", { name: /email address/i });
    this.password = page.getByRole("textbox", { name: /password/i });
    this.loginBtn = page.getByRole("button", { name: "Login", exact: true });
    this.loginError = page.getByText(/invalid email or password/i);
    this.emailError = page.getByTestId("email-error");
    this.passwordError = page.getByTestId("password-error");
    this.navMenu = page.getByRole("menubar", { name: /main menu/i });
    this.navSignOut = page.getByRole("button", { name: "Profile" });
  }

  async navigateToLoginPage() {
    const baseUrl = (process.env.BASE_URL || "https://practicesoftwaretesting.com").replace(
      /\/$/,
      ""
    );
    await this.page.goto(`${baseUrl}/auth/login`);
    await this.page.getByRole("heading", { name: "Login" }).waitFor({ state: "visible", timeout: 60000 });
    this.log.logger("Navigated to Toolshop login page");
  }

  async goto() {
    await this.navigateToLoginPage();
  }

  async enterEmail(email) {
    await this.email.click();
    await this.email.fill(email);
    this.log.logger("Entered email on login page");
  }

  async enterPassword(password) {
    await this.password.click();
    await this.password.fill(password);
    this.log.logger("Entered password on login page");
  }

  async clickLogin() {
    await this.loginBtn.click();
    this.log.logger("Clicked login submit");
  }

  async loginWithValidCredentials(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
    this.log.logger("Submitted login with valid credentials");
  }

  async loginWithInvalidCredentials(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
    this.log.logger("Submitted login with invalid credentials");
  }

  async verifySuccessfulLogin() {
    await this.page.waitForURL(/\/account/, { timeout: 60000 });
    await expect(this.page.getByRole("heading", { name: "My account" })).toBeVisible({
      timeout: 60000,
    });
    await expect(this.navMenu).toBeVisible();
    await expect(this.navSignOut).toBeVisible();
    this.log.logger("Verified successful login");
  }

  async verifyLoginErrorMessage(expectedMessage = "Invalid email or password") {
    await expect(this.loginError).toBeVisible();
    await expect(this.loginError).toContainText(expectedMessage);
    this.log.logger("Verified login error message");
  }

  /** Backward-compatible alias used by existing Prism UI specs */
  async loginUser(username, password) {
    await this.loginWithValidCredentials(username, password);
    this.log.logger("Login Successful");
  }
}

export default { loginPage };
