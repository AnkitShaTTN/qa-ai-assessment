# AI Prompts — Requirements and Planning

## Prompt Iteration 1 — Initial Requirement Analysis

**Prompt:**
You are a Senior QA Automation Engineer.

I am working on an AI-assisted QA assessment for the Practice Software Testing (Toolshop) application using the Prism Playwright framework.

Help me perform a risk-based requirement analysis for the Practice Software Testing application.

Identify:

1. Business modules
2. Functional modules
3. Critical user journeys
4. High-risk functionalities
5. Assumptions
6. Testing scope
7. Out-of-scope items
8. Potential automation opportunities

Return the response in Markdown.

**AI Response Summary:**
AI generated a structured requirement analysis covering 6 business
modules, UI + API functional module breakdowns, 5 critical user journeys
(CUJ-1 through CUJ-5), 8 high-risk functionality areas, 10 explicit
assumptions, in-scope/out-of-scope tables, and automation opportunities
ranked High/Medium/Low priority, plus a traceability summary table.

**Validation Notes:**
- Confirmed the checkout double-confirm risk was picked up automatically
  from the project's Cursor Rules file, without being restated in this
  prompt — verified this matches the known app behavior documented in the
  assessment brief.
- AI's output referenced a "Sprint 5" environment assumption not present
  in my prompt or project rules — flagged as unverified rather than
  accepted at face value; noted in Assumption #1 below as needing
  independent confirmation before relying on it.
- Original output used generic CUJ labels (CUJ-1 through CUJ-5) without
  mapping them back to the assessment's AC1/AC2 terminology — added an
  explicit AC1/AC2 → CUJ mapping block below so traceability to the
  assessment brief is direct, not inferred.
- Reviewed high-risk table against the shared-backend nature of the
  public demo app (confirmed via manual site check) — the AI's inclusion
  of "no global count assertions" and "run-scoped data" as risk
  mitigations was accepted as correct and carried into automation design.
- No modules were found to be fabricated or irrelevant to this Toolshop
  build; all business/functional modules matched what's visible on the
  live site and Swagger docs.

---

## Reviewed & Accepted Requirement Analysis

**SUT:** Practice Software Testing (Toolshop) — E-commerce web app
**UI:** https://practicesoftwaretesting.com
**API/Swagger:** https://api.practicesoftwaretesting.com/api/documentation
**Framework:** Prism Playwright (UI + API)

### 1. Business Modules

| Business Module | Description | Business Value |
|---|---|---|
| **User Identity & Access** | Registration, login, session handling | Enables personalized shopping and order history |
| **Product Catalog** | Browse, search, filter, and view product details | Primary discovery path for purchase |
| **Shopping Cart** | Add/update/remove items before purchase | Holds purchase intent |
| **Order & Checkout** | Billing/shipping, payment, order confirmation | Revenue-critical conversion path |
| **Invoicing** | Invoice generation after successful checkout | Proof of purchase / post-order artifact |
| **API Services** | REST backend for users, products, carts, payments, invoices | Powers UI and supports direct API validation |

### 2. Functional Modules

**UI Functional Modules**

| Module | Key Capabilities |
|---|---|
| **Registration** | Create account, field validations, duplicate email handling |
| **Login / Logout** | Valid/invalid credentials, session persistence, logout |
| **Home / Catalog** | Product listing, pagination, category/brand filters |
| **Product Search** | Keyword search, result relevance, empty results |
| **Product Details** | Price, stock, description, images, add-to-cart |
| **Shopping Cart** | Add item, quantity update, remove item, cart totals |
| **Checkout** | Address/payment steps, confirm order (known double-confirm quirk) |
| **Invoice** | Invoice display/download after successful order |

**API Functional Modules**

| Resource | Typical Operations |
|---|---|
| `/users` | Register, login/token, profile |
| `/products` | List, search, filter, get by ID |
| `/categories`, `/brands` | Catalog metadata |
| `/carts` | Create cart, add/update/remove items |
| `/payment` | Payment processing |
| `/invoices` | Create/retrieve invoices |

### 3. Critical User Journeys

**Explicit AC mapping (assessment scope):**
- **AC1 (UI)** — register → login → verify profile → **CUJ-4**
- **AC2 (UI)** — browse → cart → COD checkout → invoice → **CUJ-1, CUJ-2, CUJ-3**
- **AC1 (API)** — register → login → bearer token → create cart → **CUJ-5**
- **AC2 (API)** — get products → add to cart → verify cart → generate invoice → **extends CUJ-5**

**CUJ-1: Happy Path Purchase (Smoke Core)**
`Register/Login → Search Product → Open Details → Add to Cart → Checkout → Confirm (×2) → Invoice`

**CUJ-2: Returning Customer Purchase**
`Login → Browse/Filter → Add to Cart → Update Quantity → Checkout → Invoice`

**CUJ-3: Search-Driven Purchase**
`Home → Search Keyword → Select Product → Add to Cart → Checkout`

**CUJ-4: Auth Failure Path**
`Login with invalid credentials → Error shown → Retry with valid credentials`

**CUJ-5: API Auth + Catalog**
`Obtain token → GET products → Validate response contract → Optional cart/invoice API flow`

**Smoke priority:** Login → Product Search → Add to Cart → Checkout → Invoice Generation

### 4. High-Risk Functionalities

| Area | Why High Risk | Likely Failure Modes |
|---|---|---|
| **Checkout confirmation** | Known quirk: Confirm must be clicked twice | Premature pass/fail if automation clicks once |
| **Cart state management** | Shared demo backend + session/cart coupling | Flaky totals, stale cart, cross-test pollution |
| **Invoice generation** | Depends on successful checkout + payment | Missing invoice, race after confirm |
| **Authentication / tokens** | Gate for protected UI + API flows | 401/403, expired token, invalid bearer usage |
| **Product availability / stock** | Shared catalog data changes over time | Add-to-cart fails; assertions on global counts break |
| **Price & quantity calculations** | Financial correctness | Wrong subtotal/total after quantity updates |
| **Search/filter accuracy** | Core discovery path | Empty/wrong results; filter combinations fail |
| **Registration uniqueness** | Email uniqueness on shared env | Duplicate email collisions across parallel runs |

### 5. Assumptions

1. Target environment is `practicesoftwaretesting.com` + matching API. *(Note: "Sprint 5" claim from initial AI output was not independently confirmed — verify against live site version indicator or Swagger before relying on this for any sprint-specific behavior.)*
2. Existing **Prism Playwright** structure (POM, helpers, config, tags) will be reused; core framework will not be redesigned.
3. Tests are tagged `@smoke` or `@regression` and kept to **depth over volume** (prefer ~5–8 cases per type).
4. Backend is a **shared public demo**; tests must use **run-scoped data** and avoid asserting global counts.
5. Checkout **Confirm button requires two clicks** — expected app behavior, not a defect to "fix" in automation.
6. API validation is based on **Swagger/OpenAPI** contracts and observed UI network traffic.
7. Credentials/config stay outside source (env/config), not hardcoded in specs.
8. Scope is **functional** (UI + API); non-functional areas are out of primary assessment scope unless explicitly added.
9. AI outputs are **advisory** and require manual validation against the live app/Swagger before implementation.
10. Default seeded products/users may change; automation should create or select data dynamically where practical.

### 6. Testing Scope

**In Scope — Functional**

| Layer | Coverage |
|---|---|
| **Smoke (UI)** | Login, product search, add to cart, checkout, invoice generation |
| **Regression (UI)** | Invalid login, registration validation, product filtering, quantity updates, cart management |
| **API** | Auth/token, product endpoints, cart-related calls, invoice-related validations |
| **Test design** | Positive, negative, boundary, and validation scenarios (manual + automated) |
| **Framework usage** | POM pages, API helpers, reusable utilities, shared config, tagged suites |

**Quality attributes explicitly covered:** functional correctness of critical commerce flows, UI–API consistency for key operations, basic input validation and error messaging, test independence and data hygiene on shared backend.

### 7. Out-of-Scope Items

| Item | Reason |
|---|---|
| Performance / load / stress testing | Not part of assessment objectives |
| Security penetration testing (OWASP full suite) | Beyond functional assessment scope |
| Accessibility (WCAG) full audit | Not listed in SUT testing areas |
| Cross-browser matrix beyond Prism defaults | Keep scope minimal unless required |
| Mobile-native / responsive exhaustive suite | Web functional focus only |
| Admin / PIM / reporting deep coverage | Lower business priority for this assessment |
| Contact form, favorites, messaging (unless needed for journey) | Outside primary listed testing areas |
| Payment gateway real-money integrations | Demo payment only |
| Visual regression / pixel comparison | Not required by project info |
| Changing Prism core architecture | Preserve existing framework conventions |
| Infrastructure / CI redesign | Use existing Jenkins/Prism setup as-is |

### 8. Potential Automation Opportunities

**High Value (Automate First)**

| Opportunity | Type | Rationale |
|---|---|---|
| Login (valid + invalid) | UI smoke/regression | Fast gate for all authenticated flows |
| Product search + open details | UI smoke | Stable, high-frequency journey entry |
| Add to cart + quantity update | UI smoke/regression | Core commerce state change |
| Checkout → double Confirm → invoice | UI smoke | Highest business risk; encodes known quirk |
| Auth token acquisition | API smoke | Prerequisite for protected API tests |
| GET products (contract + key fields) | API smoke/regression | Stable, high signal, low flakiness |
| Cart create/update via API | API regression | Faster isolation than full UI for cart logic |
| Invoice retrieval after order | API/UI hybrid | Validates end-state of purchase |

**Medium Value:** Registration with unique dynamic email; product filter combinations; cart remove/empty cart; negative API auth (missing/invalid token).

**Lower Priority / Caution:** Asserting total product count on home (fragile on shared data); parallel multi-user cart contention (high flake risk); full admin CRUD (out of priority); exhaustive field-level UI matrix (prefer BVA over combinatorial explosion).

**Automation design recommendations (Prism-aligned):**
- One Page Object per UI page/component; one API helper per resource
- Tag every spec `@smoke` or `@regression`
- Prefer run-created data; avoid global count assertions
- Encode checkout Confirm ×2 explicitly in the page object/flow
- Keep sensitive credentials in config/env, not in repo

### Traceability Summary

| Assessment Testing Area | Maps To |
|---|---|
| User Registration | AC1 (UI) · Business: Identity · Risk: uniqueness |
| User Login | AC1 (UI) · CUJ-1/2/4 · Smoke · High-risk auth |
| Product Search | AC2 (UI) · CUJ-1/3 · Smoke · Catalog module |
| Product Details | AC2 (UI) · Catalog · Add-to-cart entry point |
| Shopping Cart | AC2 (UI) · CUJ-1/2 · High-risk state · Smoke/Regression |
| Checkout | AC2 (UI) · CUJ-1 · Highest risk (double confirm) |
| Invoice Generation | AC2 (UI) · CUJ-1 end-state · Smoke |
| API Auth + Cart | AC1 (API) · CUJ-5 · Smoke |
| API Products/Invoice | AC2 (API) · CUJ-5 extension · Smoke/Regression |


# Prompt Iteration 2 — Refinement

**Prompt:**

Review the generated requirement analysis from the perspective of a QA Test Architect.

Identify:

Missing business risks
Missing critical user journeys
Weak assumptions
Missing automation opportunities
Any functionality that should be marked high-risk
Any areas outside assessment scope

Improve the requirement analysis while keeping it aligned with the Practice Software Testing application and the Prism Playwright framework.

Return only the improved Markdown sections.

**AI Response Summary:**
The AI reviewed the initial requirement analysis and suggested refinements to improve traceability, strengthen risk-based planning, clarify assumptions for the shared demo environment, and better align critical user journeys with the assessment acceptance criteria (AC1/AC2). The updated analysis also improved automation prioritization and reduced ambiguous assumptions before implementation.

**Validation Notes:**
Following validation of the AI-generated analysis, the reviewed and approved requirement baseline is presented below.

- Accepted improvements to traceability between AC1/AC2 and CUJ mappings.
- Retained only assumptions that could be verified through the application, project rules, or Swagger documentation.
- Rejected any recommendations that introduced unsupported implementation details.
- Confirmed that automation priorities remained focused on business-critical workflows.
- Final requirement analysis below reflects the reviewed and accepted version.

### Changes Accepted After Iteration 2

Based on the review prompt, the following improvements were incorporated into the final requirement analysis:

- Added explicit AC1/AC2 → Critical User Journey mapping for better traceability.
- Strengthened assumptions related to the shared public test environment.
- Refined automation priorities to focus on high-risk business workflows.
- Removed unsupported implementation assumptions suggested by AI.
- Improved requirement traceability for downstream manual and automation test design.

**Final Outcome:** 

The reviewed requirement analysis established the baseline for the remaining QA activities within the assessment.

Following AI-assisted analysis and manual validation, the approved requirements were used to drive:

- Manual Test Design
- API Scenario Design
- Playwright Automation Planning
- Risk-based Test Prioritization
- Requirements Traceability

This concludes the AI-assisted Requirement Analysis and Planning activity.

---

## Implemented Automation Structure

The approved requirements were implemented within the existing Prism Playwright Framework:

| Layer | Location | Tests |
|---|---|---|
| UI specs | `PrismStructure/tests/UI Test/01`–`06` | 8 tests (`TC_LOGIN_001`–`TC_CHK_002`) |
| API specs | `PrismStructure/tests/API Test/01`–`05` | 5 serial tests (`TC_API_001`–`TC_API_005`) |
| UI page objects | `PrismStructure/UI/pageobjects/` | `loginPage`, `registrationPage`, `homePage`, `productDetailsPage`, `shoppingCartPage`, `checkoutPage` |
| API endpoints | `PrismStructure/API/pageobjects/toolshopApiPage.js` | Endpoints and header builders |
| Test data | `UI/resources/data/*.json`, `API/resources/data/*.json`, `API/testdata/*.json` | Static + runtime chained state |
| Playwright project | `testcases_regression` (single project) | UI headed; API serial with `--workers=1` |

**Execution:** 13/13 tests passed. See `readme.md` Section 8 for commands.