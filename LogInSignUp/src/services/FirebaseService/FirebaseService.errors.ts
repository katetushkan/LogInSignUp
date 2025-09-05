import { FirebaseError } from "@firebase/util";

export const getFBError = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/invalid-credential':
      return {
        message: 'Invalid credentials, please try again'
      }

    case 'auth/account-exists-with-different-credential':
      return {
        message: 'You already have an account!'
      }

    default:
      return {
        message: 'Sorry, smth went wrong:('
      }
  }
}

export const firebaseErrorTypeGuard = (error: any) => {
  return error instanceof FirebaseError;
}
