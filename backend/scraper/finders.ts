import { Quotes } from "../models";

export type Finder = (source: string) => Quotes | Quotes[]

export const AmbitoFinder: Finder = (source) => {
  const indicator = document.querySelector(".variacion-max-min-chico.indicador[data-indice='/dolar/informal']")

  const getPrice = (element: Element, query: string) => {
    return Number(element.querySelector(query)?.textContent?.replace(',','.'))
  }

  return {
    buy_price: indicator ? getPrice(indicator, ".data-compra") : "",
    sell_price: indicator ? getPrice(indicator, ".data-venta") : "",
    source
  }
}