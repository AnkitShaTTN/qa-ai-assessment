import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
import { storeResponseToJsonFile } from "../../API/utilities/storeFullAPIResponse";
const suiteInfo = require("../../API/utilities/requestToCurlLogger");
const toolshopApi = require("../../API/pageobjects/toolshopApiPage");
const fs = require("fs");
const path = require("path");

const registeredUserPath = path.join(
  __dirname,
  "../../API/testdata/toolshopRegisteredUser.json"
);

test.beforeAll(async () => {
  suiteInfo.suiteStarter();
});

test("TC_API_002 - Login with registered user and generate Bearer Token @api @toolshop @smoke", async () => {
  test.info().annotations.push({
    type: "test_key",
    description: "TC_API_002",
  });

  expect(
    fs.existsSync(registeredUserPath),
    "Run TC_API_001 first to create toolshopRegisteredUser.json"
  ).toBeTruthy();

  const registeredUser = JSON.parse(fs.readFileSync(registeredUserPath, "utf-8"));

  const payload = {
    email: registeredUser.email,
    password: registeredUser.password,
  };

  const commonRequest = new commonMethods();
  const response = await commonRequest.PostResponse(
    toolshopApi.loginEndpoint,
    payload,
    toolshopApi.jsonHeaders
  );

  expect(response.status()).toBe(_Response.getPositive);
  expect.soft(response.ok()).toBeTruthy();

  const res = await response.json();
  expect(res.access_token).toBeTruthy();
  expect(res.token_type).toMatch(/bearer/i);
  expect(res.expires_in).toBeGreaterThan(0);

  const tokenWriter = new storeResponseToJsonFile();
  tokenWriter.storeJsonDataToFile(
    {
      access_token: res.access_token,
      token_type: res.token_type,
      expires_in: res.expires_in,
    },
    "toolshopAccessToken"
  );

  console.log("TC_API_002 Passed");
});
