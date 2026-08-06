import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
import { storeResponseToJsonFile } from "../../API/utilities/storeFullAPIResponse";
const suiteInfo = require("../../API/utilities/requestToCurlLogger");
const toolshopApi = require("../../API/pageobjects/toolshopApiPage");
const fs = require("fs");
const path = require("path");

test.beforeAll(async () => {
  suiteInfo.suiteStarter();
});

test("TC_API_003 - Retrieve product list and verify successful response @api @toolshop @smoke", async () => {
  test.info().annotations.push({
    type: "test_key",
    description: "TC_API_003",
  });

  const commonRequest = new commonMethods();
  const response = await commonRequest.GetResponse(
    toolshopApi.productsEndpoint,
    toolshopApi.jsonHeaders
  );

  expect(response.status()).toBe(_Response.getPositive);
  expect.soft(response.ok()).toBeTruthy();

  const res = await response.json();
  expect(res.data).toBeDefined();
  expect(Array.isArray(res.data)).toBeTruthy();
  expect(res.data.length).toBeGreaterThan(0);
  expect(res.data[0].id).toBeTruthy();
  expect(res.data[0].name).toBeTruthy();

  const sessionPath = path.join(
    __dirname,
    "../../API/testdata/toolshopSession.json"
  );
  let session = {};
  if (fs.existsSync(sessionPath)) {
    session = JSON.parse(fs.readFileSync(sessionPath, "utf-8"));
  }
  session.productId = res.data[0].id;

  const sessionWriter = new storeResponseToJsonFile();
  sessionWriter.storeJsonDataToFile(session, "toolshopSession");

  console.log("TC_API_003 Passed");
});
