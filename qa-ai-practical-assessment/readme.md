# QA AI Practical Assessment

AI-assisted Quality Assurance workflow for the **Practice Software Testing (Toolshop)** application using the **Prism Playwright Framework**.

---

## 1. Project Information

| Item | Details |
|---|---|
| **Application** | Practice Software Testing (Toolshop) |
| **UI URL** | [practicesoftwaretesting.com](https://practicesoftwaretesting.com) |
| **API URL** | [api.practicesoftwaretesting.com](https://api.practicesoftwaretesting.com) |
| **API Documentation** | [Swagger / OpenAPI](https://api.practicesoftwaretesting.com/api/documentation) |
| **Framework** | Prism Playwright Framework |

### Assessment Coverage

| Area | Deliverable | Location |
|---|---|---|
| **Manual Testing** | Functional UI test cases | `FunctionalTestCase.csv` |
| **Manual Testing** | API test cases | `ApiTestCase.csv` |
| **UI Automation** | Playwright UI specs (Toolshop + legacy Prism samples) | `PrismStructure/tests/UI Test/` |
| **API Automation** | Playwright API specs | `PrismStructure/tests/API Test/` |
| **Framework** | Page Objects, utilities, config | `PrismStructure/UI/`, `PrismStructure/API/` |
| **AI Documentation** | Prompt iterations and validation notes | `ai-prompts/` |
| **Evidence** | Execution reports and screenshots | `Evidence/` |

### Toolshop UI Automation Scenarios

| Test ID | Module | Type | Spec File |
|---|---|---|---|
| TS-LOGIN-001 | Login | Smoke | `05_returningCustomerLoginTest.spec.js` |
| TS-REG-001 | Registration | Smoke | `06_toolshopRegistrationTest.spec.js` |
| TS-SEARCH-001 | Product Search | Smoke | `07_toolshopProductSearchTest.spec.js` |
| TS-CART-001 | Shopping Cart | Smoke | `08_toolshopCartTest.spec.js` |
| TS-CHK-001 | Checkout | Smoke | `09_toolshopCheckoutTest.spec.js` |
| TS-LOGIN-002 | Invalid Login | Regression | `10_toolshopInvalidLoginTest.spec.js` |
| TS-CHK-003 | Checkout Validation | Regression | `11_toolshopCheckoutValidationTest.spec.js` |

### Toolshop API Automation Scenarios

| Test ID | Module | Type | Spec File |
|---|---|---|---|
| API-AUTH-001 | Authentication | Smoke | `03_toolshopAuthApi.spec.js` |
| API-AUTH-002 | Authentication | Regression | `03_toolshopAuthApi.spec.js` |
| API-PROD-001 | Product Catalog | Smoke | `04_toolshopProductApi.spec.js` |
| API-PROD-002 | Product Search | Smoke | `04_toolshopProductApi.spec.js` |
| API-CART-002 | Shopping Cart | Smoke | `05_toolshopPurchaseFlowApi.spec.js` |
| API-CHK-001 | Checkout | Smoke | `05_toolshopPurchaseFlowApi.spec.js` |
| API-INV-001 | Invoice | Smoke | `05_toolshopPurchaseFlowApi.spec.js` |

---

## Key Features

- **AI-assisted requirement analysis** — Risk-based scope, critical journeys, and automation opportunities documented in `ai-prompts/requirements-and-planning.md`
- **Manual UI test design** — Functional scenarios in `FunctionalTestCase.csv` (positive, negative, validation)
- **Manual API test design** — API contract scenarios in `ApiTestCase.csv` (request/response validation)
- **Playwright UI automation** — Toolshop UI specs in `PrismStructure/tests/UI Test/` (`05`–`11`)
- **Playwright API automation** — Toolshop API specs in `PrismStructure/tests/API Test/` (`03`–`05`)
- **Page Object Model (POM)** — UI page objects via `POManager.js`; API payloads via `toolshopApiData.js`
- **Dynamic test data generation** — Faker-based registration and API product lookup in `toolshopTestHelper.js`
- **Environment-based configuration** — URLs and credentials via `PrismStructure/.env`
- **HTML reporting** — Playwright HTML reporter (`reporter: 'html'` in `playwright.config.js`)
- **AI prompt documentation** — Iterative prompts and validation notes in `ai-prompts/`
- **Execution evidence** — Archived reports and screenshots in `Evidence/`

---

## AI-Assisted Workflow

This assessment followed a structured AI-assisted QA workflow. Each stage used Cursor Enterprise with project context (Prism framework, Toolshop SUT, AC1/AC2 scope) before moving to implementation.

```mermaid
flowchart LR
    A[Requirement Analysis] --> B[AI Prompt Engineering]
    B --> C[Manual Validation]
    C --> D[Test Design]
    D --> E[UI/API Automation]
    E --> F[Execution]
    F --> G[Debugging]
    G --> H[Documentation]
    H --> I[Final Review]
```

All AI-generated outputs—including requirement analysis, test cases, automation code, and documentation—were **manually validated** against the live Toolshop application, Swagger API documentation, and Playwright execution results before being accepted into the repository. AI acted as an engineering assistant; human review determined what was implemented.

---

## Framework Architecture

The solution layers assessment deliverables on the existing Prism Playwright Framework without redesigning its core structure.

```mermaid
flowchart TB
    R[Requirements]
    A[AI Prompt Documentation]
    P[Prism Playwright Framework]
    U[UI Automation]
    API[API Automation]
    RP[Reports]
    E[Evidence]

    R --> A
    A --> P
    P --> U
    P --> API
    U --> RP
    API --> RP
    RP --> E
```

| Layer | Repository Location |
|---|---|
| Requirements | `FunctionalTestCase.csv`, `ApiTestCase.csv`, `project-info.md` |
| AI Prompt Documentation | `ai-prompts/` |
| Prism Playwright Framework | `PrismStructure/` (`UI/`, `API/`, `commonUtils/`, `playwright.config.js`) |
| UI Automation | `PrismStructure/tests/UI Test/`, `PrismStructure/UI/pageobjects/` |
| API Automation | `PrismStructure/tests/API Test/`, `PrismStructure/API/pageobjects/` |
| Reports | `PrismStructure/playwright-report/`, `PrismStructure/test-results/` |
| Evidence | `Evidence/UI/`, `Evidence/API/` |

---

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| **Node.js / npm** | Runtime and package management |
| **Playwright** (`@playwright/test` ^1.40.0) | UI and API test automation |
| **dotenv** | Environment variable management |
| **@faker-js/faker** / **faker** | Dynamic test data (e.g., registration email) |
| **axios** | HTTP client utilities |
| **winston** | Logging |
| **allure-playwright** | Allure reporting support (optional) |
| **eslint** | Linting |
| **pdf-parse** | PDF validation (legacy Prism UI tests) |
| **xml2js** | Xray result conversion |
| **mysql** | Database utilities (legacy Prism framework) |

---

## 3. Repository Structure

```
qa-ai-practical-assessment/
├── README.md                          # Project documentation (this file)
├── project-info.md                    # AI workflow and assessment context
├── FunctionalTestCase.csv             # Manual UI functional test cases
├── ApiTestCase.csv                    # Manual API test cases
├── ai-prompts/                        # AI prompt documentation
│   ├── requirements-and-planning.md
│   ├── test-design.md
│   ├── test-data.md
│   ├── automation-and-debugging.md
│   ├── documentation-and-summary.md
│   └── api-testing-design.md
├── Evidence/                          # Execution evidence
│   ├── Manual/
│   ├── UI/
│   │   ├── Playwright UI Automation Test Report.html
│   │   └── Playwright UI automation html report.png
│   └── API/
│       ├── Playwright API Test Report.html
│       └── Playwright API html report.png
└── PrismStructure/                    # Prism Playwright Framework
    ├── .env                           # Environment variables (not committed)
    ├── .env.example                   # Environment variable template
    ├── package.json                   # Dependencies and npm scripts
    ├── playwright.config.js           # Playwright projects and reporter config
    ├── playwright-report/             # HTML report output (generated)
    ├── test-results/                  # Screenshots, videos, traces (generated)
    ├── executionResultLogs.log        # Execution log output
    ├── storeBrowserState.json         # Browser state storage
    ├── Jenkinsfile-UI-Automation      # CI pipeline reference (commented)
    ├── API/
    │   ├── pageobjects/               # API endpoints, payloads, headers
    │   │   └── toolshopApiData.js     # Toolshop API test data
    │   ├── testdata/                  # API fixtures and request logs
    │   │   ├── api_requests.log
    │   │   ├── AccessToken.json
    │   │   ├── createDistrict.json
    │   │   └── commonAPIResponse/
    │   └── utilities/                 # API helpers, logging, context
    │       ├── apiHelper.js
    │       ├── toolshopContext.js
    │       └── requestToCurlLogger.js
    ├── UI/
    │   ├── pageobjects/               # Page Object Model classes
    │   │   ├── POManager.js
    │   │   ├── toolshopLoginPage.js
    │   │   ├── toolshopRegisterPage.js
    │   │   ├── toolshopHomePage.js
    │   │   ├── toolshopProductPage.js
    │   │   ├── toolshopCartPage.js
    │   │   ├── toolshopCheckoutPage.js
    │   │   └── toolshopInvoicePage.js
    │   ├── resources/
    │   │   ├── data/                  # UI JSON test data
    │   │   ├── images/
    │   │   └── pdf/
    │   └── utilities/                 # UI helpers and common methods
    │       ├── toolshopCommon.js
    │       ├── toolshopTestHelper.js
    │       └── webUtils.js
    ├── commonUtils/                   # Shared utilities (Xray, logging)
    └── tests/
        ├── UI Test/                   # UI automation specs
        └── API Test/                  # API automation specs
```

---

## 4. Prerequisites

1. **Node.js** — Install from [nodejs.org](https://nodejs.org/)
2. **npm** — Included with Node.js
3. **VS Code** — Recommended IDE
4. **Playwright VS Code extension** — Microsoft Playwright extension (optional, for debugging)

---

## 5. Installation

```bash
# Clone the repository
git clone <repository-url>
cd qa-ai-practical-assessment/PrismStructure

# Install dependencies
npm install
```

All automation commands must be run from the `PrismStructure/` directory.

---

## 6. Environment Configuration (.env)

Copy the example file and configure environment variables:

```bash
cp .env.example .env
```

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `URL` | API base URL (used by `apiHelper.js`) | `https://api.practicesoftwaretesting.com` |
| `TOOLSHOP_BASE_URL` | Toolshop UI base URL | `https://practicesoftwaretesting.com` |
| `TOOLSHOP_EMAIL` | Registered customer email | `customer@practicesoftwaretesting.com` |
| `TOOLSHOP_PASSWORD` | Registered customer password | *(set in `.env`; do not commit)* |

> **Note:** `.env` is excluded from version control via `.gitignore`. Never commit credentials.

---

## 7. Test Data

### UI Test Data

| File | Purpose |
|---|---|
| `PrismStructure/UI/resources/data/toolshopTestData.json` | Search keyword, billing address, payment method, assertion messages |
| `PrismStructure/UI/resources/data/toolshopLoginData.json` | Returning-customer display name, post-login path, protected routes |
| `PrismStructure/UI/resources/data/testCasesMeta.json` | Keyword-to-test-ID mapping for test annotations |
| `PrismStructure/UI/resources/data/loginData.json` | Legacy Prism login data |
| `PrismStructure/UI/resources/data/system.json` | Legacy Prism system data |
| `PrismStructure/UI/utilities/toolshopTestHelper.js` | Runtime data — Faker-based registration users, API product lookup |

### API Test Data

| File | Purpose |
|---|---|
| `PrismStructure/API/pageobjects/toolshopApiData.js` | Endpoints, headers, login/cart/invoice payload builders |
| `PrismStructure/API/utilities/toolshopContext.js` | Runtime shared context (token, cart ID, invoice ID) |
| `PrismStructure/API/testdata/api_requests.log` | CURL request log (generated during API runs) |
| `PrismStructure/API/testdata/AccessToken.json` | Legacy access token fixture |
| `PrismStructure/API/testdata/createDistrict.json` | Legacy district creation fixture |
| `PrismStructure/API/testdata/commonAPIResponse/` | Common API response schemas |

### Environment Variables

Credentials and base URLs are loaded from `PrismStructure/.env` via `dotenv` (configured in `playwright.config.js` and utility modules). Specs reference `process.env.TOOLSHOP_EMAIL`, `process.env.TOOLSHOP_PASSWORD`, `process.env.URL`, and `process.env.TOOLSHOP_BASE_URL`.

---

## 8. Execution Commands

Run all commands from `PrismStructure/`.

### UI Smoke

Executes Toolshop UI tests tagged `@smoke` on the `testcases_regression` project (Chromium, headed, trace/video enabled):

```bash
npx playwright test --project=testcases_regression --grep @smoke --workers=2
```

### UI Regression

```bash
npm run test:regression
```

Equivalent command:

```bash
npx playwright test --project=testcases_regression --grep @regression --workers=2
```

### API Smoke

```bash
npm run test:api-smoke
```

Equivalent command:

```bash
npx playwright test --project=toolshop_api --grep @smoke --workers=1
```

### API Regression

```bash
npm run test:api-regression
```

Equivalent command:

```bash
npx playwright test --project=toolshop_api --grep @regression --workers=1
```

### Complete Suite

Runs all Playwright projects (UI + API):

```bash
npx playwright test
```

Run all API tests only:

```bash
npm run test:api
```

Equivalent command:

```bash
npx playwright test --project=toolshop_api --workers=1
```

### Additional Playwright CLI Commands

```bash
# Interactive UI mode
npx playwright test --ui

# Single test file
npx playwright test tests/UI Test/05_returningCustomerLoginTest.spec.js

# Single test by title
npx playwright test -g "TS-LOGIN-001"

# Headed browser
npx playwright test --headed

# Codegen
npx playwright codegen https://practicesoftwaretesting.com
```

---

## 9. Execution Reports

### HTML Report

Playwright generates an HTML report after each run (configured via `reporter: 'html'` in `playwright.config.js`).

| Item | Location |
|---|---|
| Report index | `PrismStructure/playwright-report/index.html` |
| Open report locally | `npx playwright show-report` |

Archived evidence copies:

| Report | Location |
|---|---|
| UI HTML report | `Evidence/UI/Playwright UI Automation Test Report.html` |
| UI report screenshot | `Evidence/UI/Playwright UI automation html report.png` |
| API HTML report | `Evidence/API/Playwright API Test Report.html` |
| API report screenshot | `Evidence/API/Playwright API html report.png` |

### Playwright Report

The `playwright-report/` folder contains the interactive HTML report with trace viewer assets:

- `playwright-report/index.html` — Main report entry point
- `playwright-report/trace/` — Trace viewer for step-by-step debugging
- `playwright-report/data/` — Screenshots, videos, and trace archives

### Test Results Folder

Per-test artifacts are stored in `PrismStructure/test-results/`:

| Artifact | Description |
|---|---|
| `test-finished-*.png` | Screenshots (screenshot mode: `on`) |
| `video.webm` | Video recording (mode: `on`) |
| `trace.zip` | Playwright trace (trace: `on`) |

### Additional Logs

| Log | Location |
|---|---|
| Execution log | `PrismStructure/executionResultLogs.log` |
| API CURL log | `PrismStructure/API/testdata/api_requests.log` |

---

## 10. AI Prompt Documentation

Prompt iterations, AI response summaries, and manual validation notes are maintained in `ai-prompts/`:

| File | Focus |
|---|---|
| `ai-prompts/requirements-and-planning.md` | Requirement analysis, risk assessment, scope, AC1/AC2 traceability |
| `ai-prompts/test-design.md` | Manual test case design (positive, negative, validation scenarios) |
| `ai-prompts/test-data.md` | Test data strategy, static vs runtime data, env variable usage |
| `ai-prompts/automation-and-debugging.md` | Framework analysis, automation implementation, debugging approach |
| `ai-prompts/documentation-and-summary.md` | Documentation and assessment summary prompts |

Additional reference: `ai-prompts/api-testing-design.md` (API test design iterations).

Project workflow context: `project-info.md`

---

## 11. Assumptions

1. Target environment is `practicesoftwaretesting.com` with matching API at `api.practicesoftwaretesting.com`.
2. Existing **Prism Playwright** structure (POM, helpers, config, tags) is reused; core framework architecture is not redesigned.
3. Tests are tagged `@smoke` or `@regression` and kept to **depth over volume** (~5–8 cases per type).
4. Backend is a **shared public demo**; tests use **run-scoped data** and avoid asserting global catalog counts.
5. Checkout **Confirm button requires two clicks** — expected application behavior, not a defect.
6. API validation is based on **Swagger/OpenAPI** contracts and observed UI network traffic.
7. Credentials and configuration remain in `.env`, not hardcoded in specs.
8. Scope is **functional** (UI + API); non-functional testing is out of primary assessment scope.
9. AI outputs are **advisory** and require manual validation against the live app and Swagger before implementation.
10. Default seeded products and users may change; automation creates or selects data dynamically where practical (e.g., Faker registration, API product lookup).

---

## Final Results

| Deliverable | Status | Summary |
|---|---|---|
| **Manual UI Test Cases** | Completed | 7 cases in `FunctionalTestCase.csv` — Registration, Login, Search, Cart, Checkout (smoke + regression) |
| **Manual API Test Cases** | Completed | 7 cases in `ApiTestCase.csv` — Auth, Product Catalog, Search, Cart, Checkout, Invoice |
| **UI Automation** | Completed | 7 Toolshop scenarios (`05_returningCustomerLoginTest.spec.js` through `11_toolshopCheckoutValidationTest.spec.js`) |
| **API Automation** | Completed | 7 Toolshop scenarios across `03_toolshopAuthApi.spec.js`, `04_toolshopProductApi.spec.js`, `05_toolshopPurchaseFlowApi.spec.js` |
| **HTML Reports Generated** | Completed | `PrismStructure/playwright-report/`; archived in `Evidence/UI/` and `Evidence/API/` |
| **AI Documentation** | Completed | `ai-prompts/` — requirements, test design, test data, automation/debugging, documentation prompts; plus `api-testing-design.md` |
| **Execution Evidence Captured** | Completed | UI/API HTML reports, report screenshots, `test-results/` artifacts (screenshots, videos, traces) |

---

## References

- Toolshop UI: [practicesoftwaretesting.com](https://practicesoftwaretesting.com)
- Toolshop API: [api.practicesoftwaretesting.com](https://api.practicesoftwaretesting.com)
- Swagger Documentation: [api.practicesoftwaretesting.com/api/documentation](https://api.practicesoftwaretesting.com/api/documentation)
- Prism Framework README: `PrismStructure/README.md`
