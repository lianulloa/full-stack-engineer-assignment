import { Quote } from "../models/quote";

export type FinderSelector = {
  valuesParentSelector: string,
  buySelector: string,
  sellSelector: string
}

type Finder = (source: string, selector: FinderSelector) => Quote | undefined

export const genericFinder: Finder = (source, {valuesParentSelector, buySelector, sellSelector}) => {
  const getPrice = (element: Element, query: string) => {
    return Number(element.querySelector(query)?.textContent?.replace(',','.').replace('$',''))
  }

  const valuesParent = document.querySelector(valuesParentSelector)
  if (valuesParent) {
    const buy_price = getPrice(valuesParent, buySelector)
    const sell_price = getPrice(valuesParent, sellSelector)

    if (buy_price && sell_price) 
      return {
        buy_price,
        sell_price,
        source
      }
  }
}
