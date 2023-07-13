"use client";
import { SendMailBody, sendMail } from "@/utils/sendgrid";
import React from "react";

export default function SendMail() {
  const sendMailBody: SendMailBody = {
    subject: "Notre réponse à votre demande",
    message: "Bonjour j'aimerai que vous me répondiez à cette demande.",
    response: "Bonjour, voici notre réponse à votre demande.",
    sendDate: `${new Date().toLocaleDateString()} à ${new Date().toLocaleTimeString()}`,
    email: "come.chevallier@icloud.com",
    contactName: "Côme",
  };

  async function send() {
    const res = await sendMail(sendMailBody);
    if (res) alert("Mail envoyé");
    else alert("Erreur lors de l'envoi du mail");
  }
  return <button onClick={send}>Envoyer un mail</button>;
}
