import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FadeIn } from "@/components/ui/FadeIn";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isAttempting, setIsAttempting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setIsAttempting(true);
    
    // Pequeno delay artificial para evitar ataques de força bruta rápidos (brute force)
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const success = await login(password);
      
      if (success) {
        navigate("/admin-dashboard-sonus");
      } else {
        setError(true);
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setPassword("");
    } finally {
      setIsAttempting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos de Fundo Escuros */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <FadeIn className="w-full max-w-md relative z-10">
        <div className="bg-zinc-950/80 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
          
          <div className="flex flex-col items-center justify-center mb-10 text-center">
            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(41,128,185,0.2)]">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Área Restrita</h1>
            <p className="text-sm text-zinc-400">Insira a credencial master para acessar o painel de controle Sonus.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  disabled={isAttempting}
                  placeholder="Master Password"
                  className={`w-full bg-black/50 border ${error ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:ring-primary'} rounded-xl h-14 pl-12 pr-4 text-white focus:outline-none focus:ring-2 transition-all placeholder:text-zinc-600 disabled:opacity-50`}
                />
              </div>
              {error && (
                <p className="text-red-400 text-xs font-medium pl-2 animate-pulse">Acesso negado. Credencial incorreta.</p>
              )}
            </div>

            <button 
              type="submit"
              disabled={isAttempting || !password}
              className="w-full h-14 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(41,128,185,0.3)] group"
            >
              {isAttempting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Autenticar <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>
      </FadeIn>
    </div>
  );
}
