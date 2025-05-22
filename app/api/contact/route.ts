import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function addToEmailOctopus(email: string) {
  const EMAILOCTOPUS_API_URL = 'https://emailoctopus.com/api/1.6';
  const API_KEY = process.env.EMAILOCTOPUS_API_KEY;
  const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

  const response = await fetch(
    `${EMAILOCTOPUS_API_URL}/lists/${LIST_ID}/contacts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: API_KEY,
        email_address: email,
        status: 'SUBSCRIBED',
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    // EmailOctopus returns a 400 status with a specific error code when email exists
    if (data.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
      throw new Error('This email is already subscribed to our mailing list!');
    }
    throw new Error(data.error?.message || 'Failed to add to mailing list');
  }

  return data;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    try {
      // First, try to add to EmailOctopus list
      await addToEmailOctopus(email);
      console.log('Added to EmailOctopus:', email);

      // If successful, send the welcome emails
      const thankyouEmail = await resend.emails.send({
        from: 'Hollow Peak <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to Hollow Peak Updates! 🎸',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank you for subscribing!</h2>
            
            <p>Hey there,</p>
            
            <p>Welcome to the Hollow Peak family! We're thrilled to have you join our community. 
            You'll be the first to know about:</p>
            
            <ul>
              <li>New music releases</li>
              <li>Upcoming shows and tour dates</li>
              <li>Behind-the-scenes content</li>
              <li>Exclusive fan content</li>
            </ul>
            
            <p>Stay tuned for updates!</p>
            
            <p>Rock on,<br>
            Hollow Peak</p>
          </div>
        `,
      });

      console.log('Thank you email sent:', thankyouEmail);

      // Send notification to admin
      const adminEmail = await resend.emails.send({
        from: 'Hollow Peak <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL || 'morgan.sigland@gmail.com',
        subject: 'New Mailing List Subscriber',
        html: `
          <h2>New Subscriber</h2>
          <p><strong>Email:</strong> ${email}</p>
        `,
      });

      console.log('Admin notification sent:', adminEmail);

      return NextResponse.json({ success: true });
    } catch (error: any) {
      // If it's already subscribed, return a specific status code
      if (error.message.includes('already subscribed')) {
        return NextResponse.json(
          { error: error.message },
          { status: 409 } // HTTP 409 Conflict
        );
      }
      throw error; // Re-throw other errors to be caught by the outer catch
    }
  } catch (error: any) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
