// Create pagination parameters
export function pagination(query = {}) {
  const page = Math.max(
    Number(query.page) || 1,
    1
  );

  const limit = Math.min(
    Math.max(Number(query.limit) || 10, 1),
    100
  );

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

// Create pagination metadata
export function paginationMeta(
  page,
  limit,
  total
) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}