const fs = require('fs');

let c = fs.readFileSync('src/components/ui/BentoEspecialidades.tsx', 'utf8');

// 1. Add Hint
const regexHeader = /<p className="text-lg text-zinc-400 font-light max-w-md leading-relaxed[^>]+>\s*A arquitetura do seu espaço dita a regra\. Nós construímos o cérebro invisível que dá vida a ele\.\s*<\/p>/;
c = c.replace(
  regexHeader,
  `<div className="flex flex-col items-start md:items-end">
            <p className="text-lg text-zinc-400 font-light max-w-md leading-relaxed border-l md:border-l-0 md:border-r border-white/10 pl-6 md:pl-0 md:pr-6 md:text-right mb-4">
              A arquitetura do seu espaço dita a regra. Nós construímos o cérebro invisível que dá vida a ele.
            </p>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest animate-pulse">
              <span className="hidden lg:inline">Passe o mouse para expandir</span>
              <span className="lg:hidden">Toque para expandir</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
            </div>`
);

// 2. Fix inner container mobile layout
const regexInner = /className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end"/;
c = c.replace(
  regexInner,
  'className={`relative z-10 p-4 lg:p-8 h-full flex ${isActive ? "flex-col justify-end" : "flex-row lg:flex-col items-center lg:items-start justify-start lg:justify-end"}`}'
);

// 3. Fix desktop and mobile titles
// Since I already tried to replace the titles in the previous script and it might have failed, I will use a robust Regex.

const regexTitles = /\{\/\* Título Rotacionado quando colapsado \(Desktop\) \*\/\}.*?\{\/\* Título normal quando colapsado \(Mobile\) \*\/\}.*?<\/div>/s;

if (regexTitles.test(c)) {
  c = c.replace(regexTitles, `                  {/* Título Rotacionado e Indicador (Desktop) */}
                  <div className={\`hidden lg:flex absolute inset-0 flex-col items-center justify-center transition-all duration-500 \${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300'}\`}>
                    <h3 className="text-2xl font-black tracking-widest text-zinc-300 uppercase whitespace-nowrap -rotate-90 mb-32 drop-shadow-xl">{item.title}</h3>
                    <div className="absolute bottom-8 text-cyan-500 animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="m5 19 7-7 7 7"/></svg>
                    </div>
                  </div>

                  {/* Título e Indicador quando colapsado (Mobile) */}
                  <div className={\`flex lg:hidden items-center justify-between w-full transition-all duration-300 ml-4 \${isActive ? 'opacity-0 h-0 hidden' : 'opacity-100 h-auto'}\`}>
                    <h3 className="text-lg font-bold tracking-tight text-zinc-300">{item.title}</h3>
                    <div className="text-cyan-500 animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>`);
} else {
  console.log("Could not find the titles block to replace!");
}

fs.writeFileSync('src/components/ui/BentoEspecialidades.tsx', c);
console.log("UX Fixes applied with robust regex.");
