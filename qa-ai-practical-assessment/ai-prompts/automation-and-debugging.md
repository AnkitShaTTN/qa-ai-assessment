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

The review confirmed that the framework already provides a well-structured Page Object Model for UI automation, centralized Page Object Manager (POManager), reusable API utilities (`apiHelper.js`, `toolshopApiPage.js`, `requestToCurlLogger.js`), reporting configuration, logging utilities, test data management, execution structure, and tagging conventions.

For API automation, the review identified the existing `commonMethods` class in `apiHelper.js` for GET/POST/PUT/PATCH/DELETE requests, `requestToCurlLogger.js` for CURL request logging, `storeFullAPIResponse.js` for response capture, and the single `testcases_regression` Playwright project in `playwright.config.js`.

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
- Verified existing `apiHelper.js` request methods and `toolshopApiPage.js` endpoint/header structure are suitable for Toolshop API scenarios.
- Confirmed serial API state is persisted via JSON files in `API/testdata/` (`toolshopRegisteredUser.json`, `toolshopAccessToken.json`, `toolshopSession.json`) across chained purchase-flow tests.
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
- `toolshopApiPage.js`
- `requestToCurlLogger.js`
- `storeFullAPIResponse.js`
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
- Reuse `apiHelper.js` and extend `toolshopApiPage.js` for API request handling and endpoints.
- Use `API/testdata/*.json` files for run-scoped API state across chained purchase-flow scenarios.
- Follow the current reporting, logging, and execution strategy.

---

## Outcome

The framework analysis confirmed that the existing Prism Playwright Framework is suitable for implementing the approved UI and API automation scenarios without structural modifications.

This analysis established the implementation strategy for all subsequent UI and API automation activities and ensured that future automation work would remain fully compatible with the existing project architecture.

## Prompt Iteration 2 – Automate TC_LOGIN_001 Using Existing Prism Framework

### Prompt

You are a Senior QA Automation Engineer working within the existing Prism Playwright Framework.

Context:

- The framework architecture has already been reviewed and approved.
- Do not redesign the framework.
- Reuse existing Page Objects wherever possible.

Task:

Analyze the existing loginPage.js, POManager.js, login test examples, and related utilities.

Compare them against the approved manual test case:

**TC_LOGIN_001 – Successful login with valid registered credentials.**

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

Instead of modifying the existing implementation, the AI proposed extending the existing `loginPage.js` with Toolshop-specific locators while preserving the overall Prism architecture and coding conventions.

The generated solution:

- Reused the existing POManager pattern.
- Reused the existing logging utilities.
- Reused framework annotations for traceability via `testCasesMeta.json`.
- Extended `loginPage.js` with Toolshop-specific navigation and locators.
- Registered page objects inside POManager (`loginPage`, `homePage`, etc.).
- Generated `01_loginPageTest.spec.js` for TC_LOGIN_001 and TC_LOGIN_002.
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

After these refinements, the TC_LOGIN_001 automation successfully validated:

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
- Confirmed successful execution of the TC_LOGIN_001 automation.
- Verified traceability between the manual test case and the automated Playwright test.
- Reviewed the generated implementation before accepting it into the framework.

---

# Prompt Iteration 2 – Implement Remaining Business-Critical UI Automation

## Prompt

You are a Senior QA Automation Engineer working within the existing Prism Playwright Framework.

Context:

- TC_LOGIN_001 has already been implemented successfully in `01_loginPageTest.spec.js`.
- The framework architecture has already been reviewed and approved.
- Do not redesign the framework.
- Reuse the existing Page Objects, POManager, utilities, logging, annotations, and storage state.
- Maintain complete compatibility with the existing Prism framework.

Automate the remaining approved business-critical UI test cases:

- TC_REG_001 – Successful Registration (`02_registrationPageTest.spec.js`)
- TC_SEARCH_001 – Product Search (`03_productSearchPageTest.spec.js`)
- TC_PD_001 – Product Details (`04_productDetailsPageTest.spec.js`)
- TC_CART_001 – Add Product to Cart (`05_shoppingCartPageTest.spec.js`)
- TC_CHK_001 – Complete Checkout (`06_checkoutPageTest.spec.js`)
- TC_LOGIN_002 – Invalid Login (`01_loginPageTest.spec.js`)
- TC_CHK_002 – Checkout Navigation (`06_checkoutPageTest.spec.js`)

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

- The approved API test suite from `api-testing-design.md` has been finalized as 5 serial automation tests (`TC_API_001`–`TC_API_005`).
- The framework architecture has already been reviewed and approved.
- Do not redesign the framework.
- Reuse existing API utilities (`apiHelper.js`, `requestToCurlLogger.js`), environment configuration, and Playwright reporting.
- Maintain complete compatibility with the existing Prism framework.

Automate the approved business-critical API test cases as a serial chain:

- TC_API_001 – Register a new user (`01_registerUser.spec.js`)
- TC_API_002 – Login and generate bearer token (`02_loginUser.spec.js`)
- TC_API_003 – Retrieve product catalog (`03_products.spec.js`)
- TC_API_004 – Create cart and add product (`04_cart.spec.js`)
- TC_API_005 – Generate invoice with Cash on Delivery (`05_invoice.spec.js`)

Requirements:

- Reuse `commonMethods` from `apiHelper.js` for HTTP requests.
- Extend `toolshopApiPage.js` for endpoints and header builders.
- Persist run-scoped state in `API/testdata/*.json` files (registered user, access token, session/cart).
- Store API base URL in `process.env.URL` via `dotenv`; UI base URL in `process.env.BASE_URL`.
- Tag API specs `@api` and `@toolshop`; UI specs `@smoke` / `@regression`.
- Use `test.info().annotations` with `test_key` for traceability to `TC_API_*` IDs.
- Chain purchase-flow scenarios (register → login → products → cart → invoice) with file-based dependencies.
- Validate HTTP status codes, response headers, body schema, and business outcomes per Swagger contract.
- Log requests via `requestToCurlLogger.js`.
- Generate Playwright spec files under `tests/API Test/` on the `testcases_regression` project.
- Preserve logging, annotations, reporting, and framework conventions.

Return complete production-ready implementation only.

---

## AI Response Summary

The AI analyzed the existing Prism API utilities and the approved API test suite from `api-testing-design.md`, then implemented Toolshop API automation by extending the established framework rather than introducing new architectural components.

The generated solution:

- Reused `commonMethods` from `apiHelper.js` for GET and POST requests against `process.env.URL`.
- Extended `toolshopApiPage.js` with Toolshop endpoints (`users/register`, `users/login`, `products`, `carts`, `invoices`) and `authHeaders` / `jsonHeaders` builders.
- Used JSON files in `API/testdata/` to share registered user, bearer token, product ID, and cart ID across serial purchase-flow tests.
- Reused `requestToCurlLogger.js` for CURL logging.
- Created `01_registerUser.spec.js` for TC_API_001 (writes `toolshopRegisteredUser.json`).
- Created `02_loginUser.spec.js` for TC_API_002 (reads registered user, writes `toolshopAccessToken.json`).
- Created `03_products.spec.js` for TC_API_003 (stores product ID in `toolshopSession.json`).
- Created `04_cart.spec.js` for TC_API_004 (creates cart, adds product using bearer token).
- Created `05_invoice.spec.js` for TC_API_005 (generates COD invoice from cart session).
- Applied `@api`, `@toolshop`, and `@smoke` tags aligned with the API test suite.
- Added `test_key` annotations for traceability to each `TC_API_*` ID.
- Asserted status codes, response schema fields, and business checks (registration success, token type, product list, cart line items, invoice totals).

The implementation followed the approved API business flow order: **Register → Login → Product Discovery → Cart → Invoice**.

---

## Debugging Outcome

The generated API automation was executed within the Prism Playwright Framework using the `testcases_regression` project with `--grep @toolshop --workers=1` and reviewed before acceptance.

During execution, the following observations were identified:

- TC_API_002 requires `toolshopRegisteredUser.json` from TC_API_001; missing file causes explicit failure message.
- TC_API_004 requires both `toolshopAccessToken.json` and `toolshopSession.json` from prior specs.
- TC_API_003 stores the first available product ID for cart operations.
- TC_API_004 cart creation required accepting both `200` and `201` for cart creation because the API contract permits either status.
- TC_API_005 invoice payload uses fields from `toolshopInvoiceData.json` with COD payment method.
- Serial execution with `workers=1` is required to maintain file-based state chain integrity.
- CURL request logs in `API/testdata/api_requests.log` helped diagnose API payload and header issues during debugging.

After these refinements, all five approved Toolshop API automation scenarios executed successfully within the existing Prism Playwright Framework.

---

## Validation Performed

- Verified all approved API automation scenarios compile and execute under the `testcases_regression` project with `@toolshop` filter.
- Confirmed API specs follow existing Prism API conventions (`apiHelper.js`, `toolshopApiPage.js`, CURL logging).
- Verified API base URL is loaded from `.env` via `dotenv`; registration email generated at runtime.
- Confirmed `API/testdata/*.json` files correctly share state across serial purchase-flow tests.
- Verified HTTP status codes, response schema fields, and business assertions match Swagger expectations.
- Confirmed `test_key` annotations provide traceability to `TC_API_*` test IDs.
- Verified CURL requests are logged to `API/testdata/api_requests.log` during execution.
- Confirmed logging, annotations, and HTML reporting remained functional for API runs.
- Verified automation maintains traceability with the approved manual API test cases and `api-testing-design.md`.

---

## Iteration 3 – Debugging & Stabilization of UI and API Automation

### Prompt

The initial implementation of all eight Toolshop UI automation tests and five Toolshop API automation tests has been completed within the existing Prism Playwright Framework.

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
- API purchase-flow tests required serial execution (`--workers=1`) with file-based state in `API/testdata/*.json` to chain register → login → products → cart → invoice steps reliably.
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

- Bearer token validation in TC_API_002 stores token in `toolshopAccessToken.json` for downstream cart/invoice specs.
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
- Using `API/testdata/*.json` for run-scoped API state instead of global fixtures.
- Logging API requests to `API/testdata/api_requests.log` for reproducible debugging.
- Scoping API assertions to data created in the current test run on the shared demo backend.

After applying the recommended fixes, all eight Toolshop UI automation tests and all five Toolshop API automation tests executed successfully within the existing Prism Playwright Framework without requiring any architectural changes.

The debugging process improved reliability, maintainability, and execution stability while keeping the framework fully aligned with the assessment requirements.

## Execution Evidence

After stabilization:

### UI Automation

- Executed all 8 Toolshop UI tests across `01_loginPageTest.spec.js` through `06_checkoutPageTest.spec.js`.
- **Result: 8/8 passed** (~2.7 minutes, `--workers=2`).
- Generated Playwright HTML Report via `reporter: 'html'` in `playwright.config.js`.
- Verified execution logs in `executionResultLogs.log`.
- Reviewed screenshots, videos, and traces in `test-results/` for failed executions.
- Legacy Prism specs (`02_createSystemTest.spec.js`, `03_createDistrictTest.spec.js`, `04_comparepdf.spec.js`) excluded from Toolshop runs to avoid collection errors.
- Archived UI HTML report and screenshot in `Evidence/UI/`.

### API Automation

- Executed all 5 Toolshop API tests (`01_registerUser.spec.js` through `05_invoice.spec.js`).
- **Result: 5/5 passed** (~6.3 seconds, `--workers=1`, `--grep @toolshop`).
- Command: `npx playwright test --project=testcases_regression "tests/API Test" --grep "@toolshop" --workers=1`
- Generated Playwright HTML Report for API runs.
- Verified CURL request logs in `API/testdata/api_requests.log`.
- Archived API HTML report and screenshot in `Evidence/API/`.

### Combined Result

**13/13 tests passed** (8 UI + 5 API) against `practicesoftwaretesting.com` and `api.practicesoftwaretesting.com`.

## Final Reflection

Throughout the automation activity, AI was used as an engineering assistant rather than a code generator.

Each generated Playwright implementation — for both UI page objects and API specs — was manually reviewed before integration into the Prism framework.

During execution, multiple synchronization issues, locator mismatches, application-specific behaviors, API response schema variations, and framework compatibility problems were identified through Playwright reports, execution logs, and API CURL logs.

Instead of regenerating the complete automation, the AI prompts were refined iteratively to resolve only the identified issues while preserving the existing framework architecture.

The final implementation successfully automated eight Toolshop UI tests and five Toolshop API tests, remained compatible with the existing Prism framework, and produced a stable, maintainable automation suite across both UI and API layers.

UI automation covered the complete customer journey through the browser (Login, Registration, Search, Product Details, Cart, Checkout). API automation covered the equivalent purchase journey through REST endpoints (`POST /users/register`, `POST /users/login`, `GET /products`, `POST /carts`, `POST /invoices`), with run-scoped data managed through `API/testdata/*.json` files and environment configuration (`URL`, `BASE_URL`).

This iterative workflow demonstrates responsible AI-assisted software testing through planning, validation, debugging, execution, and continuous improvement across UI and API automation.
