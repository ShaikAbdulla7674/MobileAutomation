import { expect } from "chai";
import { AccountApis } from "../../client/apis/accountApis";
import { LoginResponse } from "../../client/response/account/loginResponse";
import { BaseApi } from "../baseApi";

describe("Accounts API Tests - Login", function () {

  const baseApi = new BaseApi();
  const accountApi = new AccountApis();

  it("Verify login with valid credentials", async function () {

    const allure = (this as any).allure;

    // 🔴 SAFE GUARD (IMPORTANT)
    if (!allure) {
      console.warn("Allure is not initialized. Check reporter config.");
    }

    // Arrange
    const loginRequest = baseApi.getValidLoginPayload();

    // Act
    const response: LoginResponse = await accountApi.login(loginRequest);

    // Step 1
    await allure?.step("Verify Successful Login Response", async () => {
      expect(response.statusCode).to.equal(200);
      expect(response.success).to.equal(true);
    });

    // Step 2
    await allure?.step("Verify Token Details", async () => {
      expect(response.token).to.not.be.empty;
      expect(response.refreshToken).to.not.be.empty;
    });

  });

});