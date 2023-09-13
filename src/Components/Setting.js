import React, { useState } from 'react';
import i18n from './i18n';
import LanguageSelection from './Language';
import { useTranslation } from 'react-i18next';
import './MainFunc';

export default function Setting() {
  const [isLanguageSelectionOpen, setLanguageSelectionOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { t } = useTranslation();

  const handleLanguageClick = () => {
    setLanguageSelectionOpen(!isLanguageSelectionOpen);
  };

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode)
      .then(() => {
        console.log('Language changed to:', languageCode);
      })
      .catch((err) => {
        console.error('Error changing language:', err);
      });
    setLanguageSelectionOpen(false);
  };

  return (
    <div className="main-func-container">
      <div className={`language-pop-container ${isLanguageSelectionOpen ? 'open' : ''}`}>
        <button className='main-func' onClick={handleLanguageClick}>
          {t('Language')}
        </button>
        {isLanguageSelectionOpen && (
          <LanguageSelection
            onClose={() => setLanguageSelectionOpen(false)}
            onSelectLanguage={handleLanguageSelect}
          />
        )}
      </div>
      <button className='main-func' to="/time">
        {t('Time')}
      </button>
      <button className='main-func' to="/about">
        {t('About')}
      </button>
      <button className='main-func' to="/help">
        {t('Help')}
      </button>
      <button className='main-func' to="/help">
        {t('Minimize')}
      </button>
    </div>
  );
}
