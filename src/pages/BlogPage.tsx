// src/pages/BlogPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag, Hammer, Home } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { SEOHead } from '../components/SEOHead'; // ← Mevcut SEOHead import

export const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'beginner', name: 'Yeni Başlayanlar' },
    { id: 'advanced', name: 'İleri Seviye' },
    { id: 'security', name: 'Güvenlik' },
    { id: 'market', name: 'Piyasa Analizi' },
    { id: 'tutorial', name: 'Rehberler' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* ← Düzeltilmiş SEOHead kullanımı */}
      <SEOHead
        customTitle="Blog - Kripto Para Madenciliği Rehberleri | FreeCloudMiner"
        customDescription="Bitcoin, Ethereum, blockchain ve kripto para madenciliği hakkında güncel bilgiler, rehberler ve piyasa analizleri. Online free mining ve crypto miner detaylı rehberi."
        customKeywords="bitcoin madenciliği, ethereum madenciliği, cloud mining, kripto para rehberi, blockchain, bitcoin mining free, online free mining, crypto miner, coin mining"
        breadcrumbs={[
          { name: 'Ana Sayfa', url: 'https://www.freecloudminer.com' },
          { name: 'Blog', url: 'https://www.freecloudminer.com/blog' }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        {/* Header Navigation */}
        <header className="fixed top-0 w-full z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex justify-between items-center py-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Hammer className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">FreeCloudMiner</span>
              </Link>
              
              <div className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <Home className="h-4 w-4" />
                  <span>Ana Sayfa</span>
                </Link>
                <Link to="/blog" className="text-blue-400 font-semibold">Blog</Link>
                <Link to="/auth" className="text-gray-300 hover:text-white transition-colors">Giriş Yap</Link>
              </div>
              
              <Link 
                to="/auth" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Ücretsiz Başla
              </Link>
            </nav>
          </div>
        </header>

        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Cloud Miner ve Bitcoin Mining Free Detaylı Rehberi
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Online Free Mining, Bitcoin, blockchain ve Coin Mining hakkında güncel bilgiler, Crypto Miner rehberleri ve piyasa analizleri.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Blog yazılarında ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Post */}
            {filteredPosts.length > 0 && (
              <div className="mb-12">
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Tag className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-400 text-sm font-medium">Öne Çıkan</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">
                        {filteredPosts[0].title}
                      </h2>
                      <p className="text-gray-300 mb-6">
                        {filteredPosts[0].excerpt}
                      </p>
                      <div className="flex items-center space-x-4 mb-6 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{filteredPosts[0].publishDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{filteredPosts[0].author}</span>
                        </div>
                      </div>
                      <Link
                        to={`/blog/${filteredPosts[0].slug}`}
                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        <span>Devamını Oku</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <img
                        src={filteredPosts[0].image}
                        alt={filteredPosts[0].title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <article key={post.id} className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600/20 text-blue-400">
                        {categories.find(cat => cat.id === post.category)?.name}
                      </span>
                      <span className="text-gray-400 text-xs">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.publishDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center space-x-1"
                      >
                        <span>Oku</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Aradığınız kriterlere uygun blog yazısı bulunamadı.</p>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Kripto Dünyasından Haberdar Olun
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Yeni blog yazıları, piyasa analizleri ve önemli gelişmeler hakkında 
                e-posta güncellemeleri alın.
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                  Abone Ol
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
