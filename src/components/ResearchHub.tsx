import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Edit3, BookOpen, PenTool, Coins, FileText, Book, PenTool as Tool } from 'lucide-react';

const ResearchHub = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'writing', name: 'Scientific Writing' },
    { id: 'review', name: 'Peer Review' },
    { id: 'guides', name: 'Research Guides' },
    { id: 'tools', name: 'Publication Tools' },
    { id: 'funding', name: 'Funding' },
  ];

  const resources = [
    {
      icon: Edit3,
      title: 'Middlebury Scientific Writing Resources',
      description: 'Comprehensive guide for academic writing excellence with templates and examples.',
      tags: ['writing', 'academic'],
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400',
      category: 'writing',
    },
    {
      icon: PenTool,
      title: 'CSTE Scientific Writing Toolkit',
      description: 'Professional toolkit with advanced writing techniques and peer review guidelines.',
      tags: ['writing', 'toolkit'],
      image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=400',
      category: 'writing',
    },
    {
      icon: BookOpen,
      title: 'Equator Network Resources',
      description: 'Essential guidelines and checklists for health research reporting standards.',
      tags: ['tools', 'health'],
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
      category: 'tools',
    },
    {
      icon: Coins,
      title: 'Research Funding Opportunities',
      description: 'Latest grants and funding programs for innovative research projects.',
      tags: ['funding', 'grants'],
      video: 'https://player.vimeo.com/video/123456789',
      category: 'funding',
    },
    {
      icon: FileText,
      title: 'Peer Review Guidelines',
      description: 'Comprehensive guide for conducting effective peer reviews.',
      tags: ['review', 'guidelines'],
      image: 'https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?auto=format&fit=crop&q=80&w=400',
      category: 'review',
    },
    {
      icon: Book,
      title: 'Research Methodology Guide',
      description: 'Step-by-step guide to research methodologies across disciplines.',
      tags: ['guides', 'methodology'],
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
      category: 'guides',
    },
    {
      icon: Tool,
      title: 'Publication Tools Collection',
      description: 'Curated collection of tools for manuscript preparation and submission.',
      tags: ['tools', 'publication'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400',
      category: 'tools',
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeFilter === 'all' || resource.category === activeFilter;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Resources Hub</h2>
          <p className="text-xl text-gray-600">Discover curated tools, guides, and opportunities to enhance your research journey</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeFilter === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {resource.video ? (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={resource.video}
                    className="w-full h-48 object-cover"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  <resource.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-50 text-primary-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>
    </section>
  );
};

export default ResearchHub;