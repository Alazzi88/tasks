import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import Arabic from './Languages/ar.json'
import English from './Languages/en.json'



const resources = {
  en: {
    translation: English
  },
  ar: {
    translation: Arabic
  }
};

i18n.use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    detection:{
      order: [ 'localStorage', 'htmlTag',   ],
      caches: ['localStorage', ],


    },
  
    interpolation: {
      escapeValue: false, 
    } ,

    react: {
      useSuspense: false,
    },
  });

  export default i18n;