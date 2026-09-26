const fs = require('fs');

function replaceInFile(filepath, replacements) {
    if (!fs.existsSync(filepath)) return;
    let content = fs.readFileSync(filepath, 'utf8');
    let original = content;
    
    for (let [search, replace] of replacements) {
        // Use a global case-insensitive regex for simpler strings if needed, 
        // but here we just replace plain strings to be safe
        content = content.split(search).join(replace);
    }
    
    if (content !== original) {
        fs.writeFileSync(filepath, content);
        console.log(`Updated ${filepath}`);
    }
}

// AppLayout.tsx
replaceInFile('src/components/layout/AppLayout.tsx', [
    ['Engenharia Acústica', 'Projetos Acústicos'],
    ['Engenharia Ac\\u00FAstica', 'Projetos Acústicos'], // fallback if encoded
]);

// AboutExperience.tsx
replaceInFile('src/components/ui/AboutExperience.tsx', [
    ['Engenharia Própria', 'Equipe Especializada'],
    ['Engenharia Pr\\u00F3pria', 'Equipe Especializada'],
]);

// BentoEspecialidades.tsx
replaceInFile('src/components/ui/BentoEspecialidades.tsx', [
    ['Engenharia acústica', 'Arquitetura acústica'],
    ['Engenharia ac\\u00FAstica', 'Arquitetura acústica'],
    ['>Engenharia <', '>Integração <'],
    ['>Engenharia\n', '>Integração\n'],
    ['Explorar Engenharia', 'Explorar Tecnologia'],
]);

// AuditoriosTeatros.tsx
replaceInFile('src/pages/AuditoriosTeatros.tsx', [
    ['projeto de engenharia', 'projeto executivo'],
]);

// Home.tsx
replaceInFile('src/pages/Home.tsx', [
    ['Engenharia audiovisual de precisão', 'Projetos audiovisuais de precisão'],
    ['>Engenharia <', '>Integração <'],
    ['Falar com a Engenharia', 'Falar com Especialistas'],
    ['Fale com nossa engenharia', 'Fale com nossos especialistas'],
]);

// LinksPage.tsx
replaceInFile('src/pages/LinksPage.tsx', [
    ['falar_engenheiro_whatsapp', 'falar_especialista_whatsapp'],
]);

// PlenariosLanding.tsx
replaceInFile('src/pages/PlenariosLanding.tsx', [
    ['Projetos Executivos de Engenharia', 'Projetos Executivos de Audiovisual'],
    ['Engenharia de Ponta.', 'Tecnologia de Ponta.'],
    ['Nossos engenheiros mapeiam', 'Nossos especialistas mapeiam'],
    ['Nossos engenheiros de', 'Nossos consultores de'],
]);

// QSysLanding.tsx
replaceInFile('src/pages/QSysLanding.tsx', [
    ['certificações oficiais de Engenharia e Vendas', 'certificações oficiais Técnicas e Comerciais'],
    ['certifica\\u00E7\\u00F5es oficiais de Engenharia e Vendas', 'certificações oficiais Técnicas e Comerciais'],
]);

// Solucoes.tsx
replaceInFile('src/pages/Solucoes.tsx', [
    ['Engenharia Acústica em', 'Acústica Profissional em'],
    ['Engenharia Ac\\u00FAstica em', 'Acústica Profissional em'],
    ['verticais de engenharia audiovisual', 'verticais de tecnologia audiovisual'],
    ['Engenharia audiovisual vibrante', 'Integração audiovisual vibrante'],
]);

console.log('Text replacements done.');
