import { createContext, useState } from "react"


export const SearchProducts = createContext('')

export default function SearchCtx({children}){
    const [Products, setProducts] = useState([])
  return (
    <SearchProducts.Provider value={{Products, setProducts}}>
        {children}
    </SearchProducts.Provider>
  )
}
