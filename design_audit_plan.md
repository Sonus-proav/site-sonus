# Sonus Pro AV: Master Design Audit & Redesign Plan

## 1. O Diagnóstico Atual (The "AI Vibe" Problem)

Após varrermos o código-fonte (`Home.tsx`, Landing Pages e `tailwind.config.js`) com as lentes das skills recém-instaladas (`impeccable`, `emil-design-eng`, `taste-skill`), identificamos por que o site ainda não passa a sensação de "Alta Engenharia" de forma unânime:

### Tipografia e Hierarquia (Taste Skill / Brutalismo)
- **Problema:** A fonte `Outfit` está sendo usada de forma muito "plana" (`text-5xl`, `font-bold`). Não há tensão tipográfica.
- **Solução:** Precisamos de contrastes extremos. Títulos gigantescos com tracking ultra-negativo (`tracking-tighter`, `leading-none`) em contraste com rótulos minúsculos, em caixa alta e espaçados (`text-[10px] uppercase tracking-[0.3em] font-mono`). Isso cria o visual de "Planta Baixa de Arquitetura" ou "Painel de Bordo Premium".

### Cores e Texturas (Minimalismo Acústico)
- **Problema:** O uso repetitivo de `bg-[#050505]` com "órbitas borradas" (como o `bg-blue-500/10 blur-[120px]`) virou um clichê de startups de IA genéricas.
- **Solução:** Remover as orbes borradas coloridas neon. Substituir por **Modo Escuro Físico**: Preto fosco (`#09090b`), Cinza Titânio (`zinc-400`), e branco puro, combinados com texturas em CSS que remetem a materiais reais (Grelha de Microfone, Espuma Acústica, Placa de Circuito).

### Animações e Motion (Emil Kowalski / Design Eng)
- **Problema:** O excesso de `FadeIn` e elementos flutuando infinitamente (`rotate: 360`) poluem a visão periférica do usuário. Animações não têm um "propósito".
- **Solução:** O *Motion* deve ser intencional. Ao invés de *fades* simples, usaremos revelações com máscaras (`clip-path` ou `overflow-hidden` com `y: 100% -> 0%`). As físicas de mola (`useSpring`) devem ser "pesadas" (`stiffness: 30, damping: 25`), passando a sensação de que as interfaces de vidro são densas e de altíssima qualidade (estilo Apple).

### Copywriting e Tom de Voz (Impeccable)
- **Problema:** Textos longos ou genéricos ("Revolucionamos seu áudio", "A melhor experiência").
- **Solução:** Cortar gordura. Copywriting conciso, técnico e impiedosamente seguro de si.
  - *Antes:* "Oferecemos a melhor qualidade para sua diretoria não perder o foco na videoconferência."
  - *Depois:* "A tecnologia desaparece. Apenas a conexão importa."

---

## 2. O Roadmap de Execução (Página a Página)

Vamos atacar o site página por página usando o método *Bounded Passes* (Impeccable): Fazer a engenharia completa da página de uma vez (desktop e mobile), auditar e não olhar para trás.

### Fase 1: Padronização Global
- [ ] Otimizar componentes base (`SpotlightCard`, `Reveal`, `Button`) para usar físicas pesadas e remover blurs excessivos.
- [ ] Ajustar o `Navbar` e `Footer` para o novo padrão brutalista/minimalista.

### Fase 2: Redesign das Páginas
1. **`Home.tsx`**
   - *Foco:* Reescrever o Hero para ser um manifesto arquitetônico, não um pitch de vendas. Criar a "grade de especialidades" com a mesma linguagem que implementamos na página de Soluções.
2. **`MeetingRoomsLanding.tsx` (Salas Corporativas)**
   - *Foco:* Limpar a simulação de chamada de vídeo para parecer um sistema Real (UI de Zoom Rooms ou Microsoft Teams Rooms), remover as luzes neon ao redor do tablet simulado e usar tons de grafite e vidro jateado.
3. **`PlenariosLanding.tsx` (Plenários e Câmaras)**
   - *Foco:* Dar a esta página um visual de "Controle de Tráfego" ou "Painel de Operações". Uso pesado de fontes mono-espaçadas para demonstrar controle rígido, software blindado e precisão de votação.
4. **`AuditoriosTeatros.tsx` (Auditórios e Teatros)**
   - *Foco:* Dramatismo acústico. Fundos extremamente escuros, grandes fotos (se existirem) tratadas em preto e branco com alto contraste, focando em propagação de onda sonora em vez de botões e cartões comuns.
5. **`IgrejasTemplos.tsx` (Igrejas e Templos)**
   - *Foco:* Sobriedade e respeito arquitetônico. Texturas que lembrem madeira e cimento, fontes com serifas elegantes combinadas com as geométricas.
6. **`QSysLanding.tsx` (Plataforma Q-SYS)**
   - *Foco:* A mais "High-Tech" de todas. Código puro. Fundo simulando um diagrama de blocos complexo de roteamento IP, mas incrivelmente limpo.

### Fase 3: Revisão de Micro-Interações
- Validar se o `Horizontal Scroll` da página de Soluções continua liso após integrarmos a nova navegação global.
- Ajustar os botões do WhatsApp para a nova paleta.

---

## 3. Próximo Passo

Por onde devemos começar a "cirurgia"? Sugiro iniciarmos pelo "coração" da operação: **A Nova Home (`Home.tsx`)** ou atacarmos a primeira landing page legada (Ex: **Salas Corporativas**).

Qual é a sua ordem de prioridade?
