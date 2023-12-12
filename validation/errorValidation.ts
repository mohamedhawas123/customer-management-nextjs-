
export const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  export const validatePhoneNumber = (number: string) => {
    const re = /^\+[0-9]{12}$/;
    return re.test(number);
  };