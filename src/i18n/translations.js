export const translations = {
    en: {
        settings: 'Settings',
        preferences: 'Preferences',
        darkMode: 'Dark / Light Mode',
        language: 'Language',
        notifications: 'Notifications',
        privacy: 'Privacy & Security',
        privateAccount: 'Private Account',
        permissions: 'Permissions & Data Control',
        support: 'Support & Info',
        help: 'Help & Support',
        about: 'About Roamster',
        terms: 'Terms & Conditions',
        logout: 'Logout',
        version: 'App Version 1.0.0 (Build 42)',
        selectLanguage: 'Select App Language'
    },
    hi: {
        settings: 'सेटिंस',
        preferences: 'वरीयताएँ',
        darkMode: 'डार्क / लाइट मोड',
        language: 'भाषा',
        notifications: 'नोटिफिकेशन',
        privacy: 'गोपनीयता और सुरक्षा',
        privateAccount: 'निजी खाता',
        permissions: 'अनुमतियाँ और डेटा नियंत्रण',
        support: 'सहायता और जानकारी',
        help: 'सहायता और समर्थन',
        about: 'रोमस्टर के बारे में',
        terms: 'नियम और शर्तें',
        logout: 'लॉगआउट',
        version: 'ऐप वर्शन 1.0.0 (बिल्ड 42)',
        selectLanguage: 'ऐप की भाषा चुनें'
    },
    fr: {
        settings: 'Paramètres',
        preferences: 'Préférences',
        darkMode: 'Mode Sombre / Clair',
        language: 'Langue',
        notifications: 'Notifications',
        privacy: 'Confidentialité et Sécurité',
        privateAccount: 'Compte Privé',
        permissions: 'Autorisations et Données',
        support: 'Support et Infos',
        help: 'Aide et Support',
        about: 'À propos de Roamster',
        terms: 'Conditions Générales',
        logout: 'Déconnexion',
        version: 'Version de l\'application 1.0.0 (Build 42)',
        selectLanguage: 'Sélect. la langue de l\'appli'
    },
    es: {
        settings: 'Ajustes',
        preferences: 'Preferencias',
        darkMode: 'Modo Oscuro / Claro',
        language: 'Idioma',
        notifications: 'Notificaciones',
        privacy: 'Privacidad और Seguridad',
        privateAccount: 'Cuenta Privada',
        permissions: 'Permisos और Control de Datos',
        support: 'Soporte और Información',
        help: 'Ayuda और Soporte',
        about: 'Acerca de Roamster',
        terms: 'Términos और Condiciones',
        logout: 'Cerrar Sesión',
        version: 'Versión de la App 1.0.0 (Build 42)',
        selectLanguage: 'Seleccionar idioma de la aplicación'
    }
};

export const getTranslation = (lang, key) => {
    return translations[lang]?.[key] || translations['en'][key] || key;
};
