

import React from "react";
import    './Footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();

  if ( i18n.language === "ar") {
    return (
      <div dir="rtl" className="myfooter  mttt">
            <footer className="ezzo ">
      
          تم برمجة هذا الموقع بواسطة 3zzo.com

                  <span>  <i className="fa-solid fa-heart "></i> </span>
            </footer>
      </div>
        );
  } else if (i18n.language === "en") {
    return (
      <div  className="myfooter  mttt">
            <footer className="ezzo ">
      Designed and developed by 3zzo.com 
                  <span>  <i className="fa-solid fa-heart "></i> </span>
            </footer>
      </div>
        );
  }

};

export default Footer;

