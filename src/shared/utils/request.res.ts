import { Response } from "express";

export function success(
  res: Response,
  message: string,
  data?: any,
  status = 200
) {
  return res.status(status).json({
    success: true,
    message,
    data: data ?? null,
  });
}

export function failed(
  res: Response,
  message: string,
  status = 400,
  details?: any
) {
  return res.status(status).json({
    success: false,
    message,
    details: details ?? null,
  });
}
