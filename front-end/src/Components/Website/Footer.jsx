import "./Footer.css";
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer className="footer">
        <p>{t('rights1')}</p>
        <a href="https://t.me/CodeHub4" target="_blank">Telegram</a>
          <hr />
        <p>{t('rights2')}
          <br />
          {t('rights3')}
        </p>
          <hr />
        <p>
        {t('rights4')}
          <br />
          {t('rights5')}
        </p>
    </footer>
  )
}
