import { createTransporter } from './mailer';
import type { User } from '@shared/schema';

export interface EmailConfig {
  adminEmail: string;
  appName: string;
  appUrl: string;
}

const config: EmailConfig = {
  adminEmail: process.env.ADMIN_EMAIL || 'wahidmans007@gmail.com',
  appName: 'OncoVista AI',
  appUrl: process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : 'http://localhost:5000'
};

export async function sendUserRegistrationEmail(user: User, approvalToken: string): Promise<boolean> {
  try {
    const transporter = await createTransporter();
    
    const approvalUrl = `${config.appUrl}/admin/approve/${approvalToken}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .user-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
          .approve-button { 
            display: inline-block; 
            background: #16a34a; 
            color: white; 
            padding: 12px 30px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: bold;
            margin: 10px 0;
          }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New User Registration - ${config.appName}</h1>
          </div>
          
          <div class="content">
            <h2>A new user has registered and requires approval</h2>
            
            <div class="user-info">
              <h3>User Details:</h3>
              <p><strong>Name:</strong> ${user.firstName || 'Not provided'} ${user.lastName || ''}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Role:</strong> ${user.role || 'Oncologist'}</p>
              <p><strong>Department:</strong> ${user.department || 'Not specified'}</p>
              <p><strong>Registration Time:</strong> ${new Date(user.createdAt!).toLocaleString()}</p>
            </div>
            
            <p>Please review this registration and take appropriate action:</p>
            
            <a href="${approvalUrl}" class="approve-button">
              Review & Approve User →
            </a>
            
            <p><small>Or copy this link to your browser:<br>
            <code>${approvalUrl}</code></small></p>
            
            <div class="footer">
              <p>This is an automated notification from ${config.appName}</p>
              <p>User ID: ${user.id}</p>
              <p>Approval Token: ${approvalToken}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
      New User Registration - ${config.appName}
      
      A new user has registered and requires approval:
      
      User Details:
      - Name: ${user.firstName || 'Not provided'} ${user.lastName || ''}
      - Email: ${user.email}
      - Role: ${user.role || 'Oncologist'}
      - Department: ${user.department || 'Not specified'}
      - Registration Time: ${new Date(user.createdAt!).toLocaleString()}
      
      Approval URL: ${approvalUrl}
      
      User ID: ${user.id}
      Approval Token: ${approvalToken}
    `;

    const mailOptions = {
      from: `"${config.appName}" <noreply@oncovistaai.com>`,
      to: config.adminEmail,
      subject: `New User Registration: ${user.email}`,
      text: textContent,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Registration email sent to admin for user: ${user.email}`);
    return true;
  } catch (error) {
    console.error('Failed to send registration email:', error);
    return false;
  }
}

export async function sendApprovalNotificationEmail(user: User): Promise<boolean> {
  try {
    const transporter = await createTransporter();
    
    const loginUrl = `${config.appUrl}/api/login`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #16a34a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .welcome-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a; }
          .login-button { 
            display: inline-block; 
            background: #2563eb; 
            color: white; 
            padding: 12px 30px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: bold;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Account Approved - Welcome to ${config.appName}!</h1>
          </div>
          
          <div class="content">
            <div class="welcome-box">
              <h2>Great news, ${user.firstName || 'Doctor'}!</h2>
              <p>Your account has been approved and you now have full access to ${config.appName}.</p>
            </div>
            
            <p>You can now access all features including:</p>
            <ul>
              <li>Comprehensive oncology guidelines and protocols</li>
              <li>AI-powered clinical decision support</li>
              <li>Educational modules and training resources</li>
              <li>Treatment planning tools and calculators</li>
            </ul>
            
            <a href="${loginUrl}" class="login-button">
              Login to ${config.appName} →
            </a>
            
            <p>If you have any questions or need assistance, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"${config.appName}" <noreply@oncovistaai.com>`,
      to: user.email,
      subject: `Welcome to ${config.appName} - Account Approved!`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Approval notification sent to user: ${user.email}`);
    return true;
  } catch (error) {
    console.error('Failed to send approval notification:', error);
    return false;
  }
}