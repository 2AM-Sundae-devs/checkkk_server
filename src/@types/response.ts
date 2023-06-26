export type IsError = 'Y' | 'N';

export const setResponse = (isError: IsError, message: string) => {
  if (isError === 'Y') {
    return setErrorResponse(message);
  }

  return setSuccessfulResponse(message);
};

export const setSuccessfulResponse = (
  message: string = '요청에 성공했습니다!',
) => {
  return {
    err: 'Y',
    message,
  };
};

export const setErrorResponse = (
  errorMessage: string = '요청에 실패했습니다!',
) => {
  return {
    err: 'Y',
    errorMessage,
  };
};
