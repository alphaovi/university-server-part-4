/* eslint-disable @typescript-eslint/no-unused-vars */

import  { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  // setting default values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  type TErrorSource = {
    path: string | number,
    message: string
  }[];

  const errorSources: TErrorSource = [{
    path: "",
    message: "Something went wrong"
  }]

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error: err,
  });
};

export default globalErrorHandler;

// pattern
/*
1.success
2.message
3.errorSource:[
path: "",
message: ""
],
4.stack
*/
