import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/outline';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = availableLanguages.find(l => l.code === language);

  // Group languages by region
  const southAfricanLanguages = availableLanguages.filter(l => l.code !== 'en');
  const englishLanguage = availableLanguages.find(l => l.code === 'en');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-3 py-1.5 text-white text-sm hover:bg-white/30 transition-all"
      >
        <LanguageIcon className="h-4 w-4" />
        <span>{currentLanguage?.flag} {currentLanguage?.name}</span>
        <ChevronDownIcon className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50 animate-fadeIn">
          {/* English Option */}
          {englishLanguage && (
            <button
              onClick={() => {
                setLanguage(englishLanguage.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 border-b border-gray-100 ${
                language === englishLanguage.code ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700'
              }`}
            >
              <span>{englishLanguage.flag}</span>
              <span>{englishLanguage.name}</span>
              {language === englishLanguage.code && <span className="ml-auto">✓</span>}
            </button>
          )}
          
          {/* South African Languages */}
          <div className="py-1">
            <div className="px-3 py-1 text-xs text-gray-400 font-semibold">SOUTH AFRICAN LANGUAGES</div>
            {southAfricanLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                  language === lang.code ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                {language === lang.code && <span className="ml-auto">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;