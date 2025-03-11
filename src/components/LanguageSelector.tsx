import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';
import { Globe2 } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zu', name: 'isiZulu' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
        <Globe2 size={20} />
        <span>{languages.find(lang => lang.code === i18n.language)?.name}</span>
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 focus:outline-none">
        {languages.map((language) => (
          <Menu.Item key={language.code}>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-primary-50 text-primary-900' : 'text-gray-900'
                } group flex w-full items-center px-4 py-2 text-sm`}
                onClick={() => i18n.changeLanguage(language.code)}
              >
                {language.name}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default LanguageSelector;