const re =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default (emails) => {
  const inviladeEmail = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => re.test(email) === false);

  if (inviladeEmail.length) {
    return 'These emails are invilade ' + inviladeEmail;
  }

  return;
};
