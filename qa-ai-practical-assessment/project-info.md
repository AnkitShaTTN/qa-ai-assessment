
# project-info.md :

**Prompt:**

I'm filling in project-info.md for a QA assessment. Give me a first-draft structure with placeholder guidance under each of these 11 headings, based on the project rules already set for this repo (Prism framework, Toolshop UI+API, AC1/AC2). Don't invent specifics I haven't done yet — just outline what belongs in each section so I fill it in as I go:

1. What the project is about
2. Primary AI tool(s) used
3. How I provide project/SUT context to AI
4. How I use AI for requirement analysis
5. How I use AI for test planning and strategy (UI vs API, smoke vs regression)
6. How I use AI for manual test case design
7. How I use AI for automation design
8. How I validate and refine AI-generated test cases/scripts
9. How I use AI for test data generation
10. How I use AI for debugging failing tests
11. What information I avoid sharing with AI, and how I'd reuse this workflow

**AI Response Summary:**

# QA AI Practical Assessment – Project Information

## 1. Project Overview

This project demonstrates an AI-assisted Quality Assurance workflow for the Practice Software Testing (Toolshop) application using the existing Prism Playwright framework. The objective is to showcase how AI can be effectively used throughout the software testing lifecycle, including requirement analysis, test planning, manual test case design, API testing, UI automation, debugging, documentation, and validation of AI-generated outputs.

The scope of this assessment includes functional testing of the Toolshop application through both UI and API layers while following a structured AI-driven engineering approach.

---

## 2. System Under Test (SUT)

**Application:** Practice Software Testing (Toolshop)

**Application URL:** https://practicesoftwaretesting.com/

**Application Type:** E-Commerce Web Application

**Testing Areas**

- User Registration
- User Login
- Product Search
- Product Details
- Shopping Cart
- Checkout
- Invoice Generation
- API Endpoints

---

## 3. AI Tools Used

### Primary Tool

- Cursor Enterprise

Cursor Enterprise is the primary AI assistant used throughout this assessment for requirement analysis, test design, Playwright automation, API automation, debugging, code review, and documentation.

### Secondary Tool

- ChatGPT

ChatGPT was used as a secondary reviewer to validate AI-generated outputs, improve documentation, refine prompt quality, and compare implementation approaches.

---

## 4. Project Context Provided to AI

Before requesting any AI assistance, the following context was consistently provided:

- Assessment objective
- Practice Software Testing application URL
- Existing Prism Playwright framework
- Repository folder structure
- Scope of implementation
- Existing coding conventions
- Required deliverables
- Testing objectives
- Playwright framework configuration

Providing complete project context helped generate responses that were aligned with the existing project structure and reduced unnecessary modifications.

---

## 5. Requirement Analysis Approach

AI was used to understand the application, identify business modules, determine critical user journeys, and identify high-risk functionalities.

The AI-generated analysis was manually validated by exploring the application before implementation.

Requirement analysis focused on:

- Business modules
- Functional modules
- Critical workflows
- UI functionality
- API functionality
- High-risk areas
- Test scope

Any incorrect or incomplete AI responses were manually reviewed and refined before implementation.

---

## 6. Test Planning Strategy

The testing strategy combines manual testing, UI automation, and API automation.

### Smoke Testing

Smoke tests validate critical user journeys such as:

- User Login
- Product Search
- Add Product to Cart
- Checkout
- Invoice Generation

### Regression Testing

Regression tests validate additional functional scenarios including:

- Invalid Login
- Registration Validation
- Product Filtering
- Quantity Updates
- Cart Management
- API Validations

The focus was on implementing high-value business scenarios within the assessment scope.

---

## 7. Manual Test Design

AI assisted in generating functional test cases covering:

- Positive scenarios
- Negative scenarios
- Boundary value scenarios
- Validation scenarios

Each AI-generated test case was manually reviewed to remove duplicates, improve clarity, and ensure alignment with the application's actual behavior.

---

## 8. Automation Design

The existing Prism Playwright framework was used without modifying its core structure.

Automation implementation follows:

- Page Object Model (POM)
- Reusable utilities
- Modular API components
- Shared configuration
- Smoke and Regression test categorization
- Reusable test data

Automation includes both UI and API test scenarios.

### Implemented Structure

| Component | Location |
|---|---|
| UI specs (8 tests) | `PrismStructure/tests/UI Test/01_loginPageTest.spec.js`–`06_checkoutPageTest.spec.js` |
| API specs (5 tests) | `PrismStructure/tests/API Test/01_registerUser.spec.js`–`05_invoice.spec.js` |
| Page objects | `PrismStructure/UI/pageobjects/` (`loginPage`, `registrationPage`, `homePage`, `productDetailsPage`, `shoppingCartPage`, `checkoutPage`) |
| API layer | `PrismStructure/API/pageobjects/toolshopApiPage.js`, `API/utilities/apiHelper.js` |
| Test data | `UI/resources/data/loginData.json`, `registrationData.json`, `productSearchData.json`, `checkoutData.json` |
| API runtime state | `API/testdata/toolshopRegisteredUser.json`, `toolshopAccessToken.json`, `toolshopSession.json` |
| Configuration | `playwright.config.js` — single `testcases_regression` project; `package.json` — `test:regression` script |
| Environment | `.env` — `URL` (API), `BASE_URL` (UI) |

**Latest execution:** 8/8 UI passed, 5/5 API passed (13/13 total).

---

## 9. Validation of AI Responses

AI-generated content was never accepted without review.

Every generated output was validated through one or more of the following methods:

- Manual application walkthrough
- Swagger API verification
- Playwright execution
- Code review
- Requirement comparison
- Result verification

Only validated outputs were incorporated into the project.

---

## 10. Test Data Strategy

Test data was generated using AI recommendations together with dynamic runtime data where applicable.

The strategy focuses on:

- Unique test data
- Reusable datasets
- Independent test execution
- Minimal dependency between test cases

Sensitive information such as credentials and environment configuration is maintained outside the source code.

---

## 11. Debugging Strategy

AI was used to assist in debugging issues related to:

- Playwright locators
- Synchronization issues
- Assertion failures
- API request validation
- Framework configuration
- Test execution failures

Suggested fixes were always validated manually before implementation.

---

## 12. Responsible Use of AI

AI was used as an engineering assistant rather than an automated decision-maker.

The following practices were followed throughout the assessment:

- Provide complete project context before prompting.
- Validate every AI-generated response.
- Refine prompts iteratively for better results.
- Preserve engineering judgment while reviewing outputs.
- Avoid sharing sensitive information with AI.
- Document important prompts and validation decisions for future reference.

---

## 13. Repository Deliverables

The repository includes:

- Project Documentation
- Functional Test Cases
- UI Automation
- API Automation
- AI Prompt Documentation
- Execution Evidence
- README
- Prism Framework Implementation

---

## 14. Outcome

This assessment demonstrates a structured AI-assisted QA workflow that combines human expertise with AI capabilities. AI was used to improve productivity, accelerate implementation, and enhance documentation while maintaining manual validation and engineering best practices throughout the testing lifecycle.