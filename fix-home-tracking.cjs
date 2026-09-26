const fs = require('fs');

let home = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Remove double Navbar
home = home.replace('<Navbar />', '{/* Navbar is rendered by AppLayout */}');

// Add GTM Tracking to buttons in Hero
home = home.replace(
  'className="group relative w-full sm:w-auto inline-flex',
  'onClick={() => { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "navigate_projetos_hero" }); }} className="group relative w-full sm:w-auto inline-flex'
);

home = home.replace(
  'className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 text-zinc-300',
  'onClick={() => { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: "navigate_solucoes_hero" }); }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 text-zinc-300'
);

// Add WhatsApp proper tracking (geo + firebase) to the hero WhatsApp button
// Since it's inside the component, we can use an onClick that calls getUserGeo and logLead.
// But we need to make sure the imports are there. `logLead` is imported. Let's add `getUserGeo` to the import.
if (!home.includes('getUserGeo')) {
  home = home.replace('import { logLead } from "@/lib/analytics"', 'import { logLead, getUserGeo } from "@/lib/analytics"');
}

// Replace the <a> with a <button> that does the correct tracking
const oldWa = `<a href="https://wa.me/5546920013151" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-xs lg:text-sm transition-all duration-300 hover:-translate-y-1">
                      Falar com Especialistas
                    </a>`;
const newWa = `<button onClick={() => {
                      (window as any).dataLayer = (window as any).dataLayer || [];
                      (window as any).dataLayer.push({ event: "falar_especialista_hero" });
                      getUserGeo().then(geo => {
                        logLead({
                          type: 'whatsapp',
                          source: 'Página Inicial (Hero)',
                          city: geo.city,
                          region: geo.region,
                          country: geo.country,
                          device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
                          timestamp: Date.now(),
                          whatsappOrigin: 'hero_home'
                        });
                      });
                      window.open("https://wa.me/5546920013151?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista.", "_blank");
                    }} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-xs lg:text-sm transition-all duration-300 hover:-translate-y-1">
                      Falar com Especialistas
                    </button>`;

home = home.replace(oldWa, newWa);

fs.writeFileSync('src/pages/Home.tsx', home);
console.log("Home tracked and double Navbar removed");
