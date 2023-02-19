import { useEffect, useState } from "react";

export const useLocalStorage = (key, init) => {
 const getLocalData = () => {
   return JSON.parse(localStorage.getItem(key)) ?? init;
 }

    const [state, setState] = useState(getLocalData);

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(state));
    },[state, key])

    return [state, setState]
   }