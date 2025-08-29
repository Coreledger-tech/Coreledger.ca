// Test the contact form API endpoint
const testContactForm = async () => {
  console.log('Testing contact form API...');
  
  const testData = {
    name: 'Test User',
    email: 'user@example.com',
    company: 'Test Company',
    message: 'This is a test message from the contact form API endpoint.'
  };

  try {
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ SUCCESS! Contact form test passed');
      console.log('Response:', result);
    } else {
      const error = await response.json();
      console.error('❌ ERROR response:', error);
    }
  } catch (error) {
    console.error('❌ ERROR testing contact form:', error.message);
  }
};

// Give the dev server a moment to start
setTimeout(testContactForm, 3000);
