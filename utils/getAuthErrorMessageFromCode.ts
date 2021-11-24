import { AuthErrorCodes } from '@firebase/auth';

const getAuthErrorMessageFromCode = (code: string) => {
  switch (code) {
    case AuthErrorCodes.USER_DELETED:
      return 'Error: User Not Found.';
    case AuthErrorCodes.INVALID_PASSWORD:
      return 'Error: Wrong Password.';
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'Error: Email Already Exists.';
    default:
      return 'Error: Unknown';
  }
};

export default getAuthErrorMessageFromCode;
