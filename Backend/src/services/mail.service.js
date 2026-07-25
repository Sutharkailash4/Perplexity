// import dotenv from "dotenv";
// import nodemailer from "nodemailer";

// dotenv.config();

// const {
//   GOOGLE_USER,
//   EMAIL_PASSWORD,
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_REFRESH_TOKEN,
// } = process.env;

// if (!GOOGLE_USER) {
//   throw new Error("Missing environment variable: GOOGLE_USER");
// }

// const auth = EMAIL_PASSWORD
//   ? {
//       user: GOOGLE_USER,
//       pass: EMAIL_PASSWORD,
//     }
//   : {
//       type: "OAuth2",
//       user: GOOGLE_USER,
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       refreshToken: GOOGLE_REFRESH_TOKEN,
//     };

// if (!EMAIL_PASSWORD && (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN)) {
//   throw new Error(
//     "Missing Gmail auth configuration. Set EMAIL_PASSWORD or provide GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN."
//   );
// }

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth,
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Mail transporter verify failed:", error);
//   } else {
//     console.log("Mail transporter is ready");
//   }
// });

// export const sendEmail = async ({ to, subject, html, text }) => {
//   if (!to || !subject || (!html && !text)) {
//     throw new Error("sendEmail requires 'to', 'subject', and either 'html' or 'text'.");
//   }

//   const mailOptions = {
//     from: GOOGLE_USER,
//     to,
//     subject,
//     html,
//     text,
//   };

//   const details = await transporter.sendMail(mailOptions);
//   console.log("Email sent:", details.messageId || details.response);
//   return details;
// };