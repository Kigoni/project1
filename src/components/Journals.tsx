import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, FileText, Newspaper, ArrowRight } from 'lucide-react';

const Journals = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const sections = [
    {
      icon: BookOpen,
      title: 'Journals',
      description: 'A diverse collection of African journals from various disciplines, hosted on our platform.',
    },
    {
      icon: FileText,
      title: 'Articles',
      description: 'Insightful and scholarly works authored by African researchers, showcasing groundbreaking studies and innovations across diverse fields.',
    },
    {
      icon: Newspaper,
      title: 'Afrika Blog',
      description: 'Stay informed with our Grants & Updates, explore the latest trends in academic research, and catch up on essential news shaping the scholarly community.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Journals are available</h2>
          <p className="text-xl text-gray-600">African Research Excellence</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  <section.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>
                <p className="text-gray-600 mb-6">{section.description}</p>
                <button className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                  Explore More
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journals;