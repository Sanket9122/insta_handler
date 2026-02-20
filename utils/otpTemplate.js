const getOtpTemplate = (otp, username = "User") => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="500" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:10px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0; color:#333;">🔐 OTP Verification</h2>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="color:#555; font-size:16px; padding-bottom:20px;">
                Hi <strong>${username}</strong>,<br/><br/>
                We received a request to verify your account. Please use the OTP below to continue.
              </td>
            </tr>

            <!-- OTP Box -->
            <tr>
              <td align="center" style="padding:20px 0;">
                <div style="
                  font-size:28px;
                  font-weight:bold;
                  letter-spacing:6px;
                  color:#ffffff;
                  background:#4f46e5;
                  display:inline-block;
                  padding:15px 30px;
                  border-radius:8px;
                ">
                  ${otp}
                </div>
              </td>
            </tr>

            <!-- Expiry Info -->
            <tr>
              <td style="color:#777; font-size:14px; padding-top:10px;">
                This OTP is valid for <strong>5 minutes</strong>.<br/>
                Do not share this code with anyone.
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:25px 0;">
                <hr style="border:none; border-top:1px solid #eee;" />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="color:#999; font-size:12px; text-align:center;">
                If you did not request this, please ignore this email.<br/>
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

module.exports = getOtpTemplate;