# AI Prompts — Test Design

## Objective

The objective of this activity was to use AI to design a business-focused manual test suite for the Practice Software Testing (Toolshop) application.

The generated test cases serve as the foundation for subsequent API testing, Playwright automation, exploratory testing, and traceability throughout the assessment.

The AI outputs were reviewed and refined before being accepted for implementation.

## Project Context

Application:
Practice Software Testing (Toolshop)

Framework:
Prism Playwright Framework

Assessment Scope:
AI-assisted QA workflow covering manual testing, API testing, automation, documentation, and validation.

Primary AI Tool:
Cursor Enterprise

## Prompt Iteration 1 – Initial Test Design

**Prompt:**
You are a Senior QA Automation Engineer with expertise in Functional Testing and Playwright Automation.

Perform Test Design for the Practice Software Testing (Toolshop) application.
Generate manual functional test cases for business-critical user journeys covering positive, negative, boundary, and validation scenarios across Login, Registration, Product Search, Product Details, Shopping Cart, Checkout, and Invoice Generation.

Categorize each test case as Smoke or Regression with Priority (High/Medium/Low).
Output as a Markdown table. Generate approximately 15–20 high-quality, non-duplicate test cases following ISTQB practices.

**AI Response Summary:**
Generated 18 manual functional test cases mapped to CUJ-1 through CUJ-4 from the reviewed requirement analysis. Coverage includes 7 Smoke and 11 Regression cases across all in-scope modules, with explicit encoding of the checkout double-confirm quirk and shared-backend data hygiene assumptions.

**Validation Notes:**
- Test cases aligned to accepted requirement analysis in `requirements-and-planning.md`.
- Checkout TC-CHK-003 encodes known double-confirm behavior per project rules — not treated as a defect.
- Registration and login cases assume run-scoped unique email data for shared demo environment.
- Invoice assertions scoped to order created within the test run, not global invoice counts.
- Steps written for later Prism Playwright POM automation (page-level actions, stable assertions).

---

## Manual Functional Test Cases — Toolshop

**SUT:** https://practicesoftwaretesting.com  
**Traceability:** AC1 (UI) · AC2 (UI) · CUJ-1 · CUJ-2 · CUJ-3 · CUJ-4

| Test ID | Module | Scenario | Preconditions | Test Steps | Expected Result | Priority | Test Type |
|---|---|---|---|---|---|---|---|
| TS-LOGIN-001 | Login | Valid login with registered credentials (Positive) | User account exists; user is logged out; browser on Home page | 1. Navigate to Login page.<br>2. Enter valid email and password.<br>3. Click **Sign in**. | User is authenticated and redirected to Home (or previous page). Nav bar shows logged-in state (e.g., profile/menu). No error message displayed. | High | Smoke |
| TS-LOGIN-002 | Login | Login with invalid credentials (Negative) | User is logged out; known invalid credentials available | 1. Navigate to Login page.<br>2. Enter invalid email and/or password.<br>3. Click **Sign in**. | Login is rejected. Appropriate error message is shown. User remains unauthenticated and is not redirected to a protected area. | High | Regression |
| TS-REG-001 | Registration | Successful registration with valid unique data (Positive) | User is logged out; unique email not previously registered in this test run | 1. Navigate to Register page.<br>2. Complete all mandatory fields with valid data (use dynamically generated unique email).<br>3. Submit registration form. | Account is created successfully. Success confirmation is shown and/or user can proceed to login with the new credentials. | High | Smoke |
| TS-REG-002 | Registration | Submit form with missing mandatory fields (Validation) | User is logged out; Register page accessible | 1. Navigate to Register page.<br>2. Leave one or more mandatory fields empty.<br>3. Attempt to submit. | Form submission is blocked or rejected. Field-level validation messages indicate required fields. Account is not created. | Medium | Regression |
| TS-REG-003 | Registration | Register with an already-used email (Negative) | Existing registered email is known; user is logged out | 1. Navigate to Register page.<br>2. Enter all valid data using an email already registered.<br>3. Submit registration form. | Registration fails with a clear duplicate-email (or equivalent) error. No duplicate account is created. | High | Regression |
| TS-SEARCH-001 | Product Search | Search with a valid keyword that matches catalog items (Positive) | User on Home/Catalog page; at least one product matches the chosen keyword | 1. Enter a known product keyword in the search field.<br>2. Execute search (Enter or search action). | Search results page/list displays products relevant to the keyword. Result count > 0. Matching product name(s) visible. | High | Smoke |
| TS-SEARCH-002 | Product Search | Search with keyword yielding no results (Negative) | User on Home/Catalog page | 1. Enter a keyword unlikely to match any product (e.g., `zzznomatch12345`).<br>2. Execute search. | No products are listed (or explicit "no results" message shown). Application remains stable with no crash/error page. | Medium | Regression |
| TS-SEARCH-003 | Product Search | Search with minimum-length / whitespace input (Boundary) | User on Home/Catalog page | 1. Enter a single character or whitespace-only input.<br>2. Execute search. | Application handles input gracefully: either shows validation guidance, ignores invalid search, or returns controlled results. No unhandled error. | Medium | Regression |
| TS-PD-001 | Product Details | View product details for an in-stock item (Positive) | Catalog accessible; at least one in-stock product available | 1. From catalog or search results, open a product.<br>2. Review product details page. | Details page displays product name, price, description/image, and stock/availability status. Add-to-cart control is available for in-stock item. | High | Smoke |
| TS-PD-002 | Product Details | Add in-stock product to cart from details page (Positive) | User logged in (if required by app); product details page open for in-stock item | 1. On Product Details, set quantity = 1 (default).<br>2. Click **Add to cart**. | Item is added successfully (toast/message and/or cart badge increment). Cart reflects the added product. | High | Regression |
| TS-CART-001 | Shopping Cart | Add product to cart from catalog journey (Positive) | User logged in; product available | 1. Search or browse to a product.<br>2. Add product to cart.<br>3. Open Cart page. | Cart lists the added product with correct name, unit price, quantity, and line subtotal. Cart total updates accordingly. | High | Smoke |
| TS-CART-002 | Shopping Cart | Update item quantity and verify total recalculation (Boundary) | User logged in; cart contains at least one item | 1. Open Cart page.<br>2. Increase quantity to a valid upper value (e.g., 2 or 3).<br>3. Save/update if required.<br>4. Decrease quantity back to 1. | Line subtotal and cart total recalculate correctly for each quantity change. No stale totals displayed. | High | Regression |
| TS-CART-003 | Shopping Cart | Remove item from cart (Positive) | User logged in; cart contains at least one item | 1. Open Cart page.<br>2. Remove the item (delete/remove action).<br>3. Observe cart state. | Item is removed from cart. Cart is empty or shows zero items. Cart total reflects empty state. | Medium | Regression |
| TS-CHK-001 | Checkout | Complete Cash on Delivery (COD) checkout end-to-end (Positive) | User logged in; cart has at least one item; valid billing/shipping data available | 1. Open Cart and proceed to Checkout.<br>2. Complete required billing/shipping fields with valid data.<br>3. Select COD (or demo payment method).<br>4. Click **Confirm** twice (known app behavior). | Order is placed successfully. Confirmation/success state is shown. User can access post-order invoice/order details. | High | Smoke |
| TS-CHK-002 | Checkout | Attempt checkout while not authenticated (Negative) | User logged out; product added to session/guest cart if supported | 1. Add a product to cart without logging in.<br>2. Attempt to proceed to Checkout. | User is prompted to login or checkout is blocked. Order cannot be completed without authentication. | Medium | Regression |
| TS-CHK-003 | Checkout | Verify invoice generation requires double Confirm click (Validation) | User logged in; cart has item; checkout form valid | 1. Proceed to Checkout with valid details.<br>2. Click **Confirm** once.<br>3. Observe result.<br>4. Click **Confirm** second time. | After first click, order/invoice may not be finalized. After second click, order completes and invoice becomes available. Behavior matches known application quirk. | High | Regression |
| TS-INV-001 | Invoice Generation | Invoice is generated after successful checkout (Positive) | User logged in; successful checkout just completed in same session | 1. Complete checkout (Confirm ×2).<br>2. Navigate to invoice/order confirmation view (or follow post-checkout link). | Invoice (or order receipt) is displayed. Invoice number/ID is present. Page loads without error. | High | Smoke |
| TS-INV-002 | Invoice Generation | Invoice content matches placed order (Validation) | Successful checkout completed; invoice page accessible | 1. Open generated invoice for the current order.<br>2. Compare product name, quantity, unit price, and total against cart/checkout values. | Invoice line items and totals match the order placed in the test run. Customer/order metadata (e.g., date, amount) is consistent. | High | Regression |

### Coverage Summary

| Category | Count | Test IDs |
|---|---|---|
| **Smoke** | 7 | TS-LOGIN-001, TS-REG-001, TS-SEARCH-001, TS-PD-001, TS-CART-001, TS-CHK-001, TS-INV-001 |
| **Regression** | 11 | TS-LOGIN-002, TS-REG-002, TS-REG-003, TS-SEARCH-002, TS-SEARCH-003, TS-PD-002, TS-CART-002, TS-CART-003, TS-CHK-002, TS-CHK-003, TS-INV-002 |
| **High Priority** | 13 | All Smoke cases + TS-LOGIN-002, TS-REG-003, TS-PD-002, TS-CART-002, TS-CHK-003, TS-INV-002 |
| **Medium Priority** | 5 | TS-REG-002, TS-SEARCH-002, TS-SEARCH-003, TS-CART-003, TS-CHK-002 |

### Scenario Type Mapping (ISTQB)

| Scenario Type | Test IDs |
|---|---|
| Positive | TS-LOGIN-001, TS-REG-001, TS-SEARCH-001, TS-PD-001, TS-PD-002, TS-CART-001, TS-CART-003, TS-CHK-001, TS-INV-001 |
| Negative | TS-LOGIN-002, TS-REG-003, TS-SEARCH-002, TS-CHK-002 |
| Boundary | TS-SEARCH-003, TS-CART-002 |
| Validation | TS-REG-002, TS-CHK-003, TS-INV-002 |

### Automation Readiness Notes (Prism Playwright)

- Map modules to Page Objects: `LoginPage`, `RegisterPage`, `HomePage`, `ProductDetailsPage`, `CartPage`, `CheckoutPage`, `InvoicePage`.
- Tag Smoke specs `@smoke`; Regression specs `@regression`.
- Use dynamic email generation for TS-REG-001 / TS-REG-003 to avoid shared-backend collisions.
- Encode `clickConfirm()` ×2 in Checkout page object for TS-CHK-001, TS-CHK-003, TS-INV-001.
- Scope assertions to data created in the current test run; avoid global product/invoice count checks.

## Prompt Iteration 2 – Test Suite Refinement

**Prompt:**
Review the generated manual test cases as a Senior QA Lead.

Identify:

- Duplicate scenarios
- Missing business-critical scenarios
- Weak expected results
- Missing negative test cases
- Missing validation scenarios
- Missing boundary cases

Improve the test suite while keeping the total number of test cases below 20.

Ensure every test case has a clear business purpose.

Return the improved table only.

**AI Response Summary:**

Reviewed the initial 18 test cases and identified opportunities to improve business coverage, strengthen expected results, remove overlapping scenarios, and add missing validation and negative paths. Produced a refined suite of 19 optimized test cases with clearer business objectives and improved automation readiness.

| Test ID | Module | Scenario | Preconditions | Test Steps | Expected Result | Priority | Test Type |
|---|---|---|---|---|---|---|---|
| TS-REG-001 | Registration | Enable new customer onboarding with valid account data (Positive) | User is logged out; dynamically generated unique email available | 1. Navigate to **Register**.<br>2. Enter valid values in all mandatory fields (unique email, valid password, and remaining required profile fields).<br>3. Submit the form. | Registration succeeds with a visible success message **or** redirect to login. New credentials authenticate successfully on first login attempt. No validation errors displayed. | High | Smoke |
| TS-REG-002 | Registration | Enforce registration data quality rules (Validation) | User is logged out; Register page accessible | 1. Navigate to **Register**.<br>2. Leave at least one mandatory field blank; submit.<br>3. Reset form.<br>4. Enter valid data except an invalid email format (e.g., `user@invalid`); submit. | Blank-field attempt: submission blocked; required-field errors shown on affected fields; no account created.<br>Invalid-email attempt: email-format validation error displayed; no account created. | Medium | Regression |
| TS-REG-003 | Registration | Prevent duplicate account creation (Negative) | User is logged out; email already registered in the environment | 1. Navigate to **Register**.<br>2. Enter valid data using an existing registered email.<br>3. Submit the form. | Registration is rejected. Error indicates email is already in use (or equivalent). User remains unregistered; duplicate account is not created. | High | Regression |
| TS-LOGIN-001 | Login | Authenticate returning customer for protected shopping flows (Positive) | Registered user exists; user is logged out | 1. Navigate to **Login**.<br>2. Enter valid registered email and password.<br>3. Click **Sign in**. | User lands on Home (or intended destination). Header shows authenticated state (e.g., customer name/profile menu). Protected pages (e.g., Cart, Checkout) are accessible. | High | Smoke |
| TS-LOGIN-002 | Login | Block access with invalid credentials (Negative) | User is logged out | 1. Navigate to **Login**.<br>2. Enter valid email with wrong password (or unregistered email).<br>3. Click **Sign in**. | Login fails. Error message states invalid credentials (or equivalent). User remains on Login; session is not created; Cart/Checkout remain protected. | High | Regression |
| TS-LOGIN-003 | Login | End session securely via logout (Positive) | User is logged in | 1. Confirm authenticated header/menu is visible.<br>2. Click **Logout**.<br>3. Attempt to open a protected page (e.g., Checkout) directly. | User is logged out and redirected to Home/Login. Authenticated menu is no longer shown. Protected page access is denied or redirects to Login. | Medium | Regression |
| TS-SEARCH-001 | Product Search | Support product discovery via keyword search (Positive) | User on Home/Catalog; target product name/keyword is known | 1. Enter a keyword matching at least one catalog product (e.g., partial product name).<br>2. Execute search. | Results list shows one or more matching products. Each visible result contains the keyword (or clear semantic match). Result count is greater than zero. | High | Smoke |
| TS-SEARCH-002 | Product Search | Handle searches with no catalog matches (Negative) | User on Home/Catalog | 1. Enter a non-matching keyword (e.g., `zzznomatch12345`).<br>2. Execute search. | Results area shows zero products and a clear empty-state message (e.g., “No products found”). Page remains usable; no server/application error shown. | Medium | Regression |
| TS-SEARCH-003 | Product Search | Validate search input at lower boundary (Boundary) | User on Home/Catalog | 1. Submit search with empty input.<br>2. Submit search with a single-character keyword. | Empty search: no crash; either validation message shown or catalog remains unchanged (no erroneous results).<br>Single-character search: application returns controlled results or validation message; no unhandled error. | Medium | Regression |
| TS-PD-001 | Product Details | Present accurate product information before purchase (Positive) | Catalog/search results available; selected product is in stock | 1. Open a known in-stock product from catalog or search results.<br>2. Review product details content and actions. | Details page shows product name, price, description/image, and in-stock availability. **Add to cart** (or equivalent) is enabled. Displayed price matches catalog/search listing price. | High | Smoke |
| TS-PD-002 | Product Details | Prevent ordering unavailable inventory (Negative) | At least one out-of-stock product exists in catalog | 1. Open an out-of-stock product details page.<br>2. Attempt to add product to cart (if control is visible). | Product is marked out of stock/unavailable. Add-to-cart is disabled **or** add action is blocked with clear unavailability message. Cart quantity does not increase. | High | Regression |
| TS-CART-001 | Shopping Cart | Capture purchase intent with correct line-item data (Positive) | User logged in; in-stock product identified | 1. From product details, add quantity **1** to cart.<br>2. Open **Cart**.<br>3. Verify line item and totals. | Cart contains exactly the selected product with quantity **1**, correct unit price, and line subtotal = unit price × 1. Cart badge/count increments by 1. Cart grand total equals line subtotal. | High | Smoke |
| TS-CART-002 | Shopping Cart | Recalculate financial totals on quantity change (Boundary) | User logged in; cart has one item with known unit price | 1. Open **Cart** with quantity **1**; note line subtotal and total.<br>2. Increase quantity to **3**; apply update if required.<br>3. Decrease quantity to **1**. | After qty **3**: line subtotal = unit price × 3; cart total updates immediately and matches sum of line items.<br>After qty **1**: totals return to unit price × 1 with no stale values. | High | Regression |
| TS-CART-003 | Shopping Cart | Allow customer to remove unwanted items (Positive) | User logged in; cart contains at least one item | 1. Open **Cart**.<br>2. Remove the item.<br>3. Refresh/reopen Cart if needed. | Removed item no longer appears. Cart shows empty state (0 items). Cart total is **0.00** (or equivalent empty-cart value). Cart badge resets to 0. | Medium | Regression |
| TS-CART-004 | Shopping Cart | Block checkout when no items are present (Negative) | User logged in; cart is empty | 1. Ensure cart has zero items.<br>2. Attempt to navigate to Checkout (direct URL or checkout button). | Checkout cannot start: button disabled **or** user redirected/blocked with message indicating cart is empty. No order/invoice is created. | Medium | Regression |
| TS-CHK-001 | Checkout | Complete revenue-critical COD purchase through invoice (Positive) | User logged in; cart has ≥1 item; valid billing/shipping test data prepared | 1. From Cart, proceed to **Checkout**.<br>2. Enter valid required billing/shipping fields.<br>3. Select **Cash on Delivery** (or demo COD option).<br>4. Click **Confirm** once, then click **Confirm** again (known behavior).<br>5. Open generated invoice/order receipt. | Order confirmation is displayed after second Confirm. Invoice/receipt is accessible with unique invoice/order ID. Invoice lists correct product name, quantity, unit price, and grand total matching pre-checkout cart values. | High | Smoke |
| TS-CHK-002 | Checkout | Require authentication before order placement (Negative) | User logged out; product added to cart/session if guest cart is supported | 1. Add an in-stock product to cart while logged out.<br>2. Attempt to proceed to Checkout. | User is redirected/prompted to Login before checkout proceeds. Order cannot be completed without authentication. | Medium | Regression |
| TS-CHK-003 | Checkout | Enforce mandatory checkout field validation (Validation) | User logged in; cart has ≥1 item; Checkout page open | 1. Clear or leave one or more mandatory checkout fields empty (e.g., address, city, postal code).<br>2. Select payment method.<br>3. Click **Confirm**. | Checkout is blocked. Field-level validation errors identify missing/invalid required inputs. No order confirmation and no invoice are generated. | High | Regression |
| TS-INV-001 | Invoice Generation | Verify invoice accuracy as proof of purchase (Validation) | User logged in; one order successfully completed in current session (from TS-CHK-001 or equivalent setup) | 1. Open the invoice/receipt for the just-completed order.<br>2. Compare invoice line items and totals to cart values used at checkout.<br>3. Verify customer/order metadata is present. | Invoice displays order ID/number, order date/time, purchased product(s), quantity, unit price, and grand total exactly matching checkout values. Customer identifier (name/email) is present and consistent with logged-in user. | High | Regression |

### Validation Notes

The refined test suite was manually reviewed before acceptance.

The following validations were performed:

- Confirmed complete coverage of all business-critical modules.
- Verified Smoke scenarios align with core customer journeys.
- Ensured Regression suite contains positive, negative, boundary, and validation scenarios.
- Removed duplicate coverage from the initial draft.
- Improved expected results to make automation assertions deterministic.
- Verified compatibility with the Prism Playwright Page Object Model.

## Prompt Iteration 3 – Final Suite Approval (6–7 Business-Critical Cases)

**Prompt:**

Review the existing manual test cases and produce a final approved suite containing ONLY 6–7 business-critical test cases.

Selection Criteria:

- Cover the complete end-to-end customer journey.
- Prioritize high-risk and high-business-value scenarios.
- Include both @Smoke and @Regression coverage.
- Avoid duplicate or overlapping scenarios.
- Ensure traceability to AC1 and AC2 where applicable.
- Keep only scenarios that would realistically be automated.

Return:

1. The final 6–7 approved manual test cases.
2. A short justification (1 sentence) for each retained test case.
3. A list of removed test cases with the reason for removal (Duplicate / Low Priority / Covered by another scenario / Out of Scope).

Do not rewrite scenarios unnecessarily. Reuse the existing test cases wherever possible.

**AI Response Summary:**

Reviewed all 19 test cases from Iteration 2 and reduced the suite to 7 business-critical cases covering the full customer journey (register → login → search → cart → checkout → invoice) with two high-value regression guards on authentication and checkout validation. Removed 12 cases due to overlap, low priority, or coverage by retained scenarios.

### Final Approved Manual Test Suite

**SUT:** https://practicesoftwaretesting.com  
**Traceability:** AC1 (UI) · AC2 (UI) · CUJ-1 · CUJ-2 · CUJ-3 · CUJ-4

| Test ID | Module | Scenario | Preconditions | Test Steps | Expected Result | Priority | Test Type | AC |
|---|---|---|---|---|---|---|---|---|
| TS-REG-001 | Registration | Enable new customer onboarding with valid account data (Positive) | User is logged out; dynamically generated unique email available | 1. Navigate to **Register**.<br>2. Enter valid values in all mandatory fields (unique email, valid password, and remaining required profile fields).<br>3. Submit the form. | Registration succeeds with a visible success message **or** redirect to login. New credentials authenticate successfully on first login attempt. No validation errors displayed. | High | Smoke | AC1 |
| TS-LOGIN-001 | Login | Authenticate returning customer for protected shopping flows (Positive) | Registered user exists; user is logged out | 1. Navigate to **Login**.<br>2. Enter valid registered email and password.<br>3. Click **Sign in**. | User lands on Home (or intended destination). Header shows authenticated state (e.g., customer name/profile menu). Protected pages (e.g., Cart, Checkout) are accessible. | High | Smoke | AC1 |
| TS-SEARCH-001 | Product Search | Support product discovery via keyword search (Positive) | User on Home/Catalog; target product name/keyword is known | 1. Enter a keyword matching at least one catalog product (e.g., partial product name).<br>2. Execute search. | Results list shows one or more matching products. Each visible result contains the keyword (or clear semantic match). Result count is greater than zero. | High | Smoke | AC2 |
| TS-CART-001 | Shopping Cart | Capture purchase intent with correct line-item data (Positive) | User logged in; in-stock product identified | 1. From product details, add quantity **1** to cart.<br>2. Open **Cart**.<br>3. Verify line item and totals. | Cart contains exactly the selected product with quantity **1**, correct unit price, and line subtotal = unit price × 1. Cart badge/count increments by 1. Cart grand total equals line subtotal. | High | Smoke | AC2 |
| TS-CHK-001 | Checkout | Complete revenue-critical COD purchase through invoice (Positive) | User logged in; cart has ≥1 item; valid billing/shipping test data prepared | 1. From Cart, proceed to **Checkout**.<br>2. Enter valid required billing/shipping fields.<br>3. Select **Cash on Delivery** (or demo COD option).<br>4. Click **Confirm** once, then click **Confirm** again (known behavior).<br>5. Open generated invoice/order receipt. | Order confirmation is displayed after second Confirm. Invoice/receipt is accessible with unique invoice/order ID. Invoice lists correct product name, quantity, unit price, and grand total matching pre-checkout cart values. | High | Smoke | AC2 |
| TS-LOGIN-002 | Login | Block access with invalid credentials (Negative) | User is logged out | 1. Navigate to **Login**.<br>2. Enter valid email with wrong password (or unregistered email).<br>3. Click **Sign in**. | Login fails. Error message states invalid credentials (or equivalent). User remains on Login; session is not created; Cart/Checkout remain protected. | High | Regression | AC1 |
| TS-CHK-003 | Checkout | Enforce mandatory checkout field validation (Validation) | User logged in; cart has ≥1 item; Checkout page open | 1. Clear or leave one or more mandatory checkout fields empty (e.g., address, city, postal code).<br>2. Select payment method.<br>3. Click **Confirm**. | Checkout is blocked. Field-level validation errors identify missing/invalid required inputs. No order confirmation and no invoice are generated. | High | Regression | AC2 |

### Retained Test Case Justifications

| Test ID | Justification |
|---|---|
| TS-REG-001 | Establishes the AC1 identity path and supplies a run-scoped account for downstream login and checkout automation. |
| TS-LOGIN-001 | Unlocks all protected shopping flows and is the gateway for the AC2 purchase journey. |
| TS-SEARCH-001 | Validates the primary product-discovery entry point required before any cart or checkout action. |
| TS-CART-001 | Confirms cart state, pricing, and totals—the financial foundation verified at checkout and on the invoice. |
| TS-CHK-001 | Single highest-risk, revenue-critical E2E path covering COD checkout, double-confirm behavior, and invoice generation. |
| TS-LOGIN-002 | Guards AC1 with a high-risk negative auth scenario that blocks unauthorized access to Cart and Checkout. |
| TS-CHK-003 | Validates mandatory checkout fields on the highest-risk module, preventing invalid orders and orphan invoices. |

### Removed Test Cases

| Test ID | Module | Reason for Removal |
|---|---|---|
| TS-REG-002 | Registration | Low Priority — Field-level validation is important but not business-critical for the minimal E2E suite; AC1 is covered by TS-REG-001. |
| TS-REG-003 | Registration | Low Priority — Duplicate-email handling is a regression concern, not required for the core purchase journey. |
| TS-LOGIN-003 | Login | Low Priority — Logout/session teardown is secondary to login and checkout auth gates already covered by TS-LOGIN-001/002. |
| TS-SEARCH-002 | Product Search | Low Priority — Empty-results handling does not block the happy-path purchase journey. |
| TS-SEARCH-003 | Product Search | Low Priority — Boundary search input is non-critical compared to successful product discovery (TS-SEARCH-001). |
| TS-PD-001 | Product Details | Covered by another scenario — Product details interaction and add-to-cart are exercised in TS-CART-001 step 1. |
| TS-PD-002 | Product Details | Low Priority — Out-of-stock blocking is a catalog edge case, not part of the core AC2 purchase path. |
| TS-CART-002 | Shopping Cart | Low Priority — Quantity recalculation is a cart regression concern; TS-CHK-001 validates totals at checkout with default quantity. |
| TS-CART-003 | Shopping Cart | Low Priority — Cart removal is cart-management regression, not required for the revenue E2E path. |
| TS-CART-004 | Shopping Cart | Covered by another scenario — Empty-cart checkout blocking is implicitly validated when TS-CHK-001 requires cart items as a precondition. |
| TS-CHK-002 | Checkout | Covered by another scenario — Auth-before-checkout is already asserted in TS-LOGIN-002 (Cart/Checkout remain protected). |
| TS-INV-001 | Invoice Generation | Covered by another scenario — TS-CHK-001 step 5 opens the invoice and asserts product, quantity, price, and total accuracy. |

### Coverage Summary (Final Approved Suite)

| Category | Count | Test IDs |
|---|---|---|
| **Smoke** | 5 | TS-REG-001, TS-LOGIN-001, TS-SEARCH-001, TS-CART-001, TS-CHK-001 |
| **Regression** | 2 | TS-LOGIN-002, TS-CHK-003 |
| **High Priority** | 7 | All approved test cases |
| **AC1 (UI)** | 3 | TS-REG-001, TS-LOGIN-001, TS-LOGIN-002 |
| **AC2 (UI)** | 4 | TS-SEARCH-001, TS-CART-001, TS-CHK-001, TS-CHK-003 |

### Scenario Type Mapping (ISTQB)

| Scenario Type | Test IDs |
|---|---|
| Positive | TS-REG-001, TS-LOGIN-001, TS-SEARCH-001, TS-CART-001, TS-CHK-001 |
| Negative | TS-LOGIN-002 |
| Validation | TS-CHK-003 |

### Automation Readiness Notes (Prism Playwright)

- Map modules to Page Objects: `RegisterPage`, `LoginPage`, `HomePage`, `ProductDetailsPage`, `CartPage`, `CheckoutPage`, `InvoicePage`.
- Tag Smoke specs `@smoke`; Regression specs `@regression`.
- Use dynamic email generation for TS-REG-001 to avoid shared-backend collisions.
- Encode `clickConfirm()` ×2 in Checkout page object for TS-CHK-001.
- Scope assertions to data created in the current test run; avoid global product/invoice count checks.
- TS-CHK-001 step 5 covers invoice assertions formerly split across TS-INV-001.

**Validation Notes:**

- Confirmed the approved suite covers the complete E2E customer journey without duplicate scenarios.
- Verified Smoke (5) and Regression (2) balance meets assessment scope.
- Confirmed traceability to AC1 and AC2 for all retained cases.
- Updated `FunctionalTestCase.csv` to export only the 7 approved test cases.

## Prompt Iteration 4 – CSV Export for Test Execution

**Prompt:**

Convert the final reviewed manual functional test suite into a production-ready CSV file.

Requirements:

- Preserve every approved test case exactly as reviewed.
- Do not modify any Test ID, Scenario, Steps or Expected Result.
- Output the following columns in the same order:

Test ID,
Module,
Scenario,
Preconditions,
Test Steps,
Expected Result,
Priority,
Test Type

CSV Requirements:

- Escape commas and quotation marks correctly.
- Preserve multi-line test steps using valid CSV formatting.
- Ensure the file opens correctly in Microsoft Excel.
- Do not include Markdown formatting.
- Return only CSV content.

Save the output as: FunctionalTestCase.csv

**AI Response Summary:**

Generated a production-ready CSV containing the finalized manual functional test suite. The output preserved all approved test cases, maintained column consistency, and formatted multiline steps correctly for Microsoft Excel compatibility.

**Validation Notes:**

- Verified all 7 refined test cases were exported.
- Confirmed all mandatory columns were present.
- Verified no duplicate Test IDs.
- Opened the CSV in Microsoft Excel.
- Confirmed multiline test steps rendered correctly.
- Verified CSV matched the Iteration 2 Markdown version exactly.



## Outcome

The final approved manual test suite contains **7** business-critical functional test cases covering the application's primary customer journeys end-to-end.

Following AI-assisted refinement, Senior QA Lead review, and manual validation, the suite was exported as a production-ready CSV (`FunctionalTestCase.csv`) to support execution and downstream automation activities.

The finalized suite will be used as the baseline for:

- API Scenario Design
- Playwright UI Automation
- Automation Opportunity Identification
- Exploratory Testing
- Requirements Traceability

This concludes the AI-assisted Manual Test Design activity.

