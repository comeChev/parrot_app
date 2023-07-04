export function verifyEmail(email: string) {
  const mailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const result = email.match(mailFormat);
  if (!result) return false;
  return true;
}
