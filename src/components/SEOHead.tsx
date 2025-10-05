import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

interface SEOContent {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
}

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
    title: 'تعدين سحابي مجاني | تعدين البيتكوين مجاني - أفضل خدمة مُعدِّن العملات',
    description: 'ابدأ التعدين السحابي المجاني واكسب البيتكوين مجانًا يوميًا. منصة مُعدِّن العملات المشفرة موثوقة توفر تجربة تطبيق تعدين ممتازة. احصل على مكافأة 25 دولار الآن!',
    keywords: 'تعدين سحابي مجاني, تعدين البيتكوين مجاني, تعدين مجاني عبر الإنترنت, مُعدِّن العملات المشفرة, تطبيق تعدين العملات المشفرة, برنامج تعدين البيتكوين, تعدين العملات, تأجير قوة التجزئة',
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

interface SEOHeadProps {
  // Blog sayfaları için override edilebilir SEO bilgileri
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
  customOgImage?: string;
  isArticle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  customTitle,
  customDescription,
  customKeywords,
  customOgImage,
  isArticle = false,
  publishedTime,
  modifiedTime,
  breadcrumbs
}) => {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const content = seoContent[language] || seoContent['en'];

    // Title belirleme - custom varsa onu kullan, yoksa default
    const finalTitle = customTitle || content.title;
    document.title = finalTitle;

    // Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', customDescription || content.description);
    }

    // Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', customKeywords || content.keywords);
    }

    // Open Graph Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', customTitle || content.ogTitle);
    }

    // Open Graph Description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', customDescription || content.ogDescription);
    }

    // Open Graph Image
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && customOgImage) {
      ogImage.setAttribute('content', customOgImage);
    }

    // Open Graph Type
    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', isArticle ? 'article' : 'website');
    }

    // Twitter Title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', customTitle || content.ogTitle);
    }

    // Twitter Description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', customDescription || content.ogDescription);
    }

    // ✅ DÜZELTME: Canonical URL - Dil prefix'i KALDIRILDI
    // Dropdown dil sistemi kullanıldığı için URL değişmiyor
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      // Gerçek URL'i kullan (dil prefix'siz)
      const baseUrl = 'https://www.freecloudminer.com';
      const currentPath = location.pathname;
      canonical.setAttribute('href', `${baseUrl}${currentPath}`);
    }

    // Article meta tags (blog yazıları için)
    if (isArticle && publishedTime) {
      let articlePublished = document.querySelector('meta[property="article:published_time"]');
      if (!articlePublished) {
        articlePublished = document.createElement('meta');
        articlePublished.setAttribute('property', 'article:published_time');
        document.head.appendChild(articlePublished);
      }
      articlePublished.setAttribute('content', publishedTime);
    }

    if (isArticle && modifiedTime) {
      let articleModified = document.querySelector('meta[property="article:modified_time"]');
      if (!articleModified) {
        articleModified = document.createElement('meta');
        articleModified.setAttribute('property', 'article:modified_time');
        document.head.appendChild(articleModified);
      }
      articleModified.setAttribute('content', modifiedTime);
    }

    // Breadcrumb Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      // Mevcut breadcrumb script'i kaldır
      const existingBreadcrumb = document.querySelector('script[data-breadcrumb="true"]');
      if (existingBreadcrumb) {
        existingBreadcrumb.remove();
      }

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-breadcrumb', 'true');
      script.innerHTML = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    }

    // Article Schema (blog yazıları için)
    if (isArticle && customTitle) {
      // Mevcut article script'i kaldır
      const existingArticle = document.querySelector('script[data-article="true"]');
      if (existingArticle) {
        existingArticle.remove();
      }

      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": customTitle,
        "description": customDescription || content.description,
        "image": customOgImage || "https://www.freecloudminer.com/og-image.jpg",
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "url": `https://www.freecloudminer.com${location.pathname}`,
        "inLanguage": language,
        "author": {
          "@type": "Organization",
          "name": "FreeCloudMiner GmbH"
        },
        "publisher": {
          "@type": "Organization",
          "name": "FreeCloudMiner GmbH",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.freecloudminer.com/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.freecloudminer.com${location.pathname}`
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-article', 'true');
      script.innerHTML = JSON.stringify(articleSchema);
      document.head.appendChild(script);
    }
  }, [language, location, customTitle, customDescription, customKeywords, customOgImage, isArticle, publishedTime, modifiedTime, breadcrumbs]);

  return null;
};
