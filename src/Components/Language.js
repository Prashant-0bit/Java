import React from 'react';
import { useTranslation } from 'react-i18next';
import './MainFunc'

function LanguageSelection({ onClose, onSelectLanguage }) {
  const languages = [
    { code: 'en', name: 'English', translation: 'English' },
    { code: 'de', name: 'German', translation: 'Deutsch' },
  ];

  const { t } = useTranslation();


  return (
    <div className="language-selection">
      <h6>{t('Select a Language')}</h6>
      <hr/>
      <ul>
        {languages.map((language) => (
          <li key={language.code} onClick={() => onSelectLanguage(language.code)}>
            {language.translation}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>{t('Close')}</button>
    </div>
  );
}

export default LanguageSelection;
