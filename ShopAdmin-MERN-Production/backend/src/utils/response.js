// Send successful response
export function success(
  res,
  message,
  data = null,
  meta = {},
  status = 200
) {
  return res.status(status).json({
    success: true,
    message,
    data,
    meta,
  });
}

// Send failure response
export function failure(
  res,
  message,
  errors = [],
  status = 400
) {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
}