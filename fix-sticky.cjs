const fs = require('fs');

// 1. StickyCtaBar.tsx
let sticky = fs.readFileSync('src/components/ui/StickyCtaBar.tsx', 'utf8');
sticky = sticky.replace(
  '  useEffect(() => {\n    const handleScroll = () => {',
  '  useEffect(() => {\n    if (isVisible) document.body.classList.add("has-sticky-cta");\n    else document.body.classList.remove("has-sticky-cta");\n    return () => document.body.classList.remove("has-sticky-cta");\n  }, [isVisible]);\n\n  useEffect(() => {\n    const handleScroll = () => {'
);
fs.writeFileSync('src/components/ui/StickyCtaBar.tsx', sticky, 'utf8');

// 2. WhatsAppButton.tsx
let wa = fs.readFileSync('src/components/layout/WhatsAppButton.tsx', 'utf8');
wa = wa.replace(
  'className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4"',
  'className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4 global-whatsapp-btn transition-opacity duration-300"'
);
fs.writeFileSync('src/components/layout/WhatsAppButton.tsx', wa, 'utf8');

// 3. index.css
let css = fs.readFileSync('src/index.css', 'utf8');
css += '\n\n/* Esconde o botao do whatsapp flutuante quando a StickyCtaBar estiver visivel */\nbody.has-sticky-cta .global-whatsapp-btn { opacity: 0; pointer-events: none; }\n';
fs.writeFileSync('src/index.css', css, 'utf8');
