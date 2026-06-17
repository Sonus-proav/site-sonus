import nodemailer from "nodemailer";

export const handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "OK"
    };
  }

  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, phone, email, message } = data;

    // Transporte do Nodemailer
    // Nota para a Sonus: Configurar as variáveis de ambiente no painel da Netlify
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Senha de App do Gmail
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER || '"Site Sonus" <no-reply@sonus.com.br>',
      to: "sonusproaudio@gmail.com", // E-mail fornecido
      replyTo: email,
      subject: `Novo Contato do Site: ${name} - Projeto Audiovisual`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #2980b9;">Novo Lead B2B - Site Sonus</h2>
          <p>Você recebeu uma nova solicitação de contato pelo formulário principal da página inicial.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Nome:</strong> ${name}</li>
            <li style="margin-bottom: 10px;"><strong>E-mail:</strong> ${email}</li>
            <li style="margin-bottom: 10px;"><strong>Telefone/WhatsApp:</strong> ${phone}</li>
          </ul>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold;">Descrição do Projeto:</p>
            <p style="margin-top: 10px; white-space: pre-wrap;">${message}</p>
          </div>
          <br/>
          <p style="font-size: 12px; color: #999;">Este é um e-mail automático enviado pelo sistema Netlify Functions.</p>
        </div>
      `,
    };

    // Caso não haja variáveis de ambiente setadas (ambiente de desenvolvimento local sem .env), 
    // a gente simula o sucesso para não travar o frontend
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("Atenção: SMTP_USER e SMTP_PASS não configurados. E-mail não enviado de verdade.");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Mock: E-mail processado (Variáveis ausentes)." })
      };
    }

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "E-mail enviado com sucesso" })
    };
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Erro interno ao processar o envio.", details: error.toString() })
    };
  }
};
