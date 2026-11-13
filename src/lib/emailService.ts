export interface LeadEmailPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source: string;
  utms?: { source?: string; campaign?: string; medium?: string } | null;
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

/**
 * Envia os dados do lead diretamente pelo frontend via EmailJS (@emailjs/browser).
 * Carrega o SDK sob demanda no momento do envio e nunca lança exceção para não
 * interromper a gravação no Firestore nem o fluxo de conversão do usuário.
 */
export async function sendLeadEmail(payload: LeadEmailPayload): Promise<boolean> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error(
      "EmailJS não configurado: defina VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID e VITE_EMAILJS_PUBLIC_KEY no arquivo .env"
    );
    return false;
  }

  try {
    const emailjs = (await import("@emailjs/browser")).default;
    const templateParams = {
      to_email: "sonusproaudio@gmail.com",
      from_name: payload.name || "Não informado",
      from_email: payload.email || "Não informado",
      phone: payload.phone || "Não informado",
      message: payload.message || "Sem mensagem adicional",
      source: payload.source,
      utms: payload.utms ? JSON.stringify(payload.utms) : "Direto / Orgânico",
      page_url: typeof window !== "undefined" ? window.location.href : "",
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    });
    return true;
  } catch (error) {
    console.error("Erro ao enviar e-mail via EmailJS:", error);
    return false;
  }
}
