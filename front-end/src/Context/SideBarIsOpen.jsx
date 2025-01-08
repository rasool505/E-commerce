import { createContext, useState } from "react"


export const Menu = createContext('')

export default function SideBarIsOpen({children}){
    const [isOpen, setIsOpen] = useState(true)
  return (
    <Menu.Provider value={{isOpen, setIsOpen}}>
        {children}
    </Menu.Provider>
  )
}
