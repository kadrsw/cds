import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { PlusCircle, FileEdit as Edit, Trash2, Eye, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  readTime: string;
  category: string;
  tags: string[];
  publishedAt: string;
  status: 'draft' | 'published';
  language: string;
}

export const BlogManagePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    author: user?.email || '',
    readTime: '5 min',
    category: 'Cloud Mining',
    tags: [],
    status: 'draft',
    language: 'tr'
  });

  const handleSavePost = async () => {
    if (!editingPost.title || !editingPost.content) {
      toast.error('Başlık ve içerik zorunludur');
      return;
    }

    try {
      const newPost: BlogPost = {
        id: editingPost.id || Date.now().toString(),
        title: editingPost.title,
        slug: editingPost.slug || editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: editingPost.excerpt || '',
        content: editingPost.content,
        imageUrl: editingPost.imageUrl || '/images/blog/default.jpg',
        author: editingPost.author || user?.email || 'Admin',
        readTime: editingPost.readTime || '5 min',
        category: editingPost.category || 'Cloud Mining',
        tags: editingPost.tags || [],
        publishedAt: editingPost.publishedAt || new Date().toISOString(),
        status: editingPost.status || 'draft',
        language: editingPost.language || 'tr'
      };

      if (editingPost.id) {
        setPosts(posts.map(p => p.id === editingPost.id ? newPost : p));
        toast.success('Blog yazısı güncellendi');
      } else {
        setPosts([...posts, newPost]);
        toast.success('Blog yazısı oluşturuldu');
      }

      setIsEditing(false);
      setEditingPost({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        author: user?.email || '',
        readTime: '5 min',
        category: 'Cloud Mining',
        tags: [],
        status: 'draft',
        language: 'tr'
      });
    } catch (error) {
      toast.error('Kaydetme sırasında hata oluştu');
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      setPosts(posts.filter(p => p.id !== postId));
      toast.success('Blog yazısı silindi');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      author: user?.email || '',
      readTime: '5 min',
      category: 'Cloud Mining',
      tags: [],
      status: 'draft',
      language: 'tr'
    });
  };

  if (!user?.isAdmin) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Erişim Reddedildi</h1>
        <p className="text-gray-300">Bu sayfaya erişim yetkiniz yok.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Blog Yönetimi</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Yeni Yazı</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editingPost.id ? 'Yazıyı Düzenle' : 'Yeni Yazı Oluştur'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Başlık</label>
              <input
                type="text"
                value={editingPost.title || ''}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Blog yazısı başlığı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Slug (URL)</label>
              <input
                type="text"
                value={editingPost.slug || ''}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="blog-yazisi-url"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Özet</label>
              <textarea
                value={editingPost.excerpt || ''}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Kısa özet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">İçerik</label>
              <textarea
                value={editingPost.content || ''}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                rows={12}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Blog içeriği (Markdown desteklenir)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Görsel URL</label>
                <input
                  type="text"
                  value={editingPost.imageUrl || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/images/blog/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Kategori</label>
                <input
                  type="text"
                  value={editingPost.category || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cloud Mining"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Okuma Süresi</label>
                <input
                  type="text"
                  value={editingPost.readTime || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5 min"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dil</label>
                <select
                  value={editingPost.language || 'tr'}
                  onChange={(e) => setEditingPost({ ...editingPost, language: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="ru">Русский</option>
                  <option value="ar">العربية</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Durum</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="draft"
                    checked={editingPost.status === 'draft'}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as 'draft' | 'published' })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Taslak</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    value="published"
                    checked={editingPost.status === 'published'}
                    onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as 'draft' | 'published' })}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Yayınlanmış</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleSavePost}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Save className="h-5 w-5" />
                <span>Kaydet</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
                <span>İptal</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-12 border border-gray-700 text-center">
              <p className="text-gray-400 text-lg">Henüz blog yazısı eklenmedi.</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                İlk yazıyı oluştur
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{post.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.status === 'published'
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-yellow-600/20 text-yellow-400'
                      }`}>
                        {post.status === 'published' ? 'Yayınlanmış' : 'Taslak'}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{post.excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-600/20 rounded-lg transition-all"
                      title="Düzenle"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-600/20 rounded-lg transition-all"
                      title="Sil"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="mt-8 bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
        <p className="text-yellow-200 text-sm">
          <strong>Not:</strong> Blog yazıları şu anda geçici olarak tarayıcıda saklanmaktadır.
          Supabase veritabanı bağlantısı kurulduğunda veriler kalıcı olarak saklanacaktır.
        </p>
      </div>
    </div>
  );
};
