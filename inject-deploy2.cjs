const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

const replacement = `            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-end">
              <Link to="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 mr-2">
                <Home className="w-4 h-4" /> Ver Site
              </Link>
              
              <DeployButton />

              <button 
                onClick={handleAddNew}`;

content = content.replace(/            <div className="flex items-center gap-4">\s*<Link to="\/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">\s*<Home className="w-4 h-4" \/> Ver Site\s*<\/Link>\s*<button \s*onClick={handleAddNew}/, replacement);

fs.writeFileSync('src/pages/AdminDashboard.tsx', content, 'utf8');
