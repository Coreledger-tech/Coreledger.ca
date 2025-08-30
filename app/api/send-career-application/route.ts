import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Configure SendGrid
if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY environment variable is required');
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, superpower, message } = body;

    // Validate required fields
    if (!name || !email || !superpower) {
      return NextResponse.json(
        { error: 'Name, email, and superpower are required fields' },
        { status: 400 }
      );
    }

    // Email to the team
    const emailToTeam = {
      to: 'kmusodza@coreledger.ca',
      from: 'kmusodza@coreledger.ca', // This must be a verified sender
      subject: 'Career Application Form - New Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0D9488 0%, #002C3E 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">New Career Application</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Someone wants to join the team!</p>
          </div>
          
          <div style="background: #f8fafc; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h2 style="color: #002C3E; margin: 0 0 20px 0; font-size: 20px;">Application Details</h2>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #0D9488; margin: 0 0 5px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</h3>
                <p style="margin: 0; color: #334155; font-size: 16px; font-weight: 500;">${name}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #0D9488; margin: 0 0 5px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</h3>
                <p style="margin: 0; color: #334155; font-size: 16px;">
                  <a href="mailto:${email}" style="color: #0D9488; text-decoration: none;">${email}</a>
                </p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #0D9488; margin: 0 0 5px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Superpower</h3>
                <p style="margin: 0; color: #334155; font-size: 16px; font-weight: 500; background: #f1f5f9; padding: 15px; border-radius: 8px; border-left: 4px solid #0D9488;">${superpower}</p>
              </div>
              
              ${message ? `
              <div style="margin-bottom: 20px;">
                <h3 style="color: #0D9488; margin: 0 0 5px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Additional Details</h3>
                <p style="margin: 0; color: #334155; font-size: 16px; line-height: 1.6; white-space: pre-wrap; background: #f8fafc; padding: 15px; border-radius: 8px;">${message}</p>
              </div>
              ` : ''}
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #64748b; font-size: 14px; text-align: center;">
                  Career application submitted on ${new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at ${new Date().toLocaleTimeString('en-US')}
                </p>
              </div>
            </div>
          </div>
          
          <div style="background: #002C3E; padding: 20px; text-align: center;">
            <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 12px;">
              Coreledger Technologies • Career Application System
            </p>
          </div>
        </div>
      `,
    };

    // Auto-reply to the applicant
    const autoReply = {
      to: email,
      from: 'kmusodza@coreledger.ca', // This must be a verified sender
      subject: 'Thanks for your interest in Coreledger Technologies!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0D9488 0%, #002C3E 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thanks for Applying!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">We're excited to learn about your superpower</p>
          </div>
          
          <div style="background: #f8fafc; padding: 40px 20px;">
            <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h2 style="color: #002C3E; margin: 0 0 20px 0;">Hi ${name}!</h2>
              
              <p style="color: #334155; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for your interest in joining Coreledger Technologies! We've received your application and are excited to learn more about your superpower: <strong>"${superpower}"</strong>
              </p>
              
              <p style="color: #334155; line-height: 1.6; margin: 0 0 20px 0;">
                We're still in the early stages of building our team, but we're always interested in connecting with exceptional people who share our passion for building developer-first AI tools.
              </p>
              
              <div style="background: #f1f5f9; border-left: 4px solid #0D9488; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #0D9488; margin: 0 0 10px 0; font-size: 16px;">What happens next?</h3>
                <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Our team will review your application carefully</li>
                  <li>If there's a potential fit, we'll reach out for a conversation</li>
                  <li>We'll keep your information on file for future opportunities</li>
                </ul>
              </div>
              
              <p style="color: #334155; line-height: 1.6; margin: 0 0 20px 0;">
                In the meantime, feel free to check out our work on <a href="https://github.com/Coreledger-tech" style="color: #0D9488; text-decoration: none;">GitHub</a> or follow our journey on <a href="https://www.linkedin.com/company/core-ledger-technology/" style="color: #0D9488; text-decoration: none;">LinkedIn</a>.
              </p>
              
              <p style="color: #334155; line-height: 1.6; margin: 0;">
                Thanks again for your interest!<br>
                <strong>The Coreledger Team</strong>
              </p>
            </div>
          </div>
          
          <div style="background: #002C3E; padding: 20px; text-align: center;">
            <p style="color: rgba(255,255,255,0.7); margin: 0 0 5px 0; font-size: 12px;">
              Coreledger Technologies
            </p>
            <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 11px;">
              Building the future of intelligent software infrastructure
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      sgMail.send(emailToTeam),
      sgMail.send(autoReply)
    ]);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending career application:', error);
    return NextResponse.json(
      { error: 'Failed to send application' },
      { status: 500 }
    );
  }
}
