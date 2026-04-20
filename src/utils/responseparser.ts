// src/utils/responseParser.ts

import { LoginResponse, ErrorDetails } from "../client/response/account/loginResponse";

export function parseLoginResponse(data: any): LoginResponse {

  let errors: ErrorDetails[] = [];

  if (data.errors) {
    if (Array.isArray(data.errors)) {

      if (typeof data.errors[0] === "object") {
        // structured errors
        errors = data.errors.map((e: any) => ({
          fieldName: e.fieldName || e.FieldName || "General",
          message: e.message || e.Message
        }));

      } else if (typeof data.errors[0] === "string") {
        // string errors
        errors = data.errors.map((msg: string) => ({
          fieldName: "General",
          message: msg
        }));
      }
    }
  }

  return {
    token: data.token,
    success: data.success,
    refreshToken: data.refreshToken,
    errors: errors,
    message: data.message // from BaseResponse
  };
}