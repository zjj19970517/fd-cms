import { createContext } from 'react';

/**
 * 全局上下文（语言控制、主题设置）
 */
export const GlobalContext = createContext<{
  lang?: string;
  setLang?: (value: string) => void;
  theme?: string;
  setTheme?: (value: string) => void;
}>({});
