import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface SEOContent {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
const seoContent: Record<string, SEOContent> = {
  // --- TÜRKÇE (TR) - Tamamen Optimize Edildi ---
  tr: {
    title: 'Cloud Mining Free | Bitcoin Mining Free - En İyi Crypto Miner Hizmeti',
    description: 'Online Free Mining ile donanım olmadan günlük Bitcoin Mining Free kazançları. Güvenilir Crypto Mining App deneyimi sunan Cloud Miner platformu. Hemen $25 bonus al!',
    keywords: 'cloud mining free, bitcoin mining free, online free mining, crypto miner, crypto mining app, bitcoin mining program, bitcoin mining crypto miner, coin mining, hash gücü kiralama',
    ogTitle: 'Cloud Mining Free Başlat: Bitcoin Mining Free ve $25 Bonus Fırsatı',
    ogDescription: 'Coin Mining ile Bitcoin kazanmaya hemen başla! Online Free Mining ile donanım derdi yok.'
  },
  // --- İNGİLİZCE (EN) - Tamamen Optimize Edildi ---
  en: {
    title: 'Cloud Mining Free | Bitcoin Mining Free - Best Crypto Miner Service',
    description: 'Online Free Mining to start earning Bitcoin Mining Free daily. The best Crypto Mining App experience from a reliable Cloud Miner platform. Get your $25 bonus now!',
    keywords: 'cloud mining free, bitcoin mining free, online free mining, crypto miner, crypto mining app, bitcoin mining program, bitcoin mining crypto miner, coin mining, hash power rental',
    ogTitle: 'Cloud Mining Free Starter: Bitcoin Mining Free & $25 Bonus Offer',
    ogDescription: 'Start Coin Mining and earn Bitcoin today! Experience hassle-free Online Free Mining.'
  },
  // --- ALMANCA (DE) - Optimize Edildi ---
  de: {
    title: 'Kostenloses Cloud Mining | Bitcoin Mining kostenlos - Bester Krypto Miner Service',
    description: 'Kostenloses Cloud Mining starten: Täglich Bitcoin Mining kostenlos Einnahmen. Zuverlässige Krypto Mining App Erfahrung ohne Bitcoin Mining Programm Komplexität. Jetzt $25 Bonus sichern!',
    keywords: 'cloud mining kostenlos, bitcoin mining kostenlos, online mining kostenlos, krypto miner, krypto mining app, bitcoin mining programm, coin mining, hash power mieten',
    ogTitle: 'Kostenloses Cloud Mining starten: Bitcoin Mining kostenlos und $25 Bonus sichern',
    ogDescription: 'Mit Coin Mining sofort Bitcoin verdienen! Kostenloses Online Mining ohne Hardware-Aufwand.'
  },
  // --- RUSÇA (RU) - Optimize Edildi ---
  ru: {
    title: 'Бесплатный облачный майнинг | Майнинг Bitcoin бесплатно - Лучший сервис Крипто-майнинга',
    description: 'Начните Бесплатный облачный майнинг и ежедневно зарабатывайте Bitcoin бесплатно. Надежное Приложение для криптомайнинга без необходимости установки Программы для майнинга. Получите $25 бонус прямо сейчас!',
    keywords: 'бесплатный облачный майнинг, майнинг bitcoin бесплатно, онлайн майнинг бесплатно, крипто майнер, приложение для криптомайнинга, программа для майнинга bitcoin, майнинг монет, аренда хешрейта',
    ogTitle: 'Запустить Бесплатный облачный майнинг: Bitcoin Mining бесплатно и $25 Бонус',
    ogDescription: 'Начните Майнинг монет и зарабатывайте Bitcoin! Бесплатный онлайн майнинг без проблем с оборудованием.'
  },
  // --- ARAPÇA (AR) - Optimize Edildi ---
  ar: {
    title: 'تعدين سحابي مجاني | تعدين البيتكوين مجاني - أفضل خدمة مُعدِّن العملات',
    description: 'ابدأ التعدين السحابي المجاني واكسب البيتكوين مجانًا يوميًا. منصة مُعدِّن العملات المشفرة موثوقة توفر تجربة تطبيق تعدين ممتازة. احصل على مكافأة 25 دولار الآن!',
    keywords: 'تعدين سحابي مجاني, تعدين البيتكوين مجاني, تعدين مجاني عبر الإنترنت, مُعدِّن العملات المشفرة, تطبيق تعدين العملات المشفرة, برنامج تعدين البيتكوين, تعدين العملات, تأجير قوة التجزئة',
    ogTitle: 'ابدأ التعدين السحابي المجاني: تعدين البيتكوين مجاني ومكافأة 25 دولار',
    ogDescription: 'ابدأ تعدين العملات واكسب البيتكوين! التعدين المجاني عبر الإنترنت بدون متاعب المعدات.'
  },
  // --- ÇİNCE (ZH) - Optimize Edildi ---
  zh: {
    title: '免费云挖矿 | 免费比特币挖矿 - 最佳加密矿工 服务',
    description: '通过免费在线挖矿开始每日免费比特币挖矿收入。可靠的加密挖矿应用体验，无需复杂的比特币挖矿程序。立即领取 25 美元奖励！',
    keywords: '免费云挖矿, 免费比特币挖矿, 免费在线挖矿, 加密矿工, 加密挖矿应用, 比特币挖矿程序, 代币挖矿, 算力租赁',
    ogTitle: '启动免费云挖矿: 免费比特币挖矿和 25 美元奖励机会',
    ogDescription: '立即开始代币挖矿并赚取比特币！免费在线挖矿，无需担心硬件问题。'
  }
};

export const SEOHead: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const content = seoContent[language] || seoContent['en'];

    document.title = content.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', content.description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', content.keywords);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', content.ogTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', content.ogDescription);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', content.ogTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', content.ogDescription);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://www.freecloudminer.com/${language}/`);
    }
  }, [language]);

  return null;
};
