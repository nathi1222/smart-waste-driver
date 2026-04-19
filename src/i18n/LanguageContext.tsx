import React, { createContext, useContext, useState, useEffect } from 'react';
import en from './languages/en';
import zu from './languages/zu';
import xh from './languages/xh';
import af from './languages/af';
import st from './languages/st';
import tn from './languages/tn';

export type Language = 'en' | 'zu' | 'xh' | 'af' | 'st' | 'tn';

const translations = {
  en,
  zu,
  xh,
  af,
  st,
  tn,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: any) => string;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved && ['en', 'zu', 'xh', 'af', 'st', 'tn'].includes(saved) ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, params?: any): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    if (typeof value === 'function') {
      return value(params);
    }
    
    return value || key;
  };

  const availableLanguages = [
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'zu' as Language, name: 'isiZulu', flag: '🇿🇦' },
    { code: 'xh' as Language, name: 'isiXhosa', flag: '🇿🇦' },
    { code: 'af' as Language, name: 'Afrikaans', flag: '🇿🇦' },
    { code: 'st' as Language, name: 'Sesotho', flag: '🇿🇦' },
    { code: 'tn' as Language, name: 'Setswana', flag: '🇿🇦' },
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};