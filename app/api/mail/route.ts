import { verifySession } from "@/utils/nextAuth/nextAuth.protections";
import { NextRequest, NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import { SendMailBody } from "@/utils/sendgrid";

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

export async function POST(request: NextRequest) {
  const hasSession = await verifySession();
  try {
    if (!hasSession)
      return new NextResponse(
        JSON.stringify({ error: "Vous n'êtes pas autorisé" }),
        { status: 401 }
      );

    const body: SendMailBody = await request.json();

    const templateEmail = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
  data-editor-version="2"
  class="sg-campaigns"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <style type="text/css">
      body,
      p,
      div {
        font-family: arial, helvetica, sans-serif;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #1188e6;
        text-decoration: none;
      }
      p {
        margin: 0;
        padding: 0;
      }
      table.wrapper {
        width: 100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width: 480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
    <!--user entered Head Start-->
    <!--End Head user entered-->
  </head>
  <body>
    <center
      class="wrapper"
      data-link-color="#1188E6"
      data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;"
    >
      <div class="webkit">
        <table
          cellpadding="0"
          cellspacing="0"
          border="0"
          width="100%"
          class="wrapper"
          bgcolor="#FFFFFF"
        >
          <tr>
            <td valign="top" bgcolor="#FFFFFF" width="100%">
              <table
                width="100%"
                role="content-container"
                class="outer"
                align="center"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td width="100%">
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td>
                          <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="width: 100%; max-width: 600px"
                            align="center"
                          >
                            <tr>
                              <td
                                role="modules-container"
                                style="
                                  padding: 0px 0px 0px 0px;
                                  color: #000000;
                                  text-align: left;
                                "
                                bgcolor="#FFFFFF"
                                width="100%"
                                align="left"
                              >
                                <table
                                  class="module preheader preheader-hide"
                                  role="module"
                                  data-type="preheader"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="
                                    display: none !important;
                                    visibility: hidden;
                                    opacity: 0;
                                    color: transparent;
                                    height: 0;
                                    width: 0;
                                  "
                                >
                                  <tr>
                                    <td role="module-content">
                                      <p>Garage Parrot</p>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  class="wrapper"
                                  role="module"
                                  data-type="image"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="95303652-1e72-4cd8-9379-87e0d6a65d26"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          font-size: 6px;
                                          line-height: 10px;
                                          padding: 0px 0px 0px 0px;
                                        "
                                        valign="top"
                                        align="center"
                                      >
                                        <img
                                          class="max-width"
                                          border="0"
                                          style="
                                            display: block;
                                            color: #000000;
                                            text-decoration: none;
                                            font-family: Helvetica, arial,
                                              sans-serif;
                                            font-size: 16px;
                                            max-width: 100% !important;
                                            width: 100%;
                                            height: auto !important;
                                          "
                                          width="600"
                                          alt=""
                                          data-proportionally-constrained="true"
                                          data-responsive="true"
                                          src="http://cdn.mcauto-images-production.sendgrid.net/5a67510e5a2eb236/1c61bbce-546d-4699-9eb6-6eee4d613f47/1089x464.png"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="81386555-bd0a-4683-b5be-c4c44c04076c"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding: 18px 0px 18px 0px;
                                          line-height: 20px;
                                          text-align: inherit;
                                        "
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <h4
                                            style="
                                              text-align: inherit;
                                              font-family: inherit;
                                            "
                                          >
                                            Bonjour, ${body.contactName},
                                          </h4>
                                          <h4
                                            style="
                                              text-align: inherit;
                                              font-family: inherit;
                                            "
                                          >
                                            vous nous avez précédemment contacté
                                            via notre website. Voici la réponse
                                            que nous pouvons vous
                                            apporter.&nbsp;
                                          </h4>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="758a76b1-721a-4e60-9156-470c544a49de"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding: 18px 0px 18px 0px;
                                          line-height: 22px;
                                          text-align: inherit;
                                        "
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            <strong>${body.response}</strong>
                                          </div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="8edc8d61-ed26-4370-8cae-a44d4825d805"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding: 18px 0px 18px 0px;
                                          line-height: 22px;
                                          text-align: inherit;
                                        "
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: start;
                                            "
                                          >
                                            <br />
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: left;
                                            "
                                          >
                                            <span
                                              style="
                                                font-style: normal;
                                                font-variant-caps: normal;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                text-align: start;
                                                text-indent: 0px;
                                                text-transform: none;
                                                word-spacing: 0px;
                                                -webkit-text-stroke-width: 0px;
                                                text-decoration-line: none;
                                                line-height: 18px;
                                                white-space: pre;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 14px;
                                              "
                                              >Nous vous remercions de votre
                                              intérêt et espérons que notre
                                              réponse vous
                                              convienne.&nbsp;</span
                                            >
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: left;
                                            "
                                          >
                                            <span
                                              style="
                                                font-style: normal;
                                                font-variant-caps: normal;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                text-align: start;
                                                text-indent: 0px;
                                                text-transform: none;
                                                word-spacing: 0px;
                                                -webkit-text-stroke-width: 0px;
                                                text-decoration-line: none;
                                                line-height: 18px;
                                                white-space: pre;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 14px;
                                              "
                                              >N'hésitez pas à nous contacter
                                              pour toute autre question. A
                                              bientôt.</span
                                            >
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: left;
                                            "
                                          >
                                            <br />
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: left;
                                            "
                                          >
                                            <span
                                              style="
                                                font-style: normal;
                                                font-variant-caps: normal;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                text-align: start;
                                                text-indent: 0px;
                                                text-transform: none;
                                                word-spacing: 0px;
                                                -webkit-text-stroke-width: 0px;
                                                text-decoration-line: none;
                                                line-height: 18px;
                                                white-space: pre;
                                                font-family: arial, helvetica,
                                                  sans-serif;
                                                font-size: 14px;
                                              "
                                              ><strong
                                                >L'équipe du Garage
                                                Parrot.</strong
                                              ></span
                                            >
                                          </div>
                                          <div></div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  class="module"
                                  role="module"
                                  data-type="text"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="table-layout: fixed"
                                  data-muid="1a1f2750-2e2b-4e32-a98f-18ce44f5d3db"
                                  data-mc-module-version="2019-10-22"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="
                                          padding: 18px 0px 18px 0px;
                                          line-height: 22px;
                                          text-align: inherit;
                                        "
                                        height="100%"
                                        valign="top"
                                        bgcolor=""
                                        role="module-content"
                                      >
                                        <div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            <span
                                              style="
                                                font-size: 12px;
                                                color: #585858;
                                              "
                                              >Votre message envoyé le
                                              ${body.sendDate}.</span
                                            >
                                          </div>
                                          <div
                                            style="
                                              font-family: inherit;
                                              text-align: inherit;
                                            "
                                          >
                                            <span
                                              style="
                                                font-size: 12px;
                                                color: #585858;
                                              "
                                              >${body.message}</span
                                            >
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
`;

    await sendgrid.send({
      to: "come.chevallier@icloud.com", // Your email where you'll receive emails
      from: "come.chevallier@icloud.com", // your website email address here
      subject: `[Réponse] : ${body.subject}`,
      html: templateEmail,
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.statusCode || 500,
    });
  }

  return new NextResponse(JSON.stringify({ error: null }), { status: 200 });
}
