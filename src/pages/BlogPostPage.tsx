// src/pages/BlogPostPage.tsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      // SEO optimizations
      document.title = `${post.title} | FreeCloudMiner Blog`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt);
      }

      // Add structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "datePublished": post.publishDate,
        "image": post.image,
        "publisher": {
          "@type": "Organization",
          "name": "FreeCloudMiner"
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Blog yazısı bulunamadı</h1>
          <Link to="/blog" className="text-blue-400 hover:text-blue-300">
            Blog sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back to blog */}
        <Link 
          to="/blog"
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Blog'a Dön</span>
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <span>{post.readTime}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Share2 className="h-4 w-4 text-gray-400" />
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
        </header>

        {/* Post Content */}
        <article className="prose prose-lg prose-invert max-w-none">
          <div 
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Posts */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-6">İlgili Yazılar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all block"
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
