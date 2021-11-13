import { Quote } from "../models/quote";

export type Finder = (source: string) => Quote | Quote[] | undefined

export const AmbitoFinder: Finder = (source) => {
  const getPrice = (element: Element, query: string) => {
    return Number(element.querySelector(query)?.textContent?.replace(',','.'))
  }

  const indicator = document.querySelector(".variacion-max-min-chico.indicador[data-indice='/dolar/informal']")
  if (indicator) {
    const buy_price = getPrice(indicator, ".data-compra")
    const sell_price = getPrice(indicator, ".data-venta")

    if (buy_price && sell_price) 
      return {
        buy_price,
        sell_price,
        source
      }
  }
}