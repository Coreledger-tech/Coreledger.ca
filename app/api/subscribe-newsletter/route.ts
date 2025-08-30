import { NextRequest, NextResponse } from 'next/server';

const mailchimp = require('@mailchimp/mailchimp_marketing');

// Configure Mailchimp
if (!process.env.MAILCHIMP_API_KEY) {
  throw new Error('MAILCHIMP_API_KEY environment variable is required');
}
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX || 'us18', // e.g., 'us18'
});

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Debug logging
    console.log('Mailchimp Config:', {
      apiKey: process.env.MAILCHIMP_API_KEY ? 'Set' : 'Not set',
      server: process.env.MAILCHIMP_SERVER_PREFIX || 'us18'
    });

    // Mailchimp Audience ID
    const listId = '330a91fc78';

    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName || '',
        LNAME: lastName || '',
      },
    });

    console.log('Mailchimp subscription successful:', response);

    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter!',
        id: response.id 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Mailchimp subscription error:', error);

    // Handle specific Mailchimp errors
    if (error.status === 400 && error.title === 'Member Exists') {
      return NextResponse.json(
        { error: 'You are already subscribed to our newsletter!' },
        { status: 400 }
      );
    }

    if (error.status === 400 && error.title === 'Invalid Resource') {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to subscribe to newsletter. Please try again later.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
