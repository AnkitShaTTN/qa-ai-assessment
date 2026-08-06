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
| UI static data | `PrismStructure/UI/resources/data/toolshopTestData.json` | Search keywords, billing address, payment method, assertion messages |
| UI login assertions | `PrismStructure/UI/resources/data/toolshopLoginData.json` | Returning-customer display name and protected routes (no credentials) |
| API payloads | `PrismStructure/API/pageobjects/toolshopApiData.js` | Endpoints, headers, login/invoice/cart payload builders |
| Runtime helpers | `PrismStructure/UI/utilities/toolshopTestHelper.js` | Faker-based registration users, API product lookup |
| Environment | `PrismStructure/.env` / `.env.example` | Base URLs and sensitive credentials |
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

Do not redesign the framework. Map recommendations to existing Prism patterns (`UI/resources/data/*.json`, `toolshopTestHelper.js`, `toolshopApiData.js`, `.env`).

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
| **API Purchase** | Cart ID, product ID, billing from profile | Invoice totals, line items | Entire flow chained at runtime via `toolshopContext` |

The AI noted that the shared demo environment requires run-scoped unique registration emails to avoid duplicate-account failures, while returning-customer login can reuse the seeded `customer@practicesoftwaretesting.com` account from environment configuration.

### Validation / Final Decision

**Accepted** with refinements:

- Inventory aligned to manual test IDs in `test-design.md` (TS-LOGIN-001 through TS-INV-002) and automated specs (`05`–`11` UI, `03`–`05` API).
- Registration and duplicate-email scenarios flagged as **dynamic-only**; no hardcoded registration emails in JSON.
- Product selection marked **runtime via API** (`getInStockProduct`) rather than hardcoded product IDs, because stock levels change on the live demo site.
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

Follow Prism framework conventions. Prefer extending `toolshopTestData.json`, `toolshopLoginData.json`, `toolshopApiData.js`, and `toolshopTestHelper.js` over creating new patterns.

Return a classification table and a sensitive-data policy.

### AI Response Summary

**Classification:**

| Data Element | Type | Storage | Rationale |
|---|---|---|---|
| `TOOLSHOP_EMAIL` / `TOOLSHOP_PASSWORD` | Environment | `.env` | Seeded credentials; sensitive; shared by UI login and API auth |
| `URL` / `TOOLSHOP_BASE_URL` | Environment | `.env` | Environment-specific; API vs UI base URLs |
| Search keyword (`Combination`) | Static | `toolshopTestData.json` / `toolshopApiData.js` | Stable catalog term; same value for UI and API search tests |
| Billing address, payment method | Static | `toolshopTestData.json` | Non-sensitive; repeatable checkout input |
| Login error message, invalid password | Static | `toolshopTestData.json` / `toolshopApiData.js` | Fixed assertion text and known-bad password |
| Returning customer display name, protected routes | Static | `toolshopLoginData.json` | Assertion metadata only; ties to seeded user profile |
| Registration user (name, email, password, address) | Dynamic | `buildRegistrationUser()` in `toolshopTestHelper.js` | Unique per run via `@faker-js/faker` |
| In-stock product (id, name, price) | Dynamic | `getInStockProduct()` API call | Avoids stale hardcoded product references |
| Bearer token, cart ID, invoice ID | Dynamic | `toolshopContext` (API runtime) | Created during test execution; not persisted |
| API payment/invoice payload fields | Static defaults with profile fallback | `toolshopApiData.js` | Reuses `/users/me` address when available |

**Sensitive-data policy proposed:**

- Never store passwords, tokens, or API keys in JSON or source code.
- Commit `.env.example` with placeholder/demo values only; add `.env` to `.gitignore`.
- Load secrets via `dotenv` in specs and helpers.
- Use `_comment` fields in JSON to document that credentials come from env, not the file.

### Validation / Final Decision

**Accepted** with the following implementation decisions:

| Decision | Action |
|---|---|
| Credentials externalized | `05_returningCustomerLoginTest.spec.js` and `03_toolshopAuthApi.spec.js` read `process.env.TOOLSHOP_EMAIL` / `TOOLSHOP_PASSWORD` |
| `.env.example` committed | Documents `URL`, `TOOLSHOP_BASE_URL`, `TOOLSHOP_EMAIL`, `TOOLSHOP_PASSWORD` for local/CI setup |
| JSON holds assertions only | `toolshopLoginData.json` stores `expectedDisplayName` and `protectedRoutes`; no password field |
| Faker centralized | Single `buildRegistrationUser()` factory with `prism.auto.{suffix}@mailinator.com` pattern for traceable unique emails |
| API/UI search parity | Both layers use keyword `Combination` to keep manual, API, and UI search tests consistent |
| Invalid login hybrid | Dynamic email from `buildRegistrationUser()` + static `invalidPassword` from JSON—ensures valid format with wrong secret |

**Rejected:** Embedding demo credentials in `toolshopTestData.json` (security risk and violates Prism env pattern).

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
├── .env.example                          # Committed template for env vars
├── .env                                  # Local secrets (not committed)
├── API/pageobjects/toolshopApiData.js    # API endpoints, headers, payload builders
├── API/utilities/toolshopContext.js      # Runtime API state (token, cartId, productId)
├── UI/resources/data/
│   ├── toolshopTestData.json             # Shared UI static inputs & assertions
│   ├── toolshopLoginData.json            # Returning-customer assertion metadata
│   └── testCasesMeta.json                # Keyword → manual test ID traceability
└── UI/utilities/toolshopTestHelper.js    # Faker registration + API product resolver
```

**Runtime data flows:**

*UI Registration (TS-REG-001):*
`buildRegistrationUser()` → `registerPage.register(user)` → login with same runtime credentials → assert display name on `/account`.

*UI Cart / Checkout (TS-CART-001, TS-CHK-001):*
`registerAndLogin()` creates fresh user → `getInStockProduct()` fetches live in-stock item → cart/checkout use `toolshopTestData.json` for billing and payment → `confirmOrderTwice()` uses static success message.

*UI Returning Login (TS-LOGIN-001):*
`process.env` credentials → `toolshopLoginData.json` for display name and protected-route assertions.

*API Purchase Flow (serial suite):*
`loginPayload()` from env → `toolshopContext` stores token, profile, productId, cartId → `invoicePayload(cartId, userProfile)` merges profile address with static payment defaults → assertions on runtime invoice response.

**Maintainability guidelines:**

- Add new **stable** inputs (messages, addresses, keywords) to `toolshopTestData.json`; import in specs.
- Add new **credentials or URLs** to `.env.example` and document in README—not in JSON.
- Add new **unique-per-run** data via `toolshopTestHelper.js` factories, not inline in specs.
- Add new **API payload shapes** to `toolshopApiData.js` builder functions.
- Register new Toolshop test keywords in `testCasesMeta.json` for annotation traceability.
- Prefer API lookup over hardcoded product IDs when catalog stock may change.

### Validation / Final Decision

**Accepted as final implementation.** All automated Toolshop specs consume data through the layers above; no test hardcodes credentials or product IDs inline.

---

## Best Practices Implemented

| Practice | Implementation |
|---|---|
| **Separation of concerns** | Static JSON for repeatable inputs; env for secrets; helpers for generation; context for API runtime state |
| **No secrets in repo** | Credentials in `.env`; `.env.example` for onboarding; JSON files contain `_comment` guidance only |
| **Shared-environment safety** | Faker-generated unique emails/passwords per registration run |
| **Data stability** | Catalog search keyword and billing address centralized—single point of update |
| **Live catalog resilience** | `getInStockProduct()` queries `/products` API; prefers `Bolt Cutters`, falls back to any in-stock item |
| **API/UI consistency** | Same env credentials and search keyword across layers |
| **Framework compatibility** | Extends existing Prism `UI/resources/data/` pattern and `dotenv` usage from sample tests |
| **Traceability** | `testCasesMeta.json` keywords (`toolshop_login`, `toolshop_registration`, etc.) link automation to manual test IDs |

---

## Key Learnings

Test data for the Toolshop assessment was defined through three AI-assisted iterations: inventory of required data, classification with sensitive-data rules, and final structuring within the Prism framework.

The accepted approach keeps **credentials and URLs in environment variables**, **stable business inputs and assertion text in JSON**, and **unique or catalog-dependent values generated at runtime** via `toolshopTestHelper.js` and API context. This balances repeatability, security, and reliability on the shared Practice Software Testing demo environment without modifying the existing framework architecture.
