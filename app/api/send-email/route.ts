import sgMail from '@sendgrid/mail';
import { NextRequest, NextResponse } from 'next/server';

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email to your team
    const emailToTeam = {
      to: 'kmusodza@coreledger.ca', // Your email
      from: 'kmusodza@coreledger.ca', // Must be verified sender in SendGrid
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #002C3E;">New Contact Form Submission</h2>
          
          <div style="background: #F5F7F9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          </div>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #0D9488; margin: 20px 0;">
            <h3 style="color: #002C3E; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
          <p style="color: #6B7280; font-size: 14px;">
            This email was sent from the Coreledger Technologies contact form.
          </p>
        </div>
      `,
    };

    // Auto-reply to sender
    const autoReply = {
      to: email,
      from: 'kmusodza@coreledger.ca',
      subject: 'Thank you for contacting Coreledger Technologies',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #002C3E 0%, #0D9488 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Thank You, ${name}!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your message</p>
          </div>
          
          <div style="padding: 30px;">
            <p>Hi ${name},</p>
            <p>Thank you for reaching out to Coreledger Technologies. We've received your message and our team will get back to you within 24 hours during business days.</p>
            
            <div style="background: #F5F7F9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #002C3E; margin-top: 0;">Your Message:</h3>
              <p style="color: #6B7280; font-style: italic;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li><a href="https://contextus.coreledger.ca" style="color: #0D9488;">Try Contextus</a> - Our AI token optimization platform</li>
              <li><a href="https://github.com/coreledger-tech" style="color: #0D9488;">Check out our open-source projects</a></li>
              <li><a href="${process.env.NEXT_PUBLIC_SITE_URL}/podcast" style="color: #0D9488;">Listen to our podcast</a></li>
            </ul>
            
            <p>Best regards,<br>The Coreledger Technologies Team</p>
          </div>
          
          <div style="background: #F5F7F9; padding: 20px; text-align: center; color: #6B7280; font-size: 14px;">
            <p>Vancouver, BC, Canada | <a href="mailto:info@coreledger.ca" style="color: #0D9488;">info@coreledger.ca</a></p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      sgMail.send(emailToTeam),
      sgMail.send(autoReply)
    ]);

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('SendGrid error:', error);
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
