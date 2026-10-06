const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// 1. Add import
const importTarget = `import { LeadsDashboardTab } from "@/components/admin/LeadsDashboardTab"`;
const importReplacement = `import { LeadsDashboardTab } from "@/components/admin/LeadsDashboardTab"\nimport { DeployButton } from "@/components/admin/DeployButton"`;

// 2. Add button
const buttonTarget = `            <div className="flex items-center gap-4">
              <Link to="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                <Home className="w-4 h-4" /> Ver Site
              </Link>
              <button 
                onClick={handleAddNew}`;
const buttonReplacement = `            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-end">
              <Link to="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 mr-2">
                <Home className="w-4 h-4" /> Ver Site
              </Link>
              
              <DeployButton />

              <button 
                onClick={handleAddNew}`;

content = content.replace(importTarget, importReplacement);
content = content.replace(buttonTarget, buttonReplacement);

fs.writeFileSync('src/pages/AdminDashboard.tsx', content, 'utf8');
