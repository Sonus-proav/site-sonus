import { useState } from "react"
import { Globe, RefreshCw, Settings, Check } from "lucide-react"

export function DeployButton() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleDeploy = async () => {
    let webhookUrl = localStorage.getItem("sonus_deploy_webhook")
    
    if (!webhookUrl) {
      webhookUrl = window.prompt("Configuração Única: Insira a URL do Deploy Hook do Cloudflare Pages\\n(Você pode pegar isso no painel do Cloudflare > Settings > Builds & deployments > Deploy hooks)")
      if (!webhookUrl) return
      if (!webhookUrl.startsWith("http")) {
        alert("URL inválida. Precisa começar com https://")
        return
      }
      localStorage.setItem("sonus_deploy_webhook", webhookUrl)
    }

    if (!window.confirm("Isso vai avisar o servidor para gerar o sitemap.xml atualizado e publicar o site agora. Deseja continuar?")) {
      return
    }

    setIsDeploying(true)
    setSuccess(false)

    try {
      const response = await fetch(webhookUrl, { method: "POST" })
      if (!response.ok) throw new Error("Falha no disparo")
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e) {
      console.error(e)
      alert("Erro ao disparar o Webhook. Verifique se a URL está correta. O seu navegador bloqueou a requisição ou o Cloudflare recusou.")
      // Allow them to reset if failed
      if (window.confirm("Deseja reconfigurar a URL do Webhook?")) {
        localStorage.removeItem("sonus_deploy_webhook")
      }
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={handleDeploy}
        disabled={isDeploying}
        className={`font-semibold py-2.5 px-5 rounded-full flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] \${
          success 
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" 
            : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
        }`}
      >
        {isDeploying ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : success ? (
          <Check className="w-4 h-4" />
        ) : (
          <Globe className="w-4 h-4" />
        )}
        <span className="text-sm md:text-base">
          {isDeploying ? "Publicando..." : success ? "Publicação Iniciada!" : "Sincronizar Site"}
        </span>
      </button>
      
      {/* Botão para reconfigurar a URL caso tenham colocado errado */}
      <button 
        onClick={() => {
          const url = window.prompt("Atualizar URL do Deploy Hook (Cloudflare):", localStorage.getItem("sonus_deploy_webhook") || "");
          if (url) localStorage.setItem("sonus_deploy_webhook", url);
        }}
        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
        title="Configurar Webhook URL"
      >
        <Settings className="w-4 h-4" />
      </button>
    </div>
  )
}
