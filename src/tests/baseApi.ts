// src/tests/baseApi.ts

import { AccountApis } from "../client/apis/accountApis";
import { LoginRequest } from "../client/request/account/loginRequest";
import { AppConfiguration } from "../configuration/appConfiguration";
import * as fs from "fs";
import { UserStore } from "../testdata/TestUserManager";
import { allure } from "allure-js-commons";

export class BaseApi {

  protected accountApis!: AccountApis;
  static authToken: string;
  static authTokenV2: string;

  async oneTimeSetUp() {
     const allure = (this as any).allure;
    await allure.step("Initializing the Test Setup", async () => {

      this.initializeServices();

      BaseApi.authToken = await this.getADFToken();
      BaseApi.authTokenV2 = await this.getCPNPToken();

    });
  }

  private async getADFToken(): Promise<string> {

    const loginRequest = this.getValidLoginPayload();

    const response = await this.accountApis.login(loginRequest);

    return `Bearer ${response.token}`;
  }

  private async getCPNPToken(): Promise<string> {
    const user = UserStore.getUser("CommonUser");
    const email = AppConfiguration.username;
    const password = AppConfiguration.password;

    const loginRequest = this.getValidLoginPayloadWithProvider(user.email,user.password,"lcp");

    const response = await this.accountApis.login(loginRequest, 2);

    return `Bearer ${response.token}`;
  }

  private initializeServices() {

    console.log("Initializing AudioDigest Service APIs");

    this.accountApis = new AccountApis();
  }
  public getValidLoginPayload(): LoginRequest {

    const raw = fs.readFileSync(
      "src/testdata/login.json",
      "utf-8"
    );

    const loginRequest: LoginRequest = JSON.parse(raw);

    loginRequest.email = AppConfiguration.username;
    loginRequest.password = AppConfiguration.password;

    return loginRequest;
  }
  protected getValidLoginPayloadWithCreds(email: string, password: string): LoginRequest {
    return {
      email,
      password,
      provider: "adf"
    };
  }

  protected getValidLoginPayloadWithProvider(
    email: string,
    password: string,
    provider: string
  ): LoginRequest {
    return {
      email,
      password,
      provider
    };
  }
}