# AI Prompts — Test Data

## Objective

The objective of this activity was to use AI to identify, classify, and implement test data for the Practice Software Testing (Toolshop) assessment across manual, API, and UI automation layers.

The focus was on defining what data each test requires, separating static from runtime-generated values, securing credentials via environment variables, and aligning with the existing Prism Playwright framework—without redesigning it.

AI outputs were reviewed and refined before being accepted into the final implementation.

---

## Project Context

**Application:** Practice Software Testing (Toolshop)  
**Framework:** Prism Playwright Framework  
**Assessment Scope:** Manual test cases (complete), API automation (complete), UI automation (complete)  
**Primary AI Tool:** Cursor Enterprise  

**Implemented data locations:**

| Layer | Location | Purpose |
|---|---|---|
| UI login data | `PrismStructure/UI/resources/data/loginData.json` | Valid/invalid credentials and expected error messages |
| UI registration data | `PrismStructure/UI/resources/data/registrationData.json` | Static profile fields; email/password generated at runtime |
| UI search/checkout | `PrismStructure/UI/resources/data/productSearchData.json`, `checkoutData.json` | Search keywords, billing fields, payment method |
| API endpoints | `PrismStructure/API/pageobjects/toolshopApiPage.js` | Endpoints and `authHeaders` / `jsonHeaders` builders |
| API static payloads | `PrismStructure/API/resources/data/toolshopRegistrationData.json`, `toolshopInvoiceData.json` | Registration and invoice payload templates |
| API runtime state | `PrismStructure/API/testdata/toolshopRegisteredUser.json`, `toolshopAccessToken.json`, `toolshopSession.json` | Chained state across serial API specs |
| Environment | `PrismStructure/.env` / `.env.example` | `URL` (API) and `BASE_URL` (UI) |
| Traceability | `PrismStructure/UI/resources/data/testCasesMeta.json` | Keyword-to-test-ID mapping for annotations |

---

## Prompt Iteration 1 – Test Data Identification

### Prompt

You are a Senior QA Engineer.

Manual test cases, API tests, and UI automation for the Toolshop application are complete using the existing Prism Playwright framework.

Analyze the approved test suite (Login, Registration, Product Search, Cart, Checkout, Invoice, API Auth, API Product, API Purchase Flow) and identify all test data required to execute manual and automated tests reliably.

For each module, list:
- Required input data (credentials, search terms, billing fields, product references)
- Expected output/assertion data (error messages, success messages, display names)
- Data that must be unique per run vs data that can be reused
- Dependencies between tests (e.g., login before cart, API token before purchase flow)

Do not redesign the framework. Map recommendations to existing Prism patterns (`UI/resources/data/*.json`, `API/pageobjects/toolshopApiPage.js`, `API/testdata/*.json`, `.env`).

Return a structured test-data inventory grouped by module.

### AI Response Summary

The AI produced a module-level inventory covering all in-scope journeys:

| Module | Input Data | Assertion Data | Uniqueness |
|---|---|---|---|
| **Login** | Email, password | Post-login URL, display name, protected route access | Credentials static (seeded demo user); session is runtime |
| **Registration** | First/last name, email, password, address, DOB, phone | Redirect to login, account page display name | Email and password must be unique per run |
| **Product Search** | Stable catalog keyword | Result count > 0, matching product visible | Keyword static; results depend on live catalog |
| **Cart / Product** | In-stock product ID/name/price | Line item quantity, unit price, subtotal, total | Product resolved at runtime via API |
| **Checkout** | Billing address, payment method | Payment success message, invoice content | Billing static; order/invoice IDs runtime |
| **Invalid Login** | Valid-format email + wrong password | `Invalid email or password` message | Email from Faker; password from JSON |
| **API Auth** | Login payload from env | Token type, expiry, profile email match | Token and profile runtime |
| **API Purchase** | Cart ID, product ID, billing from profile | Invoice totals, line items | Entire flow chained at runtime via `API/testdata/*.json` files |

The AI noted that the shared demo environment requires run-scoped unique registration emails to avoid duplicate-account failures, while returning-customer login can reuse the seeded `customer@practicesoftwaretesting.com` account from environment configuration.

### Validation / Final Decision

**Accepted** with refinements:

- Inventory aligned to test IDs in `FunctionalTestCase.csv` and automated specs (`TC_*` in `01`–`06` UI, `01`–`05` API).
- Registration and duplicate-email scenarios flagged as **dynamic-only**; no hardcoded registration emails in JSON.
- Product selection marked **runtime via API** (`03_products.spec.js` stores product ID in `toolshopSession.json`) rather than hardcoded product IDs.
- Checkout billing and payment method approved as **static JSON**—stable, non-sensitive, and shared across UI checkout tests.
- Returning-customer credentials confirmed as **environment variables**, not committed to repository JSON files.

---

## Prompt Iteration 2 – Static vs Dynamic Classification and Sensitive Data

### Prompt

You are a Senior QA Engineer.

Based on the Toolshop test-data inventory, classify every data element as **Static**, **Dynamic (runtime-generated)**, or **Environment Variable**.

Also define:
1. Sensitive data handling rules (what must never be committed)
2. Recommended `.env` variables with example values
3. Which values belong in reusable JSON files vs helper functions
4. How API and UI layers should share data without duplication

Follow Prism framework conventions. Prefer extending `loginData.json`, `registrationData.json`, `productSearchData.json`, `checkoutData.json`, `toolshopApiPage.js`, and `API/testdata/*.json` over creating new patterns.

Return a classification table and a sensitive-data policy.

### AI Response Summary

**Classification:**

| Data Element | Type | Storage | Rationale |
|---|---|---|---|
| `URL` / `BASE_URL` | Environment | `.env` | API vs UI base URLs |
| Valid login credentials | Static (demo) | `loginData.json` | Seeded demo user for UI login tests |
| Invalid login credentials | Static | `loginData.json` | Known-bad password and expected error message |
| Registration profile fields | Static | `registrationData.json` | Repeatable address/phone/DOB fields |
| Registration email/password | Dynamic | Generated in `registrationPage.js` spec via Faker | Unique per run on shared backend |
| Search keyword | Static | `productSearchData.json` | Stable catalog term for UI search |
| Billing address, payment method | Static | `checkoutData.json` | Non-sensitive checkout input |
| API registration payload | Static template + dynamic email | `toolshopRegistrationData.json` + Faker in spec | Unique user per API run |
| Bearer token, cart ID, product ID | Dynamic | `toolshopAccessToken.json`, `toolshopSession.json` | Created during serial API execution |
| API invoice payload | Static | `toolshopInvoiceData.json` | COD payment fields |

**Sensitive-data policy proposed:**

- Never store passwords, tokens, or API keys in JSON or source code.
- Commit `.env.example` with placeholder/demo values only; add `.env` to `.gitignore`.
- Load secrets via `dotenv` in specs and helpers.
- Use `_comment` fields in JSON to document that credentials come from env, not the file.

### Validation / Final Decision

**Accepted** with the following implementation decisions:

| Decision | Action |
|---|---|
| URLs externalized | `.env` holds `URL` and `BASE_URL`; `.env.example` documents `URL` |
| UI credentials in JSON | `loginData.json` holds demo `validUser` and `invalidPassword` for Toolshop login specs |
| Registration dynamic | `02_registrationPageTest.spec.js` generates unique email/password via `@faker-js/faker` |
| API state via JSON files | Serial API specs write/read `toolshopRegisteredUser.json`, `toolshopAccessToken.json`, `toolshopSession.json` |
| Traceability centralized | `testCasesMeta.json` maps keywords (`login`, `registration`, etc.) to `TC_*` IDs |

**Rejected:** Hardcoded product IDs in specs (catalog stock changes on shared demo backend).

---

## Prompt Iteration 3 – Final Implementation and Maintainability

### Prompt

You are a Senior QA Automation Engineer.

Finalize the Toolshop test-data strategy for the completed Prism implementation.

Provide:
1. Final file structure and responsibility of each data artifact
2. Runtime data flow for UI cart/checkout and API purchase-flow tests
3. Maintainability guidelines for future test additions
4. Best practices checklist confirming what was implemented

Do not redesign the framework. Document only what exists and what a new contributor should follow.

Keep the output concise and implementation-ready.

### AI Response Summary

**Final file structure:**

```
PrismStructure/
├── .env.example                          # Committed template (URL)
├── .env                                  # Local config: URL, BASE_URL (not committed)
├── API/pageobjects/toolshopApiPage.js    # Endpoints and header builders
├── API/resources/data/
│   ├── toolshopRegistrationData.json     # Registration payload template
│   └── toolshopInvoiceData.json          # Invoice/COD payload fields
├── API/testdata/
│   ├── toolshopRegisteredUser.json       # Runtime — TC_API_001 output
│   ├── toolshopAccessToken.json          # Runtime — TC_API_002 output
│   └── toolshopSession.json              # Runtime — product/cart IDs
├── UI/resources/data/
│   ├── loginData.json                    # Login credentials and error messages
│   ├── registrationData.json             # Static registration profile fields
│   ├── productSearchData.json            # Search keyword and assertions
│   ├── checkoutData.json                 # Billing, payment, success messages
│   └── testCasesMeta.json                # Keyword → TC_* traceability
```

**Runtime data flows:**

*UI Registration (TC_REG_001):*
Faker generates email/password in spec → `registrationData.json` supplies profile fields → register → login with same credentials.

*UI Cart / Checkout (TC_CART_001, TC_CHK_001):*
`loginData.json` valid user → add product from search → `checkoutData.json` for billing/payment → double-confirm checkout.

*UI Returning Login (TC_LOGIN_001):*
`loginData.json` `validUser` → assert authenticated state on home/account.

*API Purchase Flow (serial suite):*
`TC_API_001` writes `toolshopRegisteredUser.json` → `TC_API_002` writes `toolshopAccessToken.json` → `TC_API_003` stores product in `toolshopSession.json` → `TC_API_004` adds to cart → `TC_API_005` creates invoice with `toolshopInvoiceData.json`.

**Maintainability guidelines:**

- Add new **stable** inputs to the appropriate JSON file under `UI/resources/data/` or `API/resources/data/`.
- Add new **URLs** to `.env.example` and document in README.
- Add new **unique-per-run** data via Faker in the spec or page object, not hardcoded in JSON.
- Add new **API endpoints** to `toolshopApiPage.js`.
- Register new Toolshop test keywords in `testCasesMeta.json` for annotation traceability.
- Chain API tests via `API/testdata/*.json` files; run API suite with `--workers=1`.

### Validation / Final Decision

**Accepted as final implementation.** All automated Toolshop specs consume data through the layers above; no test hardcodes credentials or product IDs inline.

---

## Best Practices Implemented

| Practice | Implementation |
|---|---|
| **Separation of concerns** | Static JSON for repeatable inputs; `.env` for URLs; Faker for unique registration; JSON files for API runtime state |
| **Demo credentials** | Seeded login user in `loginData.json` for UI; API registration creates fresh user each run |
| **Shared-environment safety** | Faker-generated unique emails/passwords per registration run |
| **Data stability** | Search keyword and checkout billing centralized in dedicated JSON files |
| **API chain resilience** | Serial execution with `toolshopRegisteredUser.json` → `toolshopAccessToken.json` → `toolshopSession.json` |
| **Framework compatibility** | Extends existing Prism `UI/resources/data/` pattern and `dotenv` usage |
| **Traceability** | `testCasesMeta.json` keywords link automation to `TC_*` test IDs |

---

## Key Learnings

Test data for the Toolshop assessment was defined through three AI-assisted iterations: inventory of required data, classification with sensitive-data rules, and final structuring within the Prism framework.

The accepted approach keeps **base URLs in environment variables**, **stable business inputs and credentials in JSON**, and **unique or chained values generated at runtime** via Faker (UI registration) and serial API JSON files (`API/testdata/*.json`). This balances repeatability, security, and reliability on the shared Practice Software Testing demo environment without modifying the existing framework architecture.
