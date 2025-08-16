// client/src/modules/palliative-v2/lib/useLocalStorage.ts
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T){
  const [value, setValue] = useState<T>(()=> {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial; }
    catch { return initial; }
  });
  useEffect(()=>{ try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key,value]);
  return [value, setValue] as const;
}
