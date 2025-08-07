import bcrypt from "bcrypt";
import { Order, OrderItem } from "sequelize";
import { DEFAULT_ORDER_BY, ERRORS, STATUS_CODE } from "./constants/constants";
import { ApiResponse } from "./interfaces";
import { AUTH_MESSAGES, RESPONSE_MESSAGES } from "./constants/messages";
import User from "./models/userModel";

/**
 * Checks if a given string is a comma-separated list of numbers.
 *
 * This function tests whether the input string consists of one or more
 * numeric values separated by commas. Each numeric value should be a
 * sequence of digits without any leading or trailing spaces.
 *
 * @param {string} str - The string to be tested.
 * @returns {boolean} - Returns `true` if the string is a valid comma-separated
 * list of numbers, otherwise returns `false`.
 *
 * @example
 * // returns true
 * isCsvNumbers("1,2,3,4,5");
 *
 * @example
 * // returns true
 * isCsvNumbers("42");
 *
 * @example
 * // returns false
 * isCsvNumbers("1, 2, 3"); // contains spaces
 *
 * @example
 * // returns false
 * isCsvNumbers("1,,2,3"); // contains consecutive commas
 *
 * @example
 * // returns false
 * isCsvNumbers("1,a,3"); // contains non-numeric characters
 */
export const isCsvNumbers = (str: string): boolean => {
  return /^(\d+)(,\d+)*$/.test(str);
};

/**
 * Returns an array that contains the splitted values from str if it's a comma-separated list of numbers.
 *
 * If str is not a comma-separated list of numbers, this function will return a single element array that contains str.
 *
 * @param {string} str - The string to be splitted
 * @returns {Array<string>} - The array that that contains the splitted values from str
 *
 * @example
 * //returns ["1","2","3","4"]
 * getArrayFromCSV("1,2,3,4");
 *
 * @example
 * //returns ["12"]
 * getArrayFromCSV("12");
 *
 * @example
 * //returns ["1,,2,3"]
 * getArrayFromCSV("1,,2,3"); // contains consecutive commas
 *
 * @example
 * //returns ["1,a,3"]
 * getArrayFromCSV("1,a,3"); // contains non-numeric characters
 */
export const getArrayFromNumericCSV = (str: string): string[] => {
  let arr: Array<string> = [];

  if (isCsvNumbers(str)) arr = str.split(",");
  else arr = [str];

  return arr;
};

/**
 * This function throws a Not Found error if 'value' is an empty array or equal to zero.
 *
 * This function must be called each time there's an UPDATE or GET call in the API controllers,
 * and it must receive the return value of the sequelize find, delete, or update, functions.
 *
 * @param value - The return value of the sequelize function
 */
export const checkIfNotFound = (value) => {
  if (
    value == null ||
    value == 0 ||
    (Array.isArray(value) && value.length == 0)
  ) {
    throw new Error(ERRORS.NOT_FOUND);
  }
};

/**
 * Parses a string and returns a Sequelize-compatible order clause.
 *
 * This function is designed to map a string input (e.g., "ALPH_DESC", "DATE_ASC")
 * into a Sequelize `order` format: `[[columnName, direction]]`. It supports
 * ordering by an alphabetical attribute or a date attribute, and allows for
 * specifying ascending or descending order.
 *
 * @param {string} alphAttributeName - The column name to use when the string includes "ALPH".
 * @param {string} dateAttributeName - The column name to use when the string includes "DATE".
 * @param {string} str - The sorting string, expected to include "ALPH" or "DATE" and optionally "DESC".
 *                        If "DESC" is not present, ordering defaults to ascending.
 *
 * @returns {[OrderItem]} A single-element array containing the column and direction for Sequelize's `order` option.
 *
 * @example
 * getOrderByFromString('name', 'createdAt', 'ALPH_DESC');
 * // Returns: [['name', 'DESC']]
 *
 * @example
 * getOrderByFromString('name', 'createdAt', 'DATE');
 * // Returns: [['createdAt', 'ASC']]
 */
export const getOrderByFromString = (
  alphAttributeName: string,
  dateAttributeName: string,
  str: string
) => {
  const order: OrderItem = [DEFAULT_ORDER_BY.ALPH, DEFAULT_ORDER_BY.ASCDESC];

  if (str) {
    if (str.includes("ALPH")) order[0] = alphAttributeName;
    else if (str.includes("DATE")) order[0] = dateAttributeName;

    if (str.includes("DESC")) order[1] = "DESC";
  }
  return [order];
};

/**
 *This function returns a json value corresponding with the error that is passed to it
 *
 * @param error - The error obtained with a try catch
 * @returns response - A json value that contains 'statusCode' and 'message'
 */
export const handleError = (error) => {
  console.log(error);

  //500 internal server error
  let response: ApiResponse<null> = {
    status_code: STATUS_CODE.INTERNAL_SERVER_ERROR,
    message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
    data: [],
  };

  //409 conflict
  if (error.errors && error.errors[0].type === ERRORS.CONFLICT) {
    response.message = error.errors[0].message;
    response.status_code = STATUS_CODE.CONFLICT;
  }

  //404 not found
  if (error.message && error.message === ERRORS.NOT_FOUND) {
    response.message = RESPONSE_MESSAGES.NOT_FOUND;
    response.status_code = STATUS_CODE.NOT_FOUND;
  }

  //403 forbidden
  if (error.message && error.message === ERRORS.INVALID_TOKEN) {
    response.message = AUTH_MESSAGES.INVALID_TOKEN_MESSAGE;
    response.status_code = STATUS_CODE.FORBIDDEN;
  }

  //401 unauthorized
  if (error.message && error.message === ERRORS.INVALID_CREDENTIALS) {
    response.message = RESPONSE_MESSAGES.WRONG_PASSWORD;
    response.status_code = STATUS_CODE.UNAUTHORIZED;
  }
  if (error.message && error.message === ERRORS.NOT_LOGGED_IN) {
    response.message = RESPONSE_MESSAGES.NOT_LOGGED_IN;
    response.status_code = STATUS_CODE.UNAUTHORIZED;
  }

  return response;
};

/**
 * Checks whether the given string is a valid email address.
 * Example of valid email: user@domain.com
 *
 * @param {string} input - The string to validate as an email.
 * @returns {boolean} true if is a valid email address; otherwise, false.
 *
 * @example
 * isEmail("test@example.ts");
 * // Returns: true
 *
 * @example
 * isEmail("john@doe");
 * // Returns: false
 *
 * @example
 * isEmail("@testing.org");
 * // Returns: false
 */
export const isEmail = (input: string): Boolean => {
  return /^[a-zA-Z]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(input);
};

/**
 * Checks if password matches with hashedPassword
 *
 * @param password - plain text string
 * @param hashedPassword - hashed string
 * @returns true if hash matches password, false otherwise
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const isValidUser = async (id: number): Promise<boolean> => {
  const user = await User.findOne({ where: { id: id } });
  return user.deleted;
};
