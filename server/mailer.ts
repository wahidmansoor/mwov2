import nodemailer from 'nodemailer';

export async function createTransporter() {
  // For production, you would configure with actual SMTP settings
  // For now, using a test account for development
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'ethereal.pass'
    }
  });
}