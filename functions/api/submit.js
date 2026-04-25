export async function onRequestPost({ request, env }) {
  try {
    // 1. Intercept the incoming form data
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // 2. Transmit the data to Resend's API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "CTS Command <onboarding@resend.dev>",
        to: "Carrillo.giovanni215+CarrilloTech@outlook.com", 
        subject: `[CTS Deployment] ${data.objective || 'New Ticket'}`,
        html: `
          <h2>Secure Dispatch Received</h2>
          <hr>
          <p><strong>Operator:</strong> ${data.operator_name}</p>
          <p><strong>Contact:</strong> ${data.contact_verification}</p>
          <p><strong>Objective:</strong> ${data.objective}</p>
          <p><strong>Specs:</strong> ${data.specs}</p>
          <p><strong>Brief:</strong> ${data.brief}</p>
        `
      })
    });

    // 3. Confirm transmission and redirect the client
    if (response.ok) {
      return Response.redirect("https://carrillotech.pages.dev/?status=signal_received", 303);
    }
    
    return new Response("Signal Failure. API Rejected.", { status: 500 });

  } catch (err) {
    return new Response("Critical System Error during decryption.", { status: 400 });
  }
}
