import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
import { storeResponseToJsonFile } from "../../API/utilities/storeFullAPIResponse";
const suiteInfo = require("../../API/utilities/requestToCurlLogger");
const toolshopApi = require("../../API/pageobjects/toolshopApiPage");
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

test("TC_API_004 - Create cart and add product using Bearer Token @api @toolshop @smoke", async () => {
  test.info().annotations.push({
    type: "test_key",
    description: "TC_API_004",
  });

  expect(
    fs.existsSync(accessTokenPath),
    "Run TC_API_002 first to create toolshopAccessToken.json"
  ).toBeTruthy();
  expect(
    fs.existsSync(sessionPath),
    "Run TC_API_003 first to create toolshopSession.json"
  ).toBeTruthy();

  const accessTokenData = JSON.parse(fs.readFileSync(accessTokenPath, "utf-8"));
  const sessionData = JSON.parse(fs.readFileSync(sessionPath, "utf-8"));

  const headers = toolshopApi.authHeaders(accessTokenData.access_token);
  const commonRequest = new commonMethods();

  const createCartResponse = await commonRequest.PostResponse(
    toolshopApi.cartsEndpoint,
    {},
    headers
  );

  expect(createCartResponse.status()).toBe(_Response.postPositive);
  expect.soft(createCartResponse.ok()).toBeTruthy();

  const cartBody = await createCartResponse.json();
  expect(cartBody.id).toBeTruthy();

  const addProductPayload = {
    product_id: sessionData.productId,
    quantity: 1,
  };

  const addProductResponse = await commonRequest.PutResponse(
    toolshopApi.addProductToCartEndpoint(cartBody.id),
    headers,
    addProductPayload
  );

  expect(addProductResponse.status()).toBe(_Response.getPositive);
  expect.soft(addProductResponse.ok()).toBeTruthy();

  const addResult = await addProductResponse.json();
  expect(addResult.result).toMatch(/item added or updated/i);

  const session = { ...sessionData, cartId: cartBody.id };

  const sessionWriter = new storeResponseToJsonFile();
  sessionWriter.storeJsonDataToFile(session, "toolshopSession");

  console.log("TC_API_004 Passed");
});
