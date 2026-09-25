import fs from 'fs';

const path = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(path, 'utf8');

const formComponentCode = `
// ─── Componente de Formulário Isolado para Performance ───
const PlenariosForm = memo(function PlenariosForm() {
  const [formData, setFormData] = useState({ name: "", role: "", email: "", phone: "", message: "", honeypot: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setIsSubmitting(true);

    try {
      const utms = JSON.parse(localStorage.getItem('sonus_utms') || 'null')
      
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Landing Page Plenários',
          utms
        })
      })

      if (response.ok) {
        const resData = await response.json().catch(() => ({}));
        
        if (typeof window !== 'undefined') {
          (window as any).dataLayer = (window as any).dataLayer || [];
          if (typeof (window as any).trackLeadConversion === 'function') {
            (window as any).trackLeadConversion('form_plenarios', 500, 'BRL');
          }
        }
        
        logLead({
          type: 'form',
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          source: 'Landing Page Plenários',
          city: resData.geo?.city || 'Desconhecida',
          region: resData.geo?.region || 'Desconhecida',
          country: resData.geo?.country || 'BR',
          device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          timestamp: Date.now(),
          utms
        });

        setIsSuccess(true);
        setFormData({ name: "", role: "", email: "", phone: "", message: "", honeypot: "" });
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl" style={{ willChange: 'transform' }}>
      {isSuccess ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Solicitação Recebida!</h3>
          <p className="text-zinc-400">Nossa equipe técnica entrará em contato em breve para agendar uma reunião de alinhamento do projeto.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="honeypot" className="hidden" value={formData.honeypot} onChange={e => setFormData({...formData, honeypot: e.target.value})} tabIndex={-1} autoComplete="off" />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Nome do Contato</label>
              <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="João da Silva" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Órgão Público / Cargo</label>
              <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Câmara Municipal de..." value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">E-mail Institucional</label>
              <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="joao@camara.leg.br" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Telefone / WhatsApp</label>
              <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="(00) 00000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Resumo da Necessidade</label>
            <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Ex: Precisamos modernizar o áudio do plenário e implementar votação eletrônica..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
            {isSubmitting ? "Processando..." : "Solicitar Contato Técnico"}
          </Button>
        </form>
      )}
    </div>
  )
});
`;

const mainExportIndex = content.indexOf('export function PlenariosLanding() {');
if (mainExportIndex !== -1) {
  content = content.substring(0, mainExportIndex) + formComponentCode + '\n\n' + content.substring(mainExportIndex);
}

// Add Loader2 to imports if needed, actually I replaced Loader2 with text in my form block above to avoid import issues!
// Wait, in my JSX above I put "Processando..." directly without the Loader2 icon to save importing it.

// Fix the unused import 'Loader2' from previous build error:
content = content.replace('Loader2, ', '');

fs.writeFileSync(path, content, 'utf8');
console.log('Inserted PlenariosForm successfully!');
