/**
 * Utilitário central para rastreamento de eventos no Meta Pixel (Facebook) e Google DataLayer.
 * Garante consistência em todas as páginas e evita erros caso os scripts de terceiros sejam bloqueados.
 */

// Helper interno seguro para disparar FBQ
function safeFbq(action: string, eventName: string, params?: Record<string, any>) {
  try {
    if (typeof (window as any).fbq === 'function') {
      if (params) {
        (window as any).fbq(action, eventName, params);
      } else {
        (window as any).fbq(action, eventName);
      }
    }
  } catch (err) {
    console.warn('Meta Pixel blocked or unavailable.', err);
  }
}

// Helper interno seguro para disparar DataLayer
function pushDataLayer(eventObj: Record<string, any>) {
  try {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(eventObj);
  } catch (err) {
    console.warn('DataLayer blocked or unavailable.', err);
  }
}

/**
 * Disparado quando o usuário inicia o preenchimento de um formulário.
 */
export function trackFormStart(formId: string, pageName: string) {
  pushDataLayer({ event: 'form_interact', field: formId, page: pageName });
  safeFbq('trackCustom', 'Form_Start', { form_id: formId, page_name: pageName });
}

/**
 * Disparado quando um Lead é convertido com sucesso (formulário enviado).
 */
export function trackLeadConversion(leadType: string, value: number = 500, currency: string = 'BRL') {
  pushDataLayer({ event: 'generate_lead', lead_type: leadType, value, currency });
  safeFbq('track', 'Lead', { content_name: leadType, value, currency });
}

/**
 * Disparado em cliques de botões de WhatsApp, diferenciando origem (flutuante vs botão da página).
 */
export function trackWhatsAppClick(sourceId: 'whatsapp_flutuante' | 'whatsapp_hero' | 'whatsapp_urgente' | 'whatsapp_footer', pageName: string) {
  pushDataLayer({ event: 'click_whatsapp', source: sourceId, page: pageName });
  safeFbq('track', 'Contact', { content_name: sourceId, content_category: pageName });
}

/**
 * Disparado para intenções profundas de páginas específicas (Remarketing Customizado).
 */
export function trackPageIntent(intentName: 'Intent_Qsys' | 'Intent_Corporativo' | 'Intent_Auditorios' | 'Intent_Igrejas') {
  pushDataLayer({ event: 'page_intent', intent_type: intentName });
  safeFbq('trackCustom', intentName);
}

/**
 * Disparado para cliques genéricos de contato, como copiar email ou telefone.
 */
export function trackContactCopy(contactType: 'phone' | 'email') {
  pushDataLayer({ event: 'copy_contact_info', contact_type: contactType });
  safeFbq('track', 'FindLocation', { content_name: contactType });
}

/**
 * Disparado quando o usuário clica no botão principal de orcamento do menu.
 */
export function trackNavCTA(deviceType: 'Menu_Desktop' | 'Menu_Mobile') {
  pushDataLayer({ event: 'click_orcamento_menu', source_path: window.location.pathname });
  safeFbq('track', 'Contact', { content_name: deviceType });
}

/**
 * Disparado quando um usuário visualiza um conteúdo importante (ex: Filtros do Portfólio, Cards da Home).
 */
export function trackViewContent(category: string, contentName?: string) {
  pushDataLayer({ event: 'view_content_custom', category, content_name: contentName });
  safeFbq('track', 'ViewContent', { content_category: category, content_name: contentName });
}

/**
 * Disparado para interações com simuladores e customização (ex: Dashboard Q-SYS).
 */
export function trackCustomizeProduct(toolName: string, actionDetails: string) {
  pushDataLayer({ event: 'interact_tool', tool_name: toolName, details: actionDetails });
  safeFbq('track', 'CustomizeProduct', { content_name: toolName, content_category: actionDetails });
}
