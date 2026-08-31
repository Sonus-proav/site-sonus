import { useEffect, useState, useMemo } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { getLeadsData } from "@/lib/analytics";
import { MessageSquare, TrendingUp, FileText, MessageCircle } from "lucide-react";

export interface Lead {
  id?: string;
  type: 'form' | 'whatsapp';
  name?: string;
  phone?: string;
  email?: string;
  source: string;
  city: string;
  region: string;
  country: string;
  device: 'Mobile' | 'Desktop';
  timestamp: number;
  utms?: { source?: string; campaign?: string; medium?: string } | null;
  whatsappOrigin?: string;
}

type FilterType = 'Todos' | 'Formulário' | 'WhatsApp';

export function LeadsDashboardTab() {
  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('Todos');

  useEffect(() => {
    // getLeadsData should return a Promise that resolves to Lead[]
    getLeadsData().then((leads) => {
      setData(leads as Lead[]);
      setLoading(false);
    }).catch(() => {
      // Fallback on error or missing function
      setData([]);
      setLoading(false);
    });
  }, []);

  const stats = useMemo(() => {
    if (!data.length) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = data.filter(l => l.timestamp >= today.getTime()).length;
    const formCount = data.filter(l => l.type === 'form').length;
    const wppCount = data.filter(l => l.type === 'whatsapp').length;

    return { todayCount, totalCount: data.length, formCount, wppCount };
  }, [data]);

  const filteredLeads = useMemo(() => {
    return data
      .filter(lead => {
        if (filter === 'Formulário') return lead.type === 'form';
        if (filter === 'WhatsApp') return lead.type === 'whatsapp';
        return true;
      })
      .sort((a, b) => b.timestamp - a.timestamp); // Sort by most recent
  }, [data, filter]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
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
        Ainda não há leads registrados. As interações de WhatsApp e formulários aparecerão aqui!
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FadeIn delay={0.1}>
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-green-400 mb-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-semibold text-sm">Leads Hoje</h3>
            </div>
            <p className="text-3xl font-black text-white">{stats.todayCount}</p>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-blue-400 mb-2">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-semibold text-sm">Leads Totais (30 dias)</h3>
            </div>
            <p className="text-3xl font-black text-white">{stats.totalCount}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-amber-400 mb-2">
              <FileText className="w-5 h-5" />
              <h3 className="font-semibold text-sm">Via Formulário</h3>
            </div>
            <p className="text-3xl font-black text-white">{stats.formCount}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-emerald-400 mb-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold text-sm">Via WhatsApp</h3>
            </div>
            <p className="text-3xl font-black text-white">{stats.wppCount}</p>
          </div>
        </FadeIn>
      </div>

      {/* Filter Row */}
      <FadeIn delay={0.5}>
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          {(['Todos', 'Formulário', 'WhatsApp'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Leads Table */}
      <FadeIn delay={0.6}>
        <div className="bg-zinc-950 border border-white/10 rounded-3xl p-6 lg:p-8">
          <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
            {filteredLeads.length > 0 ? (
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-zinc-500 text-sm">
                    <th className="font-medium p-3">Data/Hora</th>
                    <th className="font-medium p-3">Tipo</th>
                    <th className="font-medium p-3">Nome</th>
                    <th className="font-medium p-3">Contato</th>
                    <th className="font-medium p-3 hidden md:table-cell">Cidade</th>
                    <th className="font-medium p-3 hidden lg:table-cell">Origem</th>
                    <th className="font-medium p-3 hidden lg:table-cell">UTM</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead, idx) => (
                    <tr key={lead.id || idx} className="bg-black/30 rounded-lg group transition-colors hover:bg-black/50">
                      <td className="p-3 text-sm text-zinc-300 rounded-l-lg border-y border-l border-white/5">
                        {formatDate(lead.timestamp)}
                      </td>
                      <td className="p-3 text-sm font-medium border-y border-white/5">
                        {lead.type === 'form' ? (
                          <span className="flex items-center gap-2 text-amber-400/90">
                            📝 Formulário
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-emerald-400/90">
                            💬 WhatsApp
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-sm text-white border-y border-white/5">
                        {lead.name || '-'}
                      </td>
                      <td className="p-3 text-sm text-zinc-300 border-y border-white/5">
                        {lead.phone || lead.email || '-'}
                      </td>
                      <td className="p-3 text-sm text-zinc-400 hidden md:table-cell border-y border-white/5">
                        {lead.city && lead.city !== 'Desconhecida' 
                          ? (lead.region && lead.region !== 'Desconhecida' ? `${lead.city} - ${lead.region}` : lead.city)
                          : '-'}
                      </td>
                      <td className="p-3 text-sm text-zinc-400 hidden lg:table-cell border-y border-white/5 truncate max-w-[150px]" title={lead.source}>
                        {lead.source || '-'}
                      </td>
                      <td className="p-3 text-sm text-zinc-400 hidden lg:table-cell rounded-r-lg border-y border-r border-white/5">
                        {lead.utms?.source || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-zinc-500 py-12">
                Nenhum lead encontrado para este filtro.
              </div>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
