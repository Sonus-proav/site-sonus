const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

content = content.replace(/<Home className="w-4 h-4" \/> Ver Site\s*<\/Link>/, `<Home className="w-4 h-4" /> Ver Site\n              </Link>\n              <DeployButton />`);

fs.writeFileSync('src/pages/AdminDashboard.tsx', content, 'utf8');
