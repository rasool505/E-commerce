import {createContext, useEffect, useState} from "react";


export const WidowReSize = createContext(null)

export default function WindowSize({children}){

    const [resize, setResize] = useState(window.innerWidth);
    useEffect(()=>{
        function setWindowidth(){
            setResize(window.innerWidth)
        }
        window.addEventListener('resize', setWindowidth)
        //cleanUP function
        return ()=>{
            window.removeEventListener('resize',setWindowidth)
        }
    },[])
    return <WidowReSize.Provider value={{resize, setResize}}>
        {children}
    </WidowReSize.Provider>;
}