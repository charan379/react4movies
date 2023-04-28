export default class MovieBunkersException extends Error {
  success;
  name;
  status;
  reason;
  constructor(errorResponse) {
    super(errorResponse.error.message);
    this.success = errorResponse.success;
    this.name = errorResponse.error.name + ":MBE";
    this.status = errorResponse.error.status;
    this.reason = errorResponse.error.reason;
  }
}
