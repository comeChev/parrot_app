"use client";

import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import cookies from "@/assets/cookies.png";

export default function UiCookieConsent() {
  const cookieConsentValue = getCookieConsentValue();

  return (
    !cookieConsentValue && (
      <CookieConsent
        ariaAcceptLabel="J'accepte les cookies"
        ariaDeclineLabel="Je refuse les cookies"
        disableStyles={true}
        enableDeclineButton={true}
        buttonClasses="bg-neutral-800 hover:bg-neutral-100 hover:text-neutral-800 text-white font-light border border-neutral-800 py-2 px-4 rounded mr-4 transition-all duration-400 ease-in-out"
        declineButtonClasses="hover:underline text-neutral-100 font-light mr-4 transition-all duration-400 ease-in-out"
        containerClasses="sticky bottom-0 bg-neutral-700 bg-opacity-90 text-white text-center p-4 w-full"
        buttonWrapperClasses="flex items-center w-full justify-end px-4"
        overlayClasses="fixed top-0 inset-0 bg-neutral-800 bg-opacity-50 z-50 w-full h-full flex flex-col justify-end"
        overlay={true}
        buttonText="J'accepte les cookies"
        declineButtonText="Je refuse les cookies"
        debug={true}
      >
        <div className="text-start p-4">
          <div className="flex items-center mb-4">
            <Image
              src={cookies}
              alt="cookies"
              width={50}
              height={50}
              className="mr-2"
            />
            <h3 className="text-lg font-bold text-neutral-100">
              Ce site utilise des cookies
            </h3>
          </div>
          <p className="text-sm mb-1">
            Nous utilisons des cookies pour nous aider à personnaliser le
            contenu et surtout pour vous permettre d'avoir la meilleure
            expérience possible.
          </p>
          <p className="text-sm mb-1 hidden md:flex">
            En cliquant sur{" "}
            <span className="italic font-medium">"J'accepte"</span>, vous
            acceptez l'utilisation de ces cookies, comme définie dans notre
            politique de confidentialité.
          </p>
          <Link
            href="/privacy"
            className="text-xs hover:underline underline-offset-4"
          >
            Lire notre politique de confidentialité
          </Link>
        </div>
      </CookieConsent>
    )
  );
}
