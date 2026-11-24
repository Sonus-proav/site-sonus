/**
 * Mantém a largura horizontal da cena 3D constante quando o contêiner fica mais estreito
 * (celulares em retrato): aumenta o FOV vertical em vez de cortar as laterais da cena.
 * `refAspect` é a proporção (largura/altura) para a qual a composição foi desenhada.
 */
export function fitFov(baseFovDeg: number, aspect: number, refAspect: number, maxFovDeg = 56): number {
  if (!isFinite(aspect) || aspect <= 0 || aspect >= refAspect) return baseFovDeg
  const baseRad = (baseFovDeg * Math.PI) / 180
  const fitted = 2 * Math.atan(Math.tan(baseRad / 2) * (refAspect / aspect))
  return Math.min((fitted * 180) / Math.PI, maxFovDeg)
}
