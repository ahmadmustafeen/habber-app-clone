export const validEmail = email => {
  const emailValid = /^$|^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailValid.test(email)) return true;
  return false;
};
