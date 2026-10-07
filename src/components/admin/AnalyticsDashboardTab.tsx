import { useEffect, useState, useMemo } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { getAnalyticsData, type PageView } from "@/lib/analytics";
import { getProjects, type Project } from "@/lib/storage";
import { Users, Clock, MapPin, MousePointerClick } from "lucide-react";

export function AnalyticsDashboardTab() {
  const [data, setData] = useState<PageView[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAnalyticsData(), getProjects()]).then(([views, projs]) => {
      setData(views);
      setProjects(projs);
      setLoading(false);
    });
  }, []);

  const formatPageName = (path: string) => {
    if (path === "/") return "Home";
    if (path.startsWith("/projetos/")) {
      const id = path.split("/")[2];
      const project = projects.find(p => p.id === Number(id));
      return project ? `Projeto: ${project.title}` : path;
    }
    return path;
  };

  const stats = useMemo(() => {
    if (!data.length) return null;

    // Acessos Hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = data.filter(v => v.timestamp >= today.getTime()).length;

    // Tempo médio global
    const validTimes = data.filter(v => v.timeSpent > 0);
    const avgTime = validTimes.length > 0 
      ? Math.floor(validTimes.reduce((acc, curr) => acc + curr.timeSpent, 0) / validTimes.length) 
      : 0;

    // Ranking de Localidades (Cidade - Estado)
    const cityMap: Record<string, number> = {};
    data.forEach(v => {
      if(v.city !== "Desconhecida") {
        const locationStr = v.region && v.region !== "Desconhecida" 
          ? `${v.city} - ${v.region}`
          : v.city;
        cityMap[locationStr] = (cityMap[locationStr] || 0) + 1;
      }
    });
    const topCities = Object.entries(cityMap).sort((a, b) => b[1] - a[1]);

    // Ranking de Páginas
    const pageMap: Record<string, number> = {};
    data.forEach(v => {
      pageMap[v.path] = (pageMap[v.path] || 0) + 1;
    });
    const topPages = Object.entries(pageMap).sort((a, b) => b[1] - a[1]);

    
    const todayAccesses = data
      .filter(v => v.timestamp >= today.getTime())
      .sort((a, b) => b.timestamp - a.timestamp);

    return { todayCount, totalCount: data.length, avgTime, topCities, topPages, todayAccesses };
  }, [data]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-500">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-zinc-950 border border-white/10 rounded-3xl p-12 text-center text-zinc-500">
        Ainda não há dados de analytics registrados. Visite o site para gerar os primeiros dados!
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FadeIn delay={0.1}>
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-emerald-400 mb-2">
              <Users className="w-5 h-5" />
              <h3 className="font-semibold text-sm">Acessos Hoje</h3>
            </div>
            <p className="text-3xl font-black text-white">{stats.todayCount}</p>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-blue-400 mb-2">
              <MousePointerClick className="w-5 h-5" />
              <h3 className="font-semibold text-sm">Acessos Totais (30 dias)</h3>
            </div>
            <p className="text-3xl font-black text-white">{stats.totalCount}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-amber-400 mb-2">
              <Clock className="w-5 h-5" />
              <h3 className="font-semibold text-sm">Tempo Médio na Página</h3>
            </div>
            <p className="text-3xl font-black text-white">{formatTime(stats.avgTime)}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-purple-400 mb-2">
              <MapPin className="w-5 h-5" />
              <h3 className="font-semibold text-sm">Top Local</h3>
            </div>
            <p className="text-xl md:text-2xl font-black text-white truncate" title={stats.topCities[0]?.[0] || "-"}>{stats.topCities[0]?.[0] || "-"}</p>
          </div>
        </FadeIn>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.5}>
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><MapPin className="text-zinc-500 w-5 h-5"/> Locais de Origem</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {stats.topCities.length > 0 ? stats.topCities.map((city, idx) => (
                <div key={idx} className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
                  <span className="font-medium">{city[0]}</span>
                  <span className="bg-white/10 text-white text-xs py-1 px-3 rounded-full font-bold">{city[1]} acessos</span>
                </div>
              )) : (
                <p className="text-zinc-500 text-sm">Sem dados suficientes.</p>
              )}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><MousePointerClick className="text-zinc-500 w-5 h-5"/> Top Páginas</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {stats.topPages.length > 0 ? stats.topPages.map((page, idx) => (
                <div key={idx} className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
                  <span className="font-medium font-mono text-sm">{formatPageName(page[0])}</span>
                  <span className="bg-primary/20 text-primary border border-primary/30 text-xs py-1 px-3 rounded-full font-bold">{page[1]} visitas</span>
                </div>
              )) : (
                <p className="text-zinc-500 text-sm">Sem dados suficientes.</p>
              )}
            </div>
          </div>
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
                      {access.city !== "Desconhecida" ? `${access.city} - ${access.region || ''}` : "Desconhecido"}
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
}
