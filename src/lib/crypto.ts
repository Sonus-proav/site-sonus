/**
 * Utiliza a API nativa de Criptografia Web (Web Crypto API)
 * para gerar um Hash SHA-256 irreversível da senha fornecida.
 */
export async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// O Hash oficial da senha da Sonus Master (P@iefilho2!)
export const MASTER_HASH = "ebbfd933c1e9f92190821ebb352e00b440e99f9c77714324aeff42567106738b";
