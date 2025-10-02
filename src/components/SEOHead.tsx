import { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface SEOContent {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
}

const seoContent: Record<string, SEOContent> = {
  tr: {
    title: 'Donanım Olmadan Bitcoin Madenciliği | FreeCloudMiner - Hash Gücü Kiralama',
    description: 'Donanım olmadan Bitcoin madenciliği! Hash gücü kiralama ile günlük Bitcoin kazan. Bulut madencilik Türkiye platformu. ASIC alternatifi, teknik bilgi gerektirmez.',
    keywords: 'donanım olmadan bitcoin madenciliği, hash gücü kiralama, bitcoin kazan, bulut madencilik türkiye, pasif gelir kripto, kripto para kazanma',
    ogTitle: 'Donanım Olmadan Bitcoin Madenciliği - Hash Gücü Kiralama',
    ogDescription: 'Bitcoin kazan! Donanım olmadan bulut madencilik. Hash gücü kiralama ile günlük pasif gelir.'
  },
  en: {
    title: 'Bitcoin Mining Without Hardware | FreeCloudMiner - Hash Power Rental',
    description: 'Start Bitcoin mining without hardware! Earn daily Bitcoin through hash power rental. Cloud mining platform. ASIC alternative, no technical knowledge required.',
    keywords: 'bitcoin mining without hardware, hash power rental, earn bitcoin, cloud mining, passive crypto income, cryptocurrency earning',
    ogTitle: 'Bitcoin Mining Without Hardware - Hash Power Rental',
    ogDescription: 'Earn Bitcoin! Cloud mining without hardware. Daily passive income through hash power rental.'
  },
  de: {
    title: 'Bitcoin-Mining ohne Hardware | FreeCloudMiner - Hash-Power-Vermietung',
    description: 'Bitcoin-Mining ohne Hardware starten! Verdienen Sie täglich Bitcoin durch Hash-Power-Vermietung. Cloud-Mining-Plattform. ASIC-Alternative, keine technischen Kenntnisse erforderlich.',
    keywords: 'bitcoin mining ohne hardware, hash power mieten, bitcoin verdienen, cloud mining, passives krypto einkommen, kryptowährung verdienen',
    ogTitle: 'Bitcoin-Mining ohne Hardware - Hash-Power-Vermietung',
    ogDescription: 'Bitcoin verdienen! Cloud-Mining ohne Hardware. Tägliches passives Einkommen durch Hash-Power-Vermietung.'
  },
  ru: {
    title: 'Майнинг Bitcoin без оборудования | FreeCloudMiner - Аренда хешрейта',
    description: 'Начните майнинг Bitcoin без оборудования! Зарабатывайте Bitcoin ежедневно через аренду хешрейта. Платформа облачного майнинга. Альтернатива ASIC, технические знания не требуются.',
    keywords: 'майнинг биткоин без оборудования, аренда хешрейта, заработок биткоин, облачный майнинг, пассивный доход криптовалюта',
    ogTitle: 'Майнинг Bitcoin без оборудования - Аренда хешрейта',
    ogDescription: 'Зарабатывайте Bitcoin! Облачный майнинг без оборудования. Ежедневный пассивный доход через аренду хешрейта.'
  },
  ar: {
    title: 'تعدين البيتكوين بدون معدات | FreeCloudMiner - تأجير قوة التجزئة',
    description: 'ابدأ تعدين البيتكوين بدون معدات! اكسب البيتكوين يوميًا من خلال تأجير قوة التجزئة. منصة التعدين السحابي. بديل ASIC، لا تتطلب معرفة تقنية.',
    keywords: 'تعدين البيتكوين بدون معدات, تأجير قوة التجزئة, كسب البيتكوين, التعدين السحابي, دخل سلبي من العملات المشفرة',
    ogTitle: 'تعدين البيتكوين بدون معدات - تأجير قوة التجزئة',
    ogDescription: 'اكسب البيتكوين! التعدين السحابي بدون معدات. دخل سلبي يومي من خلال تأجير قوة التجزئة.'
  },
  zh: {
    title: '无需硬件即可挖掘比特币 | FreeCloudMiner - 算力租赁',
    description: '无需硬件即可开始比特币挖矿！通过算力租赁每天赚取比特币。云挖矿平台。ASIC替代方案，无需技术知识。',
    keywords: '无硬件比特币挖矿, 算力租赁, 赚取比特币, 云挖矿, 被动加密货币收入, 加密货币赚钱',
    ogTitle: '无需硬件即可挖掘比特币 - 算力租赁',
    ogDescription: '赚取比特币！无需硬件的云挖矿。通过算力租赁获得每日被动收入。'
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
