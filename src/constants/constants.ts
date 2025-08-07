import { OrderItem } from "sequelize";
import { ApiResponse } from "../interfaces";
import { RESPONSE_MESSAGES } from "./messages";

export const DEVELOPMENT = "development";
export const PRODUCTION = "production";
export const TESTING = "testing";

export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const DEFAULT_QUERY_LIMIT = 20; //Maximum ammount of rows to return in a query to the db
export const DEFAULT_OFFSET = 0;
export const DEFAULT_ORDER_BY = {
  ALPH: "id",
  ASCDESC: "ASC",
};
export const ORDER_BY = [
  "ALPH_ASC",
  "ALPH_DESC",
  "DATE_ASC",
  "DATE_DESC",
  "ID_ASC",
  "ID_DESC",
];

export const DEFAULT_RESPONSE: ApiResponse<any> = {
  status_code: STATUS_CODE.INTERNAL_SERVER_ERROR,
  message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
  data: [],
};

export const TOKEN_DURATION = "24h";
export const TOKEN_NAME = "access_token";

export const ROLE_ID = {
  ADMIN: 1,
  USER: 2,
};

export const ERRORS = {
  CONFLICT: "unique violation",
  INVALID_CREDENTIALS: "Invalid Credentials",
  INVALID_TOKEN: "Invalid Token",
  NOT_LOGGED_IN: "Not Logged In",
  NOT_FOUND: "Not Found",
};

export const SALT_ROUNDS = 10;
