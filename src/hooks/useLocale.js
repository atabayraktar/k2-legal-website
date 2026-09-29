import { createContext, useContext } from 'react';

export const LocaleContext = createContext({ locale: 'tr', common: null });

export const useLocale = () => useContext(LocaleContext);
export const useT = () => useContext(LocaleContext).common;
