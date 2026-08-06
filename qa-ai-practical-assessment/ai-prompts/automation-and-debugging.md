# AI Prompts — Automation and Debugging

## Objective

The objective of this activity was to use AI to understand the existing Prism Playwright Framework before implementing new UI and API automation.

Rather than generating a new automation framework, the goal was to analyze the current project structure, identify reusable components, understand the existing automation patterns, and determine the minimum changes required to implement the approved UI and API automation scenarios while maintaining compatibility with the provided framework.

The AI-generated recommendations were manually reviewed and validated before implementation.

---

## Project Context

**Application:**
Practice Software Testing (Toolshop)

**Framework:**
Prism Playwright Framework

**Assessment Scope:**
AI-assisted automation development, framework analysis, debugging, code validation, and implementation for UI and API layers.

**Primary AI Tool:**
Cursor Enterprise

---

# Prompt Iteration 1 – Prism Framework Analysis

## Prompt

You are a Senior QA Automation Engineer working on an existing Playwright Prism Framework.

Your task is NOT to redesign the framework.

Instead, analyze the current framework and identify reusable components for implementing new UI and API automation.

Please inspect the existing project structure and identify:

- Existing Page Objects
- Existing Page Object Manager (POManager)
- Existing utility classes
- Existing API helpers and payload builders
- Existing reporting utilities
- Existing test folder structure
- Existing hooks (beforeEach / afterEach / beforeAll)
- Existing assertions
- Existing tagging strategy (@smoke / @regression)
- Existing logging implementation
- Existing test data approach
- Existing API request handling and CURL logging

Return:

- Reusable components
- Components that should remain unchanged
- Components that may need extension
- Recommended implementation approach

Do NOT rewrite the framework.

Do NOT suggest architectural changes.

Assume the framework must remain compatible with the existing Prism project.

Return the findings as a technical review.

---

## AI Response Summary

The AI performed a complete technical review of the existing Prism Playwright Framework and identified all reusable components required for implementing the new UI and API automation scenarios.

The review confirmed that the framework already provides a well-structured Page Object Model for UI automation, centralized Page Object Manager (POManager), reusable API utilities (`apiHelper.js`, `toolshopApiData.js`, `toolshopContext.js`), reporting configuration, logging utilities, test data management, execution structure, and tagging conventions.

For API automation, the review identified the existing `commonMethods` class in `apiHelper.js` for GET/POST/PUT/PATCH/DELETE requests, `requestToCurlLogger.js` for CURL request logging to `API/testdata/api_requests.log`, and the `toolshop_api` Playwright project in `playwright.config.js`.

The AI recommended extending the existing framework only where new business functionality requires additional reusable methods, page objects, or API payload builders while preserving the current architecture.

---

## Validation Notes

The AI recommendations were manually reviewed against the Prism project structure.

The following validations were completed:

- Verified existing Page Objects are reusable for new UI automation.
- Confirmed POManager acts as the central access point for all page objects.
- Verified Playwright HTML reporting, screenshots, video recording, and trace collection are already configured for UI tests.
- Confirmed existing logging utilities should be reused without modification.
- Verified the current test folder structure follows the Prism framework conventions (`tests/UI Test/`, `tests/API Test/`).
- Confirmed JSON test data, environment variables, and API payload builders are already integrated into the framework.
- Verified existing tagging strategy supports Regression, Smoke, and Sanity execution for both UI and API specs.
- Confirmed Page Object Model implementation is suitable for extending with additional Toolshop UI modules.
- Verified existing `apiHelper.js` request methods and `toolshopApiData.js` endpoint/payload structure are suitable for Toolshop API scenarios.
- Confirmed `toolshopContext.js` can hold run-scoped API state (token, cart ID, product ID, invoice ID) across serial purchase-flow tests.
- Verified API base URL is loaded from `process.env.URL` via `dotenv` in `playwright.config.js`.
- Confirmed `requestToCurlLogger.js` logs CURL commands to `API/testdata/api_requests.log` for API debugging.

---

## Components Reused

The following framework components were approved for reuse during UI and API automation development:

- Existing Page Objects
- POManager
- Logger Utilities
- Web Utilities
- `apiHelper.js` (`commonMethods`)
- `toolshopApiData.js`
- `toolshopContext.js`
- `requestToCurlLogger.js`
- Playwright Configuration
- Existing Reporting Configuration
- Existing Test Folder Structure
- Existing Test Data Management
- Existing Assertion Strategy
- Existing Execution Flow

---

## Components Preserved Without Modification

To maintain compatibility with the provided Prism Framework, no architectural changes were introduced.

The following components remained unchanged:

- Prism folder structure
- Playwright configuration
- POManager implementation
- Existing utility classes
- Logger implementation
- Reporting configuration
- Existing Page Object design
- Existing `apiHelper.js` request handling pattern
- Existing execution strategy

---

## Implementation Decision

Based on the AI review and manual validation, the existing Prism Framework was considered sufficient for implementing the approved UI and API automation scenarios.

No framework redesign was required.

Future implementation will:

- Reuse existing Page Objects wherever possible.
- Extend Page Objects only when new business functionality is required.
- Follow the existing Page Object Model architecture for UI automation.
- Continue using POManager for object initialization.
- Reuse `apiHelper.js` and extend `toolshopApiData.js` for API request handling and payloads.
- Use `toolshopContext.js` for run-scoped API state across chained purchase-flow scenarios.
- Follow the current reporting, logging, and execution strategy.

---

## Outcome

The framework analysis confirmed that the existing Prism Playwright Framework is suitable for implementing the approved UI and API automation scenarios without structural modifications.

This analysis established the implementation strategy for all subsequent UI and API automation activities and ensured that future automation work would remain fully compatible with the existing project architecture.

## Prompt Iteration 2 – Automate TS-LOGIN-001 Using Existing Prism Framework

### Prompt

You are a Senior QA Automation Engineer working within the existing Prism Playwright Framework.

Context:

- The framework architecture has already been reviewed and approved.
- Do not redesign the framework.
- Reuse existing Page Objects wherever possible.

Task:

Analyze the existing loginPage.js, POManager.js, login test examples, and related utilities.

Compare them against the approved manual test case:

**TS-LOGIN-001 – Authenticate returning customer for protected shopping flows.**

Determine:

1. Which existing methods already support this scenario.
2. Which assertions are already implemented.
3. Which parts of the manual test are not yet automated.
4. Whether any new helper methods are required.
5. Whether new locators are required.
6. Whether reusable methods should be added instead of duplicating code.
7. Generate a production-ready Playwright implementation that remains fully compatible with the existing Prism framework.

---

### AI Response Summary

The AI analyzed the existing Prism Playwright framework and determined that the existing login automation was designed for a different application, making direct reuse of the page object impossible.

Instead of modifying the existing implementation, the AI proposed creating a dedicated `toolshopLoginPage` while preserving the overall Prism architecture and coding conventions.

The generated solution:

- Reused the existing POManager pattern.
- Reused the existing logging utilities.
- Reused framework annotations for traceability.
- Reused storage state generation after successful login.
- Created a dedicated Toolshop Page Object using Toolshop-specific locators.
- Registered the new page object inside POManager.
- Generated a new Playwright specification for TS-LOGIN-001.
- Maintained compatibility with the existing Prism reporting structure.

The generated automation followed the approved manual test case and preserved traceability between manual and automated testing.

---

### Debugging Outcome

The generated automation was executed within the Prism Playwright Framework.

During execution, the following observations were identified:

- Existing login page objects could not be reused because they targeted a different application.
- Toolshop required different URLs and UI locators.
- Additional Toolshop-specific page object methods were introduced without affecting the existing framework.
- Authentication assertions initially failed because the expected navigation element was not visible on every authenticated page.
- The AI recommended validating the authenticated state from the Account page instead of Checkout, where the navigation layout differs.
- Locator strategies were refined using stable `data-test` attributes to improve execution reliability.

After these refinements, the TS-LOGIN-001 automation successfully validated:

- Successful user authentication.
- Navigation to the authenticated account area.
- Visibility of authenticated navigation elements.
- Access to protected application pages.
- Preservation of the authenticated browser session.

The implementation remained fully compatible with the existing Prism Playwright framework without introducing unnecessary architectural changes.

---

### Validation Performed

- Verified compatibility with the existing Prism framework.
- Confirmed Page Object Model conventions were preserved.
- Verified reusable framework components were leveraged wherever possible.
- Confirmed successful execution of the TS-LOGIN-001 automation.
- Verified traceability between the manual test case and the automated Playwright test.
- Reviewed the generated implementation before accepting it into the framework.

---

# Prompt Iteration 2 – Implement Remaining Business-Critical UI Automation

## Prompt

You are a Senior QA Automation Engineer working within the existing Prism Playwright Framework.

Context:

- TS-LOGIN-001 has already been implemented successfully.
- The framework architecture has already been reviewed and approved.
- Do not redesign the framework.
- Reuse the existing Page Objects, POManager, utilities, logging, annotations, and storage state.
- Maintain complete compatibility with the existing Prism framework.

Automate the remaining approved business-critical UI test cases:

- TS-REG-001 – Successful Registration
- TS-SEARCH-001 – Product Search
- TS-CART-001 – Add Product to Cart
- TS-CHK-001 – Complete Checkout (Cash on Delivery with known double-confirm behavior)
- TS-LOGIN-002 – Invalid Login
- TS-CHK-003 – Checkout Mandatory Field Validation

Requirements:

- Reuse all existing reusable components.
- Create only missing Page Object methods.
- Do not duplicate functionality.
- Follow the existing coding style.
- Use stable Playwright locators.
- Keep assertions deterministic.
- Generate Playwright spec files compatible with the current framework.
- Update POManager only where required.
- Preserve logging, annotations, reporting, and framework conventions.

Return complete production-ready implementation only.

---

## AI Response Summary

The AI analyzed the existing Toolshop automation implementation created during Iteration 1 and reused the established architecture to automate the remaining six approved UI scenarios.

Instead of introducing new framework components, the implementation extended the existing Toolshop Page Objects with only the additional methods required for Registration, Product Search, Shopping Cart, Checkout, Invalid Login, and Checkout Validation.

The generated automation:

- Reused the existing POManager.
- Reused loggerUtilities for execution logging.
- Reused Playwright storage state where appropriate.
- Followed the existing Page Object Model.
- Added only missing page methods and locators.
- Created dedicated Playwright specification files for each approved scenario.
- Used explicit assertions to improve automation reliability.
- Maintained compatibility with the Prism reporting and annotation mechanism.

The implementation remained fully aligned with the approved manual functional test suite and preserved traceability between manual and automated test cases.

---

## Debugging Outcome

The generated automation was executed within the Prism Playwright Framework and reviewed before acceptance.

During execution, a small number of framework and application-specific issues were identified, including locator stability, synchronization timing, and authenticated navigation behavior.

Each issue was analyzed before modifying the automation.

The following improvements were applied:

- Updated unstable locators with more reliable selectors.
- Improved synchronization by replacing fixed waits with Playwright's explicit waiting mechanisms.
- Reused existing helper methods wherever possible instead of duplicating logic.
- Verified Page Object responsibilities remained isolated and reusable.
- Ensured assertions validated business outcomes rather than implementation details.
- Confirmed successful execution of the approved business-critical scenarios after refinements.

No unnecessary framework restructuring was introduced during debugging.

The final implementation remained fully compatible with the existing Prism Playwright architecture while improving automation stability, maintainability, and execution reliability.

---

## Validation Performed

- Verified all approved UI automation scenarios compile successfully.
- Confirmed Page Objects follow existing Prism design standards.
- Verified reusable framework components were used throughout the implementation.
- Confirmed logging, annotations, and reporting remained functional.
- Verified automation maintains traceability with the approved manual functional test cases.
- Confirmed implementation supports future maintenance without duplicating framework logic.

---

# Prompt Iteration 2 – Implement Toolshop API Automation

## Prompt

You are a Senior QA Automation Engineer working within the existing Prism Playwright Framework.

Context:

- The approved API test suite from `ApiTestCase.csv` and `api-testing-design.md` has been finalized.
- The framework architecture has already been reviewed and approved.
- Do not redesign the framework.
- Reuse existing API utilities (`apiHelper.js`, `requestToCurlLogger.js`), environment configuration, and Playwright reporting.
- Maintain complete compatibility with the existing Prism framework.

Automate the approved business-critical API test cases:

- API-AUTH-001 – Obtain bearer token for authenticated API flows
- API-AUTH-002 – Reject authentication with invalid credentials
- API-PROD-001 – Retrieve product catalog
- API-PROD-002 – Search products by known keyword
- API-CART-002 – Create cart and add in-stock product
- API-CHK-001 – Validate checkout payment payload for COD order
- API-INV-001 – Generate invoice and verify proof-of-purchase record

Requirements:

- Reuse `commonMethods` from `apiHelper.js` for HTTP requests.
- Extend `toolshopApiData.js` for endpoints, headers, and payload builders.
- Use `toolshopContext.js` for run-scoped state (token, cart ID, product ID, invoice ID).
- Store credentials and base URL in environment variables (`URL`, `TOOLSHOP_EMAIL`, `TOOLSHOP_PASSWORD`); never hardcode secrets.
- Tag Smoke specs `@smoke`; Regression specs `@regression`.
- Use `test.info().annotations` with `test_key` for traceability to manual API test IDs.
- Chain purchase-flow scenarios (CART → CHK → INV) in a serial suite with shared context.
- Validate HTTP status codes, response headers, body schema, and business outcomes per Swagger contract.
- Log requests via `requestToCurlLogger.js` to `API/testdata/api_requests.log`.
- Generate Playwright spec files under `tests/API Test/` compatible with the `toolshop_api` project.
- Preserve logging, annotations, reporting, and framework conventions.

Return complete production-ready implementation only.

---

## AI Response Summary

The AI analyzed the existing Prism API utilities and the approved API test suite from `api-testing-design.md`, then implemented Toolshop API automation by extending the established framework rather than introducing new architectural components.

The generated solution:

- Reused `commonMethods` from `apiHelper.js` for GET and POST requests against `process.env.URL`.
- Extended `toolshopApiData.js` with Toolshop endpoints (`users/login`, `users/me`, `products`, `products/search`, `carts`, `payment/check`, `invoices`), header builders, and payload functions for login, cart, payment check, and invoice creation.
- Used `toolshopContext.js` to share bearer token, user profile, product ID, cart ID, cart total, and invoice details across serial purchase-flow tests.
- Reused `requestToCurlLogger.js` for CURL logging to `API/testdata/api_requests.log`.
- Created `03_toolshopAuthApi.spec.js` for API-AUTH-001 and API-AUTH-002.
- Created `04_toolshopProductApi.spec.js` for API-PROD-001 and API-PROD-002.
- Created `05_toolshopPurchaseFlowApi.spec.js` as a serial suite for API-CART-002, API-CHK-001, and API-INV-001 with a `beforeAll` setup that authenticates and resolves an in-stock product.
- Applied `@smoke` and `@regression` tags aligned with the approved API test suite.
- Added `test_key` annotations for traceability to each API test ID.
- Asserted status codes, `content-type` headers, response schema fields (`access_token`, `token_type`, `expires_in`, product `id`/`name`/`price`, cart line items, invoice totals), and business checks (profile email match via `GET /users/me`, search keyword containment, line-item pricing, invoice list verification).

The implementation followed the approved API business flow order: **Login → Product Discovery → Cart → Checkout → Invoice**, as defined in `api-testing-design.md`.

---

## Debugging Outcome

The generated API automation was executed within the Prism Playwright Framework using the `toolshop_api` project and reviewed before acceptance.

During execution, the following observations were identified:

- API-AUTH-001 required a follow-up `GET /users/me` call to validate the bearer token and confirm profile email matched `process.env.TOOLSHOP_EMAIL`.
- API-AUTH-002 initially needed exact `401` status assertion aligned with the Swagger contract rather than accepting multiple error codes.
- API-PROD-001 and API-PROD-002 required flexible schema checks for `in_stock` (boolean) or `stock` (number) because product catalog fields vary across API responses.
- API-CART-002 required accepting both `200` and `201` for cart creation because the API contract permits either status.
- Cart line-item total validation used `unit_price * quantity` from the cart response rather than assuming a pre-stored product price.
- API-CHK-001 payment check payload required COD-specific fields (`method`, `account_name`, `account_number`, `bank_name`, `sort_code`) per Swagger schema.
- API-INV-001 required accepting both `200` and `201` for invoice creation and handling both `invoicelines` and `invoice_items` field names in the list response.
- Invoice total assertion compared `invoiceBody.total` against `toolshopContext.cartTotal` calculated during cart setup.
- Invoice list verification confirmed the created invoice belonged to the authenticated user via `user_id` match.
- Purchase-flow serial execution required `test.describe.serial` and a shared `beforeAll` to authenticate and resolve an in-stock product before cart, checkout, and invoice steps.

After these refinements, all seven approved Toolshop API automation scenarios executed successfully within the existing Prism Playwright Framework.

---

## Validation Performed

- Verified all approved API automation scenarios compile and execute under the `toolshop_api` Playwright project.
- Confirmed API specs follow existing Prism API conventions (`apiHelper.js`, payload builders, CURL logging).
- Verified credentials and base URL are loaded from `.env` via `dotenv`; no secrets hardcoded in spec files.
- Confirmed `toolshopContext.js` correctly shares state across serial purchase-flow tests.
- Verified HTTP status codes, response headers, schema fields, and business assertions match the approved `ApiTestCase.csv` expectations.
- Confirmed `test_key` annotations provide traceability to manual API test IDs.
- Verified CURL requests are logged to `API/testdata/api_requests.log` during execution.
- Confirmed logging, annotations, and HTML reporting remained functional for API runs.
- Verified automation maintains traceability with the approved manual API test cases and `api-testing-design.md`.

---

## Iteration 3 – Debugging & Stabilization of UI and API Automation

### Prompt

The initial implementation of all seven approved Toolshop UI automation scenarios and seven approved Toolshop API automation scenarios has been completed within the existing Prism Playwright Framework.

Analyze the execution results, Playwright HTML report, traces, screenshots, console logs, API CURL logs, and any failing assertions.

Do not redesign the framework.

Your objective is to:

- Identify the root cause of each failure.
- Determine whether the issue is caused by incorrect locators, synchronization, test data, page object implementation, API request/response mismatch, framework configuration, or actual application behaviour.
- Recommend the minimum code changes required.
- Reuse existing Page Objects and API utilities wherever possible.
- Keep the solution fully compatible with the current Prism architecture.
- Improve stability without introducing unnecessary waits or duplicated code.
- Suggest reusable helper methods if they improve maintainability.

Return:

- Root Cause Analysis
- Recommended Fixes
- Debugging Summary
- Framework Compatibility Notes
- Stability Improvements
- Final Validation Strategy

---

### AI Response Summary

The AI analyzed the execution report and identified multiple stability issues affecting the automated UI and API scenarios.

The main findings were:

- Existing login components were designed for another application and Toolshop required dedicated page objects and locators.
- Several UI failures were caused by timing issues rather than automation logic.
- Some application pages displayed different layouts, making existing assertions invalid.
- Checkout behaviour required additional synchronization because billing information and order confirmation are processed asynchronously.
- Product availability exposed through APIs was not always immediately available in the UI.
- Invoice generation required polling instead of immediate verification in UI tests.
- Missing framework dependencies prevented successful execution until installed.
- Reusable helper methods were introduced to eliminate duplicated login, registration, checkout and product-selection logic in UI tests.
- Toolshop-specific page objects were added while preserving the existing Prism folder structure, reporting, annotations and utilities.
- API purchase-flow tests required serial execution with shared `toolshopContext` state to chain cart, checkout, and invoice steps reliably.
- API response schema variations (e.g., `in_stock` vs `stock`, `invoicelines` vs `invoice_items`) required flexible assertion patterns.
- API status code assertions needed alignment with exact Swagger contract values (`401` for invalid login, `200`/`201` for cart and invoice creation).
- CURL request logs in `API/testdata/api_requests.log` helped diagnose API payload and header issues during debugging.

The AI recommended replacing static waits with Playwright synchronization methods for UI tests, improving locator strategies using `data-test` attributes, introducing reusable helper functions, validating application and API behaviour before modifying assertions, and using `requestToCurlLogger.js` output for API request debugging.

---

### Debugging Outcome

The suggested improvements were implemented and validated through multiple execution cycles.

The following UI issues were successfully resolved:

- Login page synchronization issues.
- Authentication verification failures.
- Registration timing problems.
- Product selection inconsistencies.
- Checkout synchronization issues.
- Invoice generation delays.
- Locator instability.
- Missing framework dependencies.

The following API issues were successfully resolved:

- Bearer token validation required follow-up `GET /users/me` profile assertion in API-AUTH-001.
- Invalid login status code assertion aligned to exact `401` response.
- Product catalog schema checks adapted for `in_stock` boolean and `stock` number fields.
- Cart creation status accepted both `200` and `201` per API contract.
- Payment check payload fields aligned to COD Swagger schema.
- Invoice creation and list response handled both `invoicelines` and `invoice_items` field names.
- Invoice total assertion validated against run-scoped `cartTotal` from cart setup.
- Serial purchase-flow execution stabilized with `test.describe.serial` and shared `beforeAll` authentication.

Stability improvements included:

- Replacing fixed waits with Playwright auto-wait mechanisms for UI tests.
- Using explicit URL and element state verification in UI assertions.
- Creating reusable helper methods for common UI workflows.
- Improving locator reliability using application-specific `data-test` attributes.
- Reducing duplicate automation code across multiple UI scenarios.
- Using `toolshopContext.js` for run-scoped API state instead of global fixtures.
- Logging API requests to `API/testdata/api_requests.log` for reproducible debugging.
- Scoping API assertions to data created in the current test run on the shared demo backend.

After applying the recommended fixes, all seven approved Toolshop UI automation scenarios and all seven approved Toolshop API automation scenarios executed successfully within the existing Prism Playwright Framework without requiring any architectural changes.

The debugging process improved reliability, maintainability, and execution stability while keeping the framework fully aligned with the assessment requirements.

## Execution Evidence

After stabilization:

### UI Automation

- Executed all 7 approved UI automation scenarios (`05_returningCustomerLoginTest.spec.js` through `11_toolshopCheckoutValidationTest.spec.js`).
- Generated Playwright HTML Report via `reporter: 'html'` in `playwright.config.js`.
- Verified execution logs in `executionResultLogs.log`.
- Reviewed screenshots, videos, and traces in `test-results/` for failed executions.
- Re-ran the complete UI regression suite after fixes (`npm run test:regression`).
- Confirmed all UI scenarios passed successfully.
- Archived UI HTML report and screenshot in `Evidence/UI/`.

### API Automation

- Executed all 7 approved API automation scenarios across `03_toolshopAuthApi.spec.js`, `04_toolshopProductApi.spec.js`, and `05_toolshopPurchaseFlowApi.spec.js`.
- Executed API Smoke suite via `npm run test:api-smoke` (`toolshop_api` project, `@smoke` tag).
- Executed API Regression suite via `npm run test:api-regression` (`toolshop_api` project, `@regression` tag).
- Generated Playwright HTML Report for API runs.
- Verified CURL request logs in `API/testdata/api_requests.log`.
- Reviewed API execution results and response assertions in the HTML report.
- Re-ran the complete API suite after fixes (`npm run test:api`).
- Confirmed all API scenarios passed successfully.
- Archived API HTML report and screenshot in `Evidence/API/`.

## Final Reflection

Throughout the automation activity, AI was used as an engineering assistant rather than a code generator.

Each generated Playwright implementation — for both UI page objects and API specs — was manually reviewed before integration into the Prism framework.

During execution, multiple synchronization issues, locator mismatches, application-specific behaviors, API response schema variations, and framework compatibility problems were identified through Playwright reports, execution logs, and API CURL logs.

Instead of regenerating the complete automation, the AI prompts were refined iteratively to resolve only the identified issues while preserving the existing framework architecture.

The final implementation successfully automated all seven approved business-critical UI scenarios and all seven approved business-critical API scenarios (Authentication, Product Catalog, Product Search, Cart, Checkout, Invoice), remained compatible with the existing Prism framework, and produced a stable, maintainable automation suite across both UI and API layers.

UI automation covered the complete customer journey through the browser (Login, Registration, Search, Cart, Checkout, Validation). API automation covered the equivalent purchase journey through REST endpoints (`POST /users/login`, `GET /products`, `GET /products/search`, `POST /carts`, `POST /payment/check`, `POST /invoices`, `GET /invoices`), with run-scoped data and bearer-token authentication managed through `toolshopContext.js` and environment configuration.

This iterative workflow demonstrates responsible AI-assisted software testing through planning, validation, debugging, execution, and continuous improvement across UI and API automation.
