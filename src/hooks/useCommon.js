import { createContext, useContext } from 'react';

export const CommonContext = createContext({ common: null });

export const useT = () => useContext(CommonContext).common;
