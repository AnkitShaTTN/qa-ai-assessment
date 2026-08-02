# Cursor Project Rules — Prism Toolshop Framework

- Follow the existing Prism folder convention: UI page objects in `PrismStructure/pages/`, API helpers in `PrismStructure/api/`, specs in `PrismStructure/tests/ui` or `tests/api`.
- One Page Object class per UI page/component. One helper class per API resource.
- Every new spec must be tagged `@smoke` or `@regression`.
- Do not exceed 5-8 test cases per type (manual, UI, API) — prefer depth of assertion over test count.
- Always scope test data/assertions to data created within the test run (shared demo backend) — never assert on global counts.
- Record any non-trivial AI-assisted decision (design choice, debugging root cause) in the matching `ai-prompts/*.md` file: Prompt / AI Response Summary / Validation Notes.
- Known app quirk: checkout Confirm button must be clicked twice to generate an invoice — do not "fix" this by clicking once; test the real behavior.
