const fs = require('fs');

let content = fs.readFileSync('src/components/admin/AnalyticsDashboardTab.tsx', 'utf8');

// 1. Modificar useMemo para retornar todayAccesses
const useMemoReturnTarget = `return { todayCount, totalCount: data.length, avgTime, topCities, topPages };`;
const useMemoReturnReplacement = `
    const todayAccesses = data
      .filter(v => v.timestamp >= today.getTime())
      .sort((a, b) => b.timestamp - a.timestamp);

    return { todayCount, totalCount: data.length, avgTime, topCities, topPages, todayAccesses };`;

content = content.replace(useMemoReturnTarget, useMemoReturnReplacement);

// 2. Adicionar o bloco UI
const rankingsGridTarget = `          </div>
        </FadeIn>
      </div>
    </div>
  );
}`;
const rankingsGridReplacement = `          </div>
        </FadeIn>
      </div>

      {/* Acessos Hoje Detalhados */}
      <FadeIn delay={0.7}>
        <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Clock className="text-zinc-500 w-5 h-5"/> Acessos Hoje (Tempo Real)</h3>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-zinc-500 border-b border-white/10">
                <tr>
                  <th className="pb-3 font-medium">Hora</th>
                  <th className="pb-3 font-medium">Local</th>
                  <th className="pb-3 font-medium">Página</th>
                  <th className="pb-3 font-medium text-right">Aparelho</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.todayAccesses.length > 0 ? stats.todayAccesses.map((access, idx) => (
                  <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 text-zinc-400">
                      {new Date(access.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-4 font-medium text-white">
                      {access.city !== "Desconhecida" ? \`\${access.city} - \${access.region || ''}\` : "Desconhecido"}
                    </td>
                    <td className="py-4 text-zinc-300 font-mono text-xs">
                      {formatPageName(access.path)}
                    </td>
                    <td className="py-4 text-zinc-500 text-right">
                      {access.device === 'Mobile' ? '📱 Mobile' : '💻 Desktop'}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-zinc-500">
                      Nenhum acesso registrado hoje ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}`;

content = content.replace(rankingsGridTarget, rankingsGridReplacement);

fs.writeFileSync('src/components/admin/AnalyticsDashboardTab.tsx', content, 'utf8');
