const createJsonResponse = (data: any) => {
  return {
    message: 'User registered successfully',
    data: data,
    errors: [],
  };
};