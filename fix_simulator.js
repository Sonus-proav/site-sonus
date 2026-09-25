import fs from 'fs';
const path = 'src/components/plenarios/LiveSessionSimulator.tsx';
let content = fs.readFileSync(path, 'utf8');

// The problematic string is: animate={{ width: \`\${(timeLeft / 20) * 100}%\` }}
// We need to remove the slashes before backtick and dollar
content = content.replace(/\\`\\\\\$\\{\(timeLeft \/ 20\) \* 100\\}%\\`/g, '`${(timeLeft / 20) * 100}%`');
content = content.replace(/animate=\{\{ width: \\\`\\\\\$\\{\(timeLeft \/ 20\) \* 100\\}%\\\` \}\}/g, 'animate={{ width: `${(timeLeft / 20) * 100}%` }}');
content = content.replace(/animate=\{\{ width: \\\`\\\\\$\\{\(simCount \/ 4\) \* 100\\}%\\\` \}\}/g, 'animate={{ width: `${(simCount / 4) * 100}%` }}');
content = content.replace(/animate=\{\{ width: \\\`\\\\\$\\{\(naoCount \/ 4\) \* 100\\}%\\\` \}\}/g, 'animate={{ width: `${(naoCount / 4) * 100}%` }}');

// Fallback plain split and join
let pieces = content.split('\\`\\${');
content = pieces.join('`${');
pieces = content.split('}%\\`');
content = pieces.join('}%`');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed syntax error in Simulator');
