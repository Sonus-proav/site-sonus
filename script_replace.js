import fs from 'fs';

const filePath = 'src/pages/PlenariosLanding.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const startMarker = '{/* ══════════════════════════════════════════════ */}\n      {/* A SESSÃO PERFEITA — Software Showcase         */}';
const endMarker = '      {/* ══════════════════════════════════════════════ */}\n      {/* DIRECT COMPARISON X-RAY                      */}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newSection = `{/* ══════════════════════════════════════════════ */}
      {/* A SESSÃO PERFEITA — Software Showcase         */}
      {/* ══════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#020202] text-white relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.04)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          
          {/* Section Header */}
          <div className="mb-20 md:mb-28">
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
                Do Cadastro<br/>à Ata Oficial.
              </h2>
            </Reveal>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 mt-8 max-w-2xl font-light leading-relaxed">
                Desenvolvemos uma plataforma exclusiva que conecta o plenário inteiro em uma única tela. 
                O operador gerencia. O sistema executa. A população assiste.
              </p>
            </FadeIn>
          </div>

          {/* ── ACT 1: Before the Session ── */}
          <FadeIn className="mb-20 md:mb-28">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Rendered Mockup: Sessions & Agendas Panel */}
              <div className="relative group order-2 lg:order-1">
                <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="bg-[#0b1120] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-700">
                  {/* App Header */}
                  <div className="bg-[#0f172a] px-4 md:px-6 py-3 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center"><span className="text-[8px] text-blue-400">🏛</span></div>
                      <span className="text-[10px] md:text-xs text-zinc-300 font-semibold tracking-wide">Câmara Municipal | Painel de Configuração</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[8px] text-zinc-500 font-mono">Sair</div>
                  </div>
                  {/* Tabs */}
                  <div className="px-4 md:px-6 pt-3 flex gap-4 border-b border-white/5">
                    <span className="text-[10px] md:text-xs text-zinc-500 pb-2.5 font-medium">Vereadores</span>
                    <span className="text-[10px] md:text-xs text-white pb-2.5 font-bold border-b-2 border-blue-500">Sessões & Pautas</span>
                    <span className="text-[10px] md:text-xs text-zinc-500 pb-2.5 font-medium">Relatórios</span>
                  </div>
                  {/* Content */}
                  <div className="p-4 md:p-6 space-y-4">
                    {/* Config block */}
                    <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-3 md:p-4">
                      <span className="text-[9px] md:text-[10px] text-blue-400 font-bold flex items-center gap-1.5">⚙ Configurações Gerais</span>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-[10px] md:text-xs text-white font-medium">CARLOS - PL</div>
                        <div className="bg-blue-600 text-white text-[9px] md:text-[10px] font-bold px-3 py-2 rounded-lg">Salvar</div>
                      </div>
                    </div>
                    {/* Session card */}
                    <div className="bg-[#0f172a] border border-blue-500/20 rounded-xl overflow-hidden">
                      <div className="bg-blue-600/20 px-3 md:px-4 py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] md:text-xs text-white font-bold">10ª Sessão Ordinária</span>
                          <span className="bg-green-500/20 text-green-400 text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded-full">2026-09-24</span>
                        </div>
                      </div>
                      <div className="p-3 md:p-4 space-y-2">
                        <span className="text-[9px] md:text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Pautas (Ordem do Dia):</span>
                        <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2">
                          <span className="w-5 h-5 rounded bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">1</span>
                          <span className="text-[10px] md:text-xs text-white font-semibold flex-1">PAUTA 1 EXEMPLO</span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2">
                          <span className="w-5 h-5 rounded bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">2</span>
                          <span className="text-[10px] md:text-xs text-white font-semibold flex-1">PAUTA 2 EXEMPLO</span>
                        </div>
                      </div>
                    </div>
                    {/* Save button */}
                    <div className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] md:text-xs font-bold py-2.5 rounded-xl text-center transition-colors cursor-default">
                      ☁ Salvar Sessões na Nuvem
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Text */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg tracking-wider">① ANTES DA SESSÃO</span>
                </div>
                <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-light">
                  O assessor abre o painel, seleciona a sessão do dia e organiza as pautas na ordem que o presidente definiu.
                </p>
                <p className="text-lg text-zinc-400 mt-6 leading-relaxed font-light">
                  Mudou um suplente? Troca no cadastro e salva na nuvem. 
                  <strong className="text-white font-medium"> O telão, os microfones e o sistema de votação já sabem.</strong>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ── ACT 2: Session in Progress (Full Width Broadcast Panel) ── */}
          <FadeIn className="mb-20 md:mb-28">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg tracking-wider">② DURANTE A SESSÃO</span>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_60%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Broadcast Panel Mockup */}
              <div className="relative bg-[#080c18] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_60px_rgba(59,130,246,0.15)] transition-all duration-700">
                {/* Top Bar */}
                <div className="bg-[#0a1025] px-4 md:px-8 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-green-500 rounded-full" />
                    <span className="text-[10px] md:text-sm text-white font-black tracking-wider uppercase">Câmara Municipal</span>
                    <span className="text-[9px] md:text-xs text-zinc-500 font-medium hidden sm:inline">Presidente: CARLOS - PL</span>
                  </div>
                  <span className="text-[10px] md:text-sm text-zinc-400 font-mono tabular-nums">19:22:20</span>
                </div>
                
                {/* Session Info Bar */}
                <div className="mx-4 md:mx-8 mt-4 bg-blue-600/15 border border-blue-500/20 rounded-xl px-4 py-2.5">
                  <span className="text-[9px] md:text-[11px] text-blue-300 font-medium">10ª Sessão Ordinária</span>
                  <h4 className="text-sm md:text-xl text-white font-black tracking-tight">PAUTA 1 EXEMPLO</h4>
                </div>

                {/* Main Content */}
                <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Left: Speaker + Timer */}
                  <div className="bg-[#0a0f20] border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] md:text-xs text-zinc-500 font-bold uppercase tracking-[0.2em]">Tribuna (Orador)</span>
                    <h4 className="text-xl md:text-4xl text-white font-black mt-2 tracking-tight">JOTA - PQD</h4>
                    <div className="text-4xl md:text-7xl font-black text-amber-500 font-mono mt-3 tabular-nums" style={{ textShadow: '0 0 20px rgba(245,158,11,0.4)' }}>00:20</div>
                  </div>
                  
                  {/* Right: Voting Panel */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="bg-blue-600 text-white text-center py-2.5 md:py-3 rounded-xl font-black text-sm md:text-lg tracking-wider uppercase">
                      Votação Aberta
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      <div className="bg-[#0a0f20] border border-green-500/20 rounded-xl p-3 md:p-4 text-center">
                        <span className="text-[10px] md:text-xs text-green-400 font-bold tracking-wider">SIM</span>
                        <div className="text-3xl md:text-5xl font-black text-green-400 mt-1 tabular-nums" style={{ textShadow: '0 0 15px rgba(74,222,128,0.4)' }}>3</div>
                      </div>
                      <div className="bg-[#0a0f20] border border-red-500/20 rounded-xl p-3 md:p-4 text-center">
                        <span className="text-[10px] md:text-xs text-red-400 font-bold tracking-wider">NÃO</span>
                        <div className="text-3xl md:text-5xl font-black text-red-500 mt-1 tabular-nums" style={{ textShadow: '0 0 15px rgba(239,68,68,0.4)' }}>1</div>
                      </div>
                      <div className="bg-[#0a0f20] border border-white/5 rounded-xl p-3 md:p-4 text-center">
                        <span className="text-[10px] md:text-xs text-zinc-500 font-bold tracking-wider">ABS</span>
                        <div className="text-3xl md:text-5xl font-black text-zinc-600 mt-1 tabular-nums">0</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Live Votes */}
                <div className="px-4 md:px-8 pb-4 md:pb-6">
                  <span className="text-[8px] md:text-[10px] text-zinc-600 font-mono uppercase tracking-[0.3em] mb-2 block text-center">Votos em Tempo Real</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { seat: 1, name: "JONAS", party: "PT", vote: "SIM", color: "green" },
                      { seat: 2, name: "MARCOS", party: "PL", vote: "SIM", color: "green" },
                      { seat: 3, name: "PAULO", party: "PT", vote: "SIM", color: "green" },
                      { seat: 4, name: "JOTA", party: "PQD", vote: "NÃO", color: "red" },
                    ].map(v => (
                      <div key={v.seat} className={\`bg-[#0a0f20] border rounded-lg p-2 md:p-2.5 \${v.color === 'green' ? 'border-green-500/30' : 'border-red-500/30'}\`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[8px] md:text-[9px] text-zinc-600 font-mono">Assento {v.seat}</span>
                        </div>
                        <span className="text-[10px] md:text-xs text-white font-bold block">{v.name}</span>
                        <span className="text-[8px] md:text-[9px] text-zinc-500">{v.party}</span>
                        <div className={\`mt-1 text-[9px] md:text-[10px] font-bold \${v.color === 'green' ? 'text-green-400' : 'text-red-400'}\`}>
                          {v.color === 'green' ? '✓' : '✗'} {v.vote}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="bg-[#060a15] px-4 md:px-8 py-2 flex justify-end border-t border-white/5">
                  <span className="text-[8px] md:text-[10px] text-zinc-600 font-mono tracking-wider uppercase">Tecnologia <strong className="text-zinc-400">Sonus Pro Audio & Video</strong></span>
                </div>
              </div>
            </div>
            
            {/* Text below */}
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-light">
                O orador fala, o cronômetro conta, a câmera enquadra, e a população assiste — tudo em tempo real no telão e na transmissão da TV Câmara.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed font-light">
                Cada voto nominal é registrado instantaneamente com o nome, partido e assento do parlamentar. 
                <strong className="text-white font-medium"> Sem margem para contestação.</strong>
              </p>
            </div>
          </FadeIn>

          {/* ── ACT 3: After the Session ── */}
          <FadeIn className="mb-20 md:mb-28">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Text */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg tracking-wider">③ APÓS A SESSÃO</span>
                </div>
                <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-light">
                  Sessão encerrada. Em segundos, o sistema gera o relatório oficial de votação nominal em PDF — pronto para publicação no Portal da Transparência.
                </p>
                <p className="text-lg text-zinc-400 mt-6 leading-relaxed font-light">
                  Cada documento recebe uma assinatura digital com chave criptográfica SHA-256, tornando qualquer tentativa de adulteração 
                  <strong className="text-white font-medium"> detectável e rastreável.</strong>
                </p>
                
                {/* Hash visual proof */}
                <div className="mt-8 bg-black/50 border border-white/5 rounded-xl px-5 py-4 font-mono text-sm flex items-center gap-3 overflow-hidden">
                  <Lock className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-green-400/80 truncate">HASH: a3f8c9d2e1b7...4f6a</span>
                  <span className="text-zinc-600">(SHA-256)</span>
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 ml-auto" />
                </div>
              </div>
              
              {/* Rendered Mockup: Reports Panel */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="bg-[#0b1120] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:shadow-amber-500/10 transition-all duration-700">
                  {/* App Header */}
                  <div className="bg-[#0f172a] px-4 md:px-6 py-3 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center"><span className="text-[8px] text-blue-400">🏛</span></div>
                      <span className="text-[10px] md:text-xs text-zinc-300 font-semibold tracking-wide">Câmara Municipal | Painel</span>
                    </div>
                  </div>
                  {/* Tabs */}
                  <div className="px-4 md:px-6 pt-3 flex gap-4 border-b border-white/5">
                    <span className="text-[10px] md:text-xs text-zinc-500 pb-2.5">Vereadores</span>
                    <span className="text-[10px] md:text-xs text-zinc-500 pb-2.5">Sessões</span>
                    <span className="text-[10px] md:text-xs text-white pb-2.5 font-bold border-b-2 border-amber-500">Relatórios de Votação</span>
                  </div>
                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs md:text-sm text-white font-bold">Resultados Oficiais de Votação</span>
                      <div className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-[9px] md:text-[10px] text-blue-400 font-medium">Atualizar</div>
                    </div>
                    {/* Table */}
                    <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                      {/* Header */}
                      <div className="grid grid-cols-3 gap-2 px-3 md:px-4 py-2.5 border-b border-white/5 text-[8px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        <span>Data / Sessão</span>
                        <span>Resumo</span>
                        <span className="text-right">PDF</span>
                      </div>
                      {/* Row */}
                      <div className="grid grid-cols-3 gap-2 px-3 md:px-4 py-3 items-center hover:bg-white/5 transition-colors">
                        <span className="text-[10px] md:text-xs text-white font-semibold">10ª Sessão Ordinária</span>
                        <span className="text-[10px] md:text-xs text-blue-400">2 pauta(s) votada(s)</span>
                        <div className="flex justify-end">
                          <div className="bg-zinc-800 border border-white/10 rounded px-2 py-1 text-[9px] md:text-[10px] text-white font-bold flex items-center gap-1 cursor-pointer hover:bg-zinc-700 transition-colors">
                            <FileText className="w-3 h-3" /> Ver
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hash verification block */}
                    <div className="mt-4 bg-green-500/5 border border-green-500/15 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <span className="text-[10px] md:text-xs text-green-400 font-bold block">Documento Autenticado</span>
                        <span className="text-[8px] md:text-[10px] text-zinc-500 font-mono">SHA-256: a3f8c9d2...e1b74f6a ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── AUTONOMY BLOCK ── */}
          <FadeIn>
            <div className="relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden group/autonomy">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.05)_0%,transparent_60%)] pointer-events-none group-hover/autonomy:opacity-100 opacity-50 transition-opacity duration-700" />
              
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center relative z-10">
                {/* Text - 3 cols */}
                <div className="lg:col-span-3">
                  <span className="font-mono text-xs font-bold text-zinc-500 tracking-wider uppercase">Sem Dependência Técnica</span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mt-4 leading-tight">
                    Mudou o presidente?<br/>Entrou um suplente?<br/>Trocou de partido?
                  </h3>
                  <p className="text-lg text-zinc-400 mt-6 leading-relaxed font-light max-w-lg">
                    Qualquer servidor da Câmara altera em 30 segundos pelo celular ou computador. 
                    <strong className="text-white font-medium"> Sem ligar para técnico. Sem pagar chamado.</strong>
                  </p>
                </div>
                
                {/* Rendered Mockup: Registration Panel - 2 cols */}
                <div className="lg:col-span-2 relative group">
                  <div className="bg-[#0b1120] rounded-2xl overflow-hidden border border-white/10 shadow-xl transform rotate-2 group-hover:rotate-0 transition-all duration-700">
                    {/* App Header */}
                    <div className="bg-[#0f172a] px-3 md:px-4 py-2 flex items-center gap-2 border-b border-white/5">
                      <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center"><span className="text-[7px] text-blue-400">🏛</span></div>
                      <span className="text-[9px] md:text-[10px] text-zinc-300 font-semibold">Vereadores & Assentos</span>
                    </div>
                    {/* Content */}
                    <div className="p-3 md:p-4 space-y-2">
                      {/* Table rows */}
                      {[
                        { seat: 1, name: "JONAS", party: "PT" },
                        { seat: 2, name: "MARCOS", party: "PL" },
                        { seat: 3, name: "PAULO", party: "PT" },
                        { seat: 4, name: "JOTA", party: "PQD" },
                      ].map(v => (
                        <div key={v.seat} className="flex items-center gap-2 bg-black/20 rounded-lg px-2.5 py-2 hover:bg-white/5 transition-colors">
                          <span className="w-5 h-5 rounded bg-blue-600/30 text-blue-300 text-[9px] font-bold flex items-center justify-center shrink-0">{v.seat}</span>
                          <span className="text-[10px] md:text-xs text-white font-bold flex-1">{v.name}</span>
                          <span className="text-[9px] md:text-[10px] text-zinc-500">{v.party}</span>
                        </div>
                      ))}
                      <div className="bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-[9px] md:text-[10px] font-bold py-2 rounded-lg text-center mt-2 cursor-pointer flex justify-center items-center gap-1.5">
                        <span className="text-xs">☁</span> Salvar Alterações na Nuvem
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
`;

  content = content.substring(0, startIndex) + newSection + '\n' + content.substring(endIndex);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully replaced content.');
} else {
  console.log('Error: markers not found.');
  console.log('startIndex:', startIndex);
  console.log('endIndex:', endIndex);
}
