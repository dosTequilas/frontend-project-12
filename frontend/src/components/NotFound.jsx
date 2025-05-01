import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('notFound')}</h1>
      <p>{t('doesntExist')}</p>
    </div>
  );
};

export default NotFound;
