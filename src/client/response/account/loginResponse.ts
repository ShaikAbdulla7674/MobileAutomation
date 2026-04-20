import { BaseResponse } from "../baseResponse";

export interface ErrorDetails {
  fieldName: string;
  message: string;
}

export interface LoginResponse extends BaseResponse {
  token: string;
  success: boolean;
  refreshToken: string;
  errors: ErrorDetails[];
}