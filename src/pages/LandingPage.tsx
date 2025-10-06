// src/pages/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageSelector } from '../components/LanguageSelector';
import { SEOHead } from '../components/SEOHead';
import { Hammer, Shield, Zap, DollarSign, Target, RotateCcw, Smartphone, AlertTriangle, Lock, Users, CheckCircle, Server, Cpu } from 'lucide-react';
import { SecurityBanner } from '../components/SecurityBanner';

export const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.landing-header');
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Donanım olmadan Free Cloud Mining ile Bitcoin madenciliği nasıl yapılır?",
      answer: "FreeCloudMiner ile donanım satın almadan hash gücü kiralayarak Online Free Mining yapabilirsiniz. Cloud mining free platformumuz sayesinde pahalı ASIC madencileri veya karmaşık Bitcoin mining programı gereksinimi ortadan kalkar. Güvenli Crypto Miner sistemimizle sadece hesap açın, paket seçin ve günlük Coin Mining ile Bitcoin kazanmaya başlayın."
    },
    {
      question: "Hash Gücü Kiralama (Cloud Mining) Nedir?",
      answer: "Hash Gücü Kiralama, güçlü kripto miner donanımlarının işlem gücünü belirli bir süre için kiralamaktır. Bu, sizin adınıza Bitcoin mining yapan bir program gibi çalışır. Kendi pahalı ASIC madencinize sahip olmadan, profesyonel Cloud Mining çiftliklerinin gücünden yararlanarak Bitcoin ve diğer Coin Mining işlemlerini güvenle yapabilirsiniz."
    },
    {
      question: "Günlük Bitcoin Mining Free Kazanç Ödemeleri Nasıl Çalışır?",
      answer: "Kiraladığınız hash gücü oranında günlük Bitcoin Mining Free kazançlarınız hesaplanır ve otomatik olarak bakiyenize eklenir. Sistemimiz, tıpkı bir Crypto Mining App gibi, tüm hesaplamaları sizin yerinize yapar. Minimum $10 tutarından itibaren para çekme talebinde bulunabilirsiniz. Ödemeler 24-48 saat içinde USDT olarak cüzdanınıza güvenle gönderilir."
    },
    {
      question: "Bulut Madencilik (Online Free Mining) Teknik Bilgi Gerektirir mi?",
      answer: "Hayır! Online Free Mining platformumuz tamamen kullanıcı dostudur. Bitcoin Mining Programı kurmaya, teknik bilgiye, donanım kurulumuna veya elektrik altyapısına gerek yok. Sadece hesap açın, paketi seçin ve pasif gelir elde etmeye başlayın. Platformumuz, bir Crypto Mining App kadar basit ve kullanıcı dostudur; mobil cihazınızdan bile kolayca yönetebilirsiniz."
    },
    {
      question: "ASIC madenci alternatifi Cloud Mining Free hizmeti güvenli midir?",
      answer: "Evet, Cloud Mining Free platformumuz güvenliğiniz için SSL şifreleme, iki faktörlü doğrulama (2FA) ve soğuk cüzdan saklama ile üst düzeyde korunur. Kendi ASIC madenci cihazınızı almaktan ve yönetmekten çok daha güvenli ve pratiktir. Siz, bir Bitcoin Mining Programı veya fiziksel donanım kaynaklı risklerle (elektrik kesintisi, donanım arızası, bakım) uğraşmazsınız. Güvenli bir Crypto Miner hizmeti sunarız."
    },
    {
      question: "Pasif Gelir Coin Mining Ne Kadar Kazandırır?",
      answer: "Kazançlar, kiraladığınız hash gücü miktarına ve kripto fiyatlarına göre değişir. Ancak Coin Mining ile pasif gelir elde etmek için başlangıç paketimizle günlük yaklaşık $2.99, profesyonel paketimizle ise $9.03 kazanç sağlayabilirsiniz. Üstelik bu Cloud Mining Free hizmetinde hiçbir işlem yapmanız gerekmez; kazançlarınız tamamen pasif gelir olarak hesaplanır."
    },
    {
      question: "Mobil Cihazdan Crypto Mining App Deneyimiyle Bitcoin Madenciliği Yapabilir miyim?",
      answer: "Evet! Platformumuz tamamen mobil uyumlu olup, herhangi bir Bitcoin Mining Programı kurmanıza gerek kalmadan çalışır. Crypto Mining App deneyimi yaşamanız için PWA desteği sunuyoruz. Android ve iOS cihazlarınızdan Cloud Miner Free durumunuzu takip edebilir, kazançlarınızı görüntüleyebilir ve para çekme işlemleri yapabilirsiniz. Cebinizden Online Free Mining kolaylığını yaşayın!"
    }
  ];

  return (
    <div className="landing-page min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <SEOHead />
      {/* Header */}
      <header className="landing-header fixed top-0 w-full z-50 transition-all duration-300 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center py-3" role="navigation" aria-label="Ana navigasyon">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Hammer className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">FreeCloudMiner</h1>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="/blog" className="text-gray-300 hover:text-white transition-colors">{t('blog')}</a>
              <a href="#özellikler" className="text-gray-300 hover:text-white transition-colors">{t('features')}</a>
              <a href="#madencilik" className="text-gray-300 hover:text-white transition-colors">{t('mining')}</a>
              <a href="#paketler" className="text-gray-300 hover:text-white transition-colors">{t('packages2')}</a>
              <a href="#sss" className="text-gray-300 hover:text-white transition-colors">{t('faq')}</a>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-32 sm:w-40">
                <LanguageSelector />
              </div>

              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 sm:px-6 text-xs sm:text-base rounded-lg font-semibold transition-all whitespace-nowrap"
                aria-label={t('freeBonus')}
              >
                {t('freeBonus')}
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section - Competitor Optimized */}
        <section className="pt-24 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" aria-hidden="true"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                {t('heroTitle')}
              </h2>

              <p className="text-base sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                {t('heroSubtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4">
                <Link
                  to="/auth"
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  aria-label={t('freeBonus')}
                >
                  <span>🎁</span>
                  <span>{t('freeBonus')}</span>
                </Link>

                <a
                  href="#özellikler"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-xl font-semibold transition-all text-center"
                  aria-label={t('howItWorks')}
                >
                  {t('howItWorks')}
                </a>
              </div>
              
              {/* Stats Grid - Competitor Analysis Enhanced */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto px-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-6 border border-white/20">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2">2,500+</h3>
                  <p className="text-gray-300 text-xs sm:text-base">Aktif Hash Madenci</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-6 border border-white/20">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 mb-1 sm:mb-2">€250K+</h3>
                  <p className="text-gray-300 text-xs sm:text-base">Günlük Bitcoin Ödemesi</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-6 border border-white/20">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">24/7</h3>
                  <p className="text-gray-300 text-xs sm:text-base">Otomatik Madencilik</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-6 border border-white/20">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 mb-1 sm:mb-2">0</h3>
                  <p className="text-gray-300 text-xs sm:text-base">Teknik Bilgi Gerekli</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced with competitor insights */}
        <section id="özellikler" className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">{t('whyChooseUs')}</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                {t('heroSubtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t('secureTitle')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('secureDesc')}
                </p>
              </article>

              <article className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t('highPerformanceTitle')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('highPerformanceDesc')}
                </p>
              </article>

              <article className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t('dailyPaymentsTitle')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('dailyPaymentsDesc')}
                </p>
              </article>

              <article className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t('easyToUseTitle')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('easyToUseDesc')}
                </p>
              </article>

              <article className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t('transparentTitle')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('transparentDesc')}
                </p>
              </article>

              <article className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t('support247Title')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('support247Desc')}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Supported Coins - Enhanced SEO */}
        <section id="madencilik" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">Cloud Miner ile Hash Gücü Kiralama Destekli Kriptolar</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Donanım olmadan en popüler kripto paraların Coin Mining işlemlerini yapın. Güvenilir Crypto Miner hizmetimizle her kripto için optimize edilmiş hash gücü kiralama paketlerimiz mevcuttur.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:border-orange-500/50 transition-all hover:transform hover:scale-105">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br from-orange-400 to-orange-600">
                  ₿
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Bitcoin</h3>
                <p className="text-gray-400 mb-4">BTC</p>
                <div className="bg-green-600/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                  Günlük %0.15 ROI
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br from-blue-500 to-indigo-600">
                  Ξ
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Ethereum</h3>
                <p className="text-gray-400 mb-4">ETH</p>
                <div className="bg-green-600/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                  Günlük %0.18 ROI
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:border-yellow-500/50 transition-all hover:transform hover:scale-105">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br from-yellow-500 to-yellow-600">
                  Đ
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Dogecoin</h3>
                <p className="text-gray-400 mb-4">DOGE</p>
                <div className="bg-green-600/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                  Günlük %0.12 ROI
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 hover:border-gray-500/50 transition-all hover:transform hover:scale-105">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br from-gray-400 to-gray-600">
                  Ł
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Litecoin</h3>
                <p className="text-gray-400 mb-4">LTC</p>
                <div className="bg-green-600/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                  Günlük %0.14 ROI
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-300 mb-4">Yakında daha fazla kripto para hash gücü kiralama seçeneği...</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-400">
                <span>• Cardano (ADA)</span>
                <span>• Polkadot (DOT)</span>
                <span>• Solana (SOL)</span>
                <span>• Avalanche (AVAX)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section - Keeping original as requested */}
        <section id="paketler" className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">Bitcoin Mining Program Alternatifi Cloud Mining Paketleri</h2>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
               Online Free Mining deneyimine başlamak için size en uygun paketi seçin ve pasif Bitcoin Mining Free geliri kazanmaya hemen başlayın.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-all hover:transform hover:scale-105">
                <h3 className="text-2xl font-bold text-white text-center mb-4">Başlangıç</h3>
                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-blue-400">$99</span>
                  <span className="text-gray-400 text-xl">/90 gün</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">90 gün madencilik</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">61.92TH/s hash gücü</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">Günlük ~$2.99 kazanç</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">Haftalık para çekme</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">Email destek</span>
                  </li>
                </ul>
                <Link 
                  to="/auth"
                  className="w-full block text-center py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
                  aria-label="Başlangıç paketini seç"
                >
                  Paketi Seç
                </Link>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border-2 border-blue-500 transition-all hover:transform hover:scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <span>👑</span>
                  <span>En Popüler</span>
                </div>
                <h3 className="text-2xl font-bold text-white text-center mb-4 mt-4">Profesyonel</h3>
                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-blue-400">$299</span>
                  <span className="text-gray-400 text-xl">/90 gün</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">90 gün madencilik</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">187.01TH/s hash gücü</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">Günlük ~$9.03 kazanç</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">Günlük para çekme</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">Öncelikli destek</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">Bonus %5 kazanç</span>
                  </li>
                </ul>
                <Link 
                  to="/auth"
                  className="w-full block text-center py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
                  aria-label="Profesyonel paketini seç"
                >
                  Paketi Seç
                </Link>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-all hover:transform hover:scale-105">
                <h3 className="text-2xl font-bold text-white text-center mb-4">Kurumsal</h3>
                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-blue-400">$599</span>
                  <span className="text-gray-400 text-xl">/90 gün</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">90 gün madencilik</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">312.10TH/s hash gücü</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">Günlük ~$18.08 kazanç</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">Anlık para çekme</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">VIP Türkçe destek</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-gray-300">Bonus %10 kazanç</span>
                  </li>
                </ul>
                <Link 
                  to="/auth"
                  className="w-full block text-center py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
                  aria-label="Kurumsal paketini seç"
                >
                  Paketi Seç
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Enhanced with competitor keywords */}
        <section id="sss" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">Cloud Mining Free ve Bitcoin Mining Program Sık Sorulan Sorular</h2>
              <p className="text-base sm:text-xl text-gray-300">
               Crypto Miner hizmetimiz, hash gücü kiralama ve Online Free Mining hakkında merak edilenler. Tüm Coin Mining ve pasif gelir sorularınızın cevapları burada.
              </p>
            </div>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-semibold text-white text-lg">{faq.question}</span>
                    <span className="text-2xl text-blue-400 font-bold">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div id={`faq-answer-${index}`} className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-300 mb-4">
                Cloud Mining Free veya Bitcoin Mining Program alternatifleri hakkında başka sorularınız mı var? 7/24 Türkçe destek ekibimiz, güvenilir Crypto Miner hizmetimiz ve hash gücü kiralama konusunda size yardımcı olmaya hazır.
              </p>
              <a 
                href="mailto:freecloudeminer1@gmail.com" 
                className="inline-flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-6 py-3 rounded-lg transition-colors"
              >
                <span>📧</span>
                <span>freecloudeminer1@gmail.com</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight px-4">
              Bitcoin Mining Free ile Pasif Kazanç Sağlamaya Hemen Başla!
            </h2>
            <p className="text-base sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
              Cloud Mining Free hizmetimizle pasif gelir Coin Mining deneyimine başlayın. $25 ücretsiz bonus ile ASIC alternatifi güvenilir Crypto Miner hizmetimizi hemen deneyimleyin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Link
                to="/auth"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-3 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-xl font-bold transition-all shadow-lg hover:shadow-xl text-center"
                aria-label="Bitcoin kazanmaya ücretsiz başla"
              >
                <span>🚀</span>
                <span className="text-xs sm:text-base">Cloud Mining Free Başlat - Ücretsiz $25 Bonus Al</span>
              </Link>
              <a
                href="mailto:freecloudeminer1@gmail.com"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 border-2 border-white text-white hover:bg-white hover:text-gray-900 px-4 py-3 sm:px-6 sm:py-4 rounded-xl text-sm sm:text-lg font-semibold transition-all"
              >
                <span>💬</span>
                <span>Hash Gücü Desteği</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Enhanced with Risk Warnings */}
      <footer className="bg-black/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Hammer className="h-8 w-8 text-blue-400" />
              <span className="text-3xl font-bold text-white">FreeCloudMiner</span>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              FreeCloudMiner: Donanım gerektirmeyen Cloud Mining Free ve Bitcoin Mining Program alternatifiniz. Güvenilir Crypto Miner hizmeti ile pasif gelir Coin Mining yapın.
            </p>
          </div>
          
          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Bulut Madencilik</h3>
              <nav className="space-y-2">
                <a href="#özellikler" className="block text-gray-300 hover:text-white transition-colors">Hash Gücü Kiralama</a>
                <a href="#madencilik" className="block text-gray-300 hover:text-white transition-colors">Bitcoin Kazan</a>
                <a href="#paketler" className="block text-gray-300 hover:text-white transition-colors">Madencilik Paketleri</a>
                <a href="#sss" className="block text-gray-300 hover:text-white transition-colors">SSS</a>
              </nav>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Şirket</h3>
              <nav className="space-y-2">
                <a href="/hakkimizda" className="block text-gray-300 hover:text-white transition-colors">Hakkımızda</a>
                <a href="/guvenlik" className="block text-gray-300 hover:text-white transition-colors">Güvenlik</a>
                <a href="/kariyer" className="block text-gray-300 hover:text-white transition-colors">Kariyer</a>
                <a href="/basin" className="block text-gray-300 hover:text-white transition-colors">Basın Kiti</a>
              </nav>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Destek</h3>
              <nav className="space-y-2">
                <a href="/yardim" className="block text-gray-300 hover:text-white transition-colors">Yardım Merkezi</a>
                <a href="/iletisim" className="block text-gray-300 hover:text-white transition-colors">İletişim</a>
                <a href="/blog" className="block text-gray-300 hover:text-white transition-colors">Blog</a>
                <a href="mailto:freecloudeminer1@gmail.com" className="block text-gray-300 hover:text-white transition-colors">E-posta Destek</a>
              </nav>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Yasal</h3>
              <nav className="space-y-2">
                <a href="/gizlilik-politikasi" className="block text-gray-300 hover:text-white transition-colors">Gizlilik Politikası</a>
                <a href="/kullanim-sartlari" className="block text-gray-300 hover:text-white transition-colors">Kullanım Şartları</a>
                <a href="/cerez-politikasi" className="block text-gray-300 hover:text-white transition-colors">Çerez Politikası</a>
                <a href="/risk-bildirimi" className="block text-gray-300 hover:text-white transition-colors">Risk Bildirimi</a>
              </nav>
            </div>
          </div>

          {/* Risk Warning - Simplified */}
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-600/30 rounded-lg p-4 backdrop-blur-md">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-yellow-200 font-semibold text-sm mb-1">Risk Uyarısı</h3>
                  <p className="text-yellow-100 text-sm leading-relaxed">
                    Kripto para yatırımları yüksek risk içerir. Sadece kaybetmeyi göze alabileceğiniz miktarlarda yatırım yapın.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400">
                &copy; 2024 FreeCloudMiner GmbH. Tüm hakları saklıdır.
              </p>
              <div className="flex items-center space-x-6">
                <a href="https://twitter.com/FreeCloudMiner" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a href="https://www.linkedin.com/company/freecloudminer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <span className="sr-only">LinkedIn</span>
                  💼
                </a>
                <a href="https://t.me/freecloudminer" className="text-gray-400 hover:text-white transition-colors" aria-label="Telegram">
                  <span className="sr-only">Telegram</span>
                  📱
                </a>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-500 text-sm">
                Berliner Allee 12, 40212 Düsseldorf, Germany | E-posta: freecloudeminer1@gmail.com
              </p>
              <p className="text-yellow-400 text-xs mt-2 font-semibold">
                BaFin tarafından düzenlenmemiştir. Donanım olmadan Bitcoin madenciliği yüksek risk içerir.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
