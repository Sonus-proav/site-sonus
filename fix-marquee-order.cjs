const fs = require('fs');
let s = fs.readFileSync('src/components/ui/ClientMarquee.tsx', 'utf8');

// Swap SESSÃO CLIENTES and SESSÃO MARCAS
const startClientes = s.indexOf('{/* --- SESSÃO CLIENTES --- */}');
const startMarcas = s.indexOf('{/* --- SESSÃO MARCAS --- */}');
const endMarcas = s.indexOf('</section>');

if (startClientes !== -1 && startMarcas !== -1) {
  const head = s.substring(0, startClientes);
  const clientesSection = s.substring(startClientes, startMarcas);
  const marcasSection = s.substring(startMarcas, endMarcas);
  const tail = s.substring(endMarcas);

  // Now assemble them in the correct order: Marcas then Clientes
  // Also fix the top margin. Marcas should not have `mt-8` on its container if it's first.
  let newMarcas = marcasSection.replace('mt-8', '');
  let newClientes = clientesSection.replace('w-full relative z-10 flex flex-col items-center', 'w-full relative z-10 flex flex-col items-center mt-8');
  
  const resultStr = head + newMarcas + newClientes + tail;
  fs.writeFileSync('src/components/ui/ClientMarquee.tsx', resultStr);
  console.log("ClientMarquee reordered!");
} else {
  console.log("Could not find sections");
}
