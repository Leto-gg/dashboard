export function getAxiosResponseErrorMessage(error) {
  if (
    error?.response &&
    (error?.response?.data || error?.response?.data.message)
  ) {
    return error.response.data.message || error.response.data;
  }

  return error?.message;
}
