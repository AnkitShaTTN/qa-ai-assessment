import { test, expect } from "@playwright/test";
import { commonMethods } from "../../API/utilities/apiHelper";
import { _Response } from "../../API/testdata/commonAPIResponse";
import { storeResponseToJsonFile } from "../../API/utilities/storeFullAPIResponse";
const suiteInfo = require("../../API/utilities/requestToCurlLogger");
const toolshopApi = require("../../API/pageobjects/toolshopApiPage");
const registrationBase = require("../../API/resources/data/toolshopRegistrationData.json");
const utils = require("../../commonUtils/utils");

test.beforeAll(async () => {
  suiteInfo.suiteStarter();
});

test("TC_API_001 - Register a new user successfully @api @toolshop @smoke", async () => {
  test.info().annotations.push({
    type: "test_key",
    description: "TC_API_001",
  });

  const email = await utils.generateRandomData("email");
  const randomPart = await utils.generateRandomData("text");
  const password = `Px7!${randomPart}Zq9`;

  const payload = {
    ...registrationBase.validRegistration,
    email,
    password,
  };

  const commonRequest = new commonMethods();
  const response = await commonRequest.PostResponse(
    toolshopApi.registerEndpoint,
    payload,
    toolshopApi.jsonHeaders
  );

  expect(response.status()).toBe(_Response.postPositive);
  expect.soft(response.ok()).toBeTruthy();

  const res = await response.json();
  expect(res.email).toBe(email);
  expect(res.id).toBeTruthy();
  expect(res.first_name).toBe(payload.first_name);
  expect(res.last_name).toBe(payload.last_name);

  const sessionWriter = new storeResponseToJsonFile();
  sessionWriter.storeJsonDataToFile(
    { email, password, userId: res.id },
    "toolshopRegisteredUser"
  );

  console.log("TC_API_001 Passed");
});
