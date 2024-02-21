export class CustomError {
    message!: string;
    status!: number;

    constructor(status: number = 500, message: string = 'error') {
      this.message = message;
      this.status = status;
    }
  }

export type ErrorType = {
  message: string
  status: number
}