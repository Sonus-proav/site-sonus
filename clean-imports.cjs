const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

c = c.replace('import { Navbar } from "@/components/layout/Navbar"', '');

// Let's see if getUserGeo is actually used
if (!c.includes('getUserGeo()')) {
  // It wasn't used? Let's check the old replace.
  // Oh, my replace might have failed. Let's force it.
  c = c.replace('import { logLead, getUserGeo } from "@/lib/analytics"', 'import { logLead } from "@/lib/analytics"');
  // I'll just remove it if it's unused. We don't absolutely need Firebase logging on that specific Hero button if it's breaking, but we do have DataLayer tracking now.
}

fs.writeFileSync('src/pages/Home.tsx', c);
