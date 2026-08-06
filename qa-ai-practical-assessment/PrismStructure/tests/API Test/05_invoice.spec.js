import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
const suiteInfo = require("../../API/utilities/requestToCurlLogger");
const toolshopApi = require("../../API/pageobjects/toolshopApiPage");
const invoiceBase = require("../../API/resources/data/toolshopInvoiceData.json");
const fs = require("fs");
const path = require("path");

const accessTokenPath = path.join(
  __dirname,
  "../../API/testdata/toolshopAccessToken.json"
);
const sessionPath = path.join(
  __dirname,
  "../../API/testdata/toolshopSession.json"
);

test.beforeAll(async () => {
  suiteInfo.suiteStarter();
});

test("TC_API_005 - Generate invoice with Cash on Delivery and verify response @api @toolshop @smoke", async () => {
  test.info().annotations.push({
    type: "test_key",
    description: "TC_API_005",
  });

  expect(
    fs.existsSync(accessTokenPath),
    "Run TC_API_002 first to create toolshopAccessToken.json"
  ).toBeTruthy();
  expect(
    fs.existsSync(sessionPath),
    "Run TC_API_004 first to store cartId in toolshopSession.json"
  ).toBeTruthy();

  const accessTokenData = JSON.parse(fs.readFileSync(accessTokenPath, "utf-8"));
  const sessionData = JSON.parse(fs.readFileSync(sessionPath, "utf-8"));

  const payload = {
    ...invoiceBase.cashOnDeliveryInvoice,
    cart_id: sessionData.cartId,
  };

  const headers = toolshopApi.authHeaders(accessTokenData.access_token);
  const commonRequest = new commonMethods();
  const response = await commonRequest.PostResponse(
    toolshopApi.invoicesEndpoint,
    payload,
    headers
  );

  expect(response.status()).toBe(_Response.postPositive);
  expect.soft(response.ok()).toBeTruthy();

  const res = await response.json();
  expect(res.id).toBeTruthy();
  expect(res.invoice_number).toMatch(/^INV-/);
  expect(res.billing_street).toBe(payload.billing_street);
  expect(res.billing_city).toBe(payload.billing_city);
  expect(res.billing_state).toBe(payload.billing_state);
  expect(res.billing_country).toBe(payload.billing_country);
  expect(res.billing_postal_code).toBe(payload.billing_postal_code);
  expect(res.subtotal).toBeGreaterThanOrEqual(0);
  expect(res.total).toBeGreaterThanOrEqual(0);

  console.log("TC_API_005 Passed");
});
