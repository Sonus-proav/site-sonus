export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { name, phone, email, message } = data;

    // A chave da API do Resend deve ser configurada nas Variáveis de Ambiente do Cloudflare Pages
    const RESEND_API_KEY = env.RESEND_API_KEY;
    // Para testar rapidamente sem domínio verificado, o Resend usa 'onboarding@resend.dev'
    const RESEND_FROM = env.RESEND_FROM || "onboarding@resend.dev";

    if (!RESEND_API_KEY) {
      console.warn("Atenção: RESEND_API_KEY não configurada. E-mail simulado.");
      return new Response(JSON.stringify({ message: "Mock: E-mail processado (Variável ausente)." }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const htmlContent = `
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
        <p style="font-size: 12px; color: #999;">Este é um e-mail automático enviado pelo sistema Cloudflare Pages via Resend.</p>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Site Sonus <${RESEND_FROM}>`,
        to: "sonusproaudio@gmail.com",
        reply_to: email,
        subject: `Novo Contato do Site: ${name} - Projeto Audiovisual`,
        html: htmlContent
      })
    });

    if (!resendRes.ok) {
      const errorData = await resendRes.json();
      throw new Error(`Resend Error: ${JSON.stringify(errorData)}`);
    }

    return new Response(JSON.stringify({ message: "E-mail enviado com sucesso" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Erro ao enviar e-mail via Resend:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao processar o envio.", details: error.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
