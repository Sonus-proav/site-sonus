import { useEffect, useState, useMemo } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { getAnalyticsData, type PageView } from "@/lib/analytics";
import { Users, Clock, MapPin, MousePointerClick } from "lucide-react";

export function AnalyticsDashboardTab() {
  const [data, setData] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsData().then(views => {
      setData(views);
      setLoading(false);
    });
  }, []);

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

    // Ranking de Cidades
    const cityMap: Record<string, number> = {};
    data.forEach(v => {
      if(v.city !== "Desconhecida") {
        cityMap[v.city] = (cityMap[v.city] || 0) + 1;
      }
    });
    const topCities = Object.entries(cityMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Ranking de Páginas
    const pageMap: Record<string, number> = {};
    data.forEach(v => {
      pageMap[v.path] = (pageMap[v.path] || 0) + 1;
    });
    const topPages = Object.entries(pageMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return { todayCount, totalCount: data.length, avgTime, topCities, topPages };
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
              <h3 className="font-semibold text-sm">Top Cidade</h3>
            </div>
            <p className="text-3xl font-black text-white">{stats.topCities[0]?.[0] || "-"}</p>
          </div>
        </FadeIn>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FadeIn delay={0.5}>
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><MapPin className="text-zinc-500 w-5 h-5"/> Cidades de Origem</h3>
            <div className="space-y-4">
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
            <div className="space-y-4">
              {stats.topPages.length > 0 ? stats.topPages.map((page, idx) => (
                <div key={idx} className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
                  <span className="font-medium font-mono text-sm">{page[0] === "/" ? "Home" : page[0]}</span>
                  <span className="bg-primary/20 text-primary border border-primary/30 text-xs py-1 px-3 rounded-full font-bold">{page[1]} visitas</span>
                </div>
              )) : (
                <p className="text-zinc-500 text-sm">Sem dados suficientes.</p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
