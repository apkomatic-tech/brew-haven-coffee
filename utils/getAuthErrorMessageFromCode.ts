const getAuthErrorMessageFromCode = (code: string) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'Error: User Not Found.';
    case 'auth/wrong-password':
      return 'Error: Wrong Password.';
    case 'auth/email-already-exists':
    case 'auth/email-already-in-use':
      return 'Error: Email Already Exists.';
    default:
      return 'Error: Unknown';
  }
};

export default getAuthErrorMessageFromCode;
