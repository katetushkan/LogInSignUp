export const DEFAULT_ERROR_MESSAGE = 'Something happen, please try again';
export const EMPTY_ERROR_MESSAGE = 'Please, fill all required fields';

export const isValidEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log('TEST', re.test(String(email).toLowerCase()));

  return {
    error: !re.test(String(email).toLowerCase()),
    message: 'Invalid email'
  }
}
