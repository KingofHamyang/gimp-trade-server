export default function getGimp(btcKrw: number, usdKrw: number, btcUsd:number): number {
  return Number((((btcKrw - usdKrw * btcUsd) * 100) / btcKrw).toFixed(3))
}