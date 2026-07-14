export async function onRequestPost({ request, env }) {
  try {
    // 1. Validar Origem (CORS Básico)
    const origin = request.headers.get("Origin") || "";
    const isLocalhost = origin.startsWith("http://localhost:");
    if (origin && origin !== "https://sonusproaudio.com.br" && !origin.endsWith(".sonusproaudio.com.br") && !isLocalhost) {
      return new Response(JSON.stringify({ error: "Origem não autorizada." }), { status: 403, headers: { "Content-Type": "application/json" } });
    }

    const data = await request.json();
    const { name, phone, email, message, turnstileToken, honeypot, churchName, role, capacity, source, utms } = data;

    // Honeypot invisível para pegar bots estúpidos
    if (honeypot) {
       console.log("Bot pego no honeypot.");
       return new Response(JSON.stringify({ message: "E-mail enviado com sucesso" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    // 2. Filtro Anti-Spam de Palavras-Chave (Proteção contra bots que usam bypass)
    const lowerMessage = (message || "").toLowerCase();
    const spamKeywords = [
      "hunter converta", "converta soluções", "prospecção", "seo", "100% automática", 
      "aumentar suas vendas", "marketing digital", "oferecer nossos serviços", 
      "criação de sites", "tráfego pago", "gestão de redes sociais", "gerar leads", 
      "primeira página do google", "terceirização", "banco de dados de empresas",
      "lista de contatos"
    ];
    const isSpam = spamKeywords.some(keyword => lowerMessage.includes(keyword));
    
    if (isSpam) {
      console.log("Spam bloqueado por palavra-chave.");
      return new Response(JSON.stringify({ message: "E-mail enviado com sucesso" }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    // 3. Validação Cloudflare Turnstile
    const TURNSTILE_SECRET_KEY = env.TURNSTILE_SECRET_KEY;
    if (TURNSTILE_SECRET_KEY && turnstileToken && turnstileToken !== "bypass_token") {
      const turnstileFormData = new FormData();
      turnstileFormData.append("secret", TURNSTILE_SECRET_KEY);
      turnstileFormData.append("response", turnstileToken);
      turnstileFormData.append("remoteip", request.headers.get("CF-Connecting-IP") || "");

      const turnstileValidation = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: turnstileFormData,
      });

      const outcome = await turnstileValidation.json();
      if (!outcome.success) {
        return new Response(JSON.stringify({ error: "Falha na verificação de segurança (Bot detectado)." }), { status: 403, headers: { "Content-Type": "application/json" } });
      }
    } else {
      console.warn("Atenção: TURNSTILE_SECRET_KEY não configurada. Verificação ignorada (Modo Dev).");
    }

    // 3. Sanitização contra XSS Injection
    const sanitizeHTML = (str) => typeof str === 'string' ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
    const safeName = sanitizeHTML(name);
    const safePhone = sanitizeHTML(phone);
    const safeEmail = sanitizeHTML(email);
    const safeMessage = sanitizeHTML(message);
    const safeChurchName = sanitizeHTML(churchName);
    const safeRole = sanitizeHTML(role);
    const safeCapacity = sanitizeHTML(capacity);
    const safeSource = sanitizeHTML(source) || "página inicial";

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
        <p>Você recebeu uma nova solicitação de contato pelo formulário da <strong>${safeSource}</strong>.</p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 10px;"><strong>Nome:</strong> ${safeName}</li>
          <li style="margin-bottom: 10px;"><strong>E-mail:</strong> ${safeEmail}</li>
          <li style="margin-bottom: 10px;"><strong>Telefone/WhatsApp:</strong> ${safePhone}</li>
          ${safeChurchName ? `<li style="margin-bottom: 10px;"><strong>Igreja/Templo:</strong> ${safeChurchName}</li>` : ""}
          ${safeRole ? `<li style="margin-bottom: 10px;"><strong>Cargo:</strong> ${safeRole}</li>` : ""}
          ${safeCapacity ? `<li style="margin-bottom: 10px;"><strong>Capacidade Aprox.:</strong> ${safeCapacity}</li>` : ""}
        </ul>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p style="margin: 0; font-weight: bold;">Descrição do Projeto:</p>
          <p style="margin-top: 10px; white-space: pre-wrap;">${safeMessage}</p>
        </div>
        ${utms ? `
        <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #2980b9;">
          <p style="margin: 0; font-weight: bold; color: #2980b9;">🎯 Origem da Campanha (UTM)</p>
          <ul style="list-style: none; padding: 0; margin-top: 10px;">
            <li style="margin-bottom: 5px;"><strong>Fonte (Source):</strong> ${sanitizeHTML(utms.source) || 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>Campanha (Campaign):</strong> ${sanitizeHTML(utms.campaign) || 'N/A'}</li>
            <li style="margin-bottom: 5px;"><strong>Mídia (Medium):</strong> ${sanitizeHTML(utms.medium) || 'N/A'}</li>
          </ul>
        </div>
        ` : ''}
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
        reply_to: safeEmail,
        subject: `Novo Contato do Site: ${safeName} - Projeto Audiovisual`,
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
