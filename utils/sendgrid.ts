export type SendMailBody = {
  subject: string;
  contactName: string;
  response: string;
  sendDate: string;
  message: string;
  email: string;
};

export async function sendMail(body: SendMailBody) {
  const res = await fetch("/api/mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseJson = await res.json();
  if (responseJson.error) {
    return null;
  }
  return responseJson;
}
