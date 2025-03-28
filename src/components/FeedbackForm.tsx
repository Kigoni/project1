import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import axios from 'axios';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', question: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await axios.post('https://backend.afrikajournals.org/journal_api/api/feedback/', formData);
      setStatus('success');
      setFormData({ name: '', email: '', question: '' });
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>

            {/* Form Title */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Send Feedback</h2>

            {/* Feedback Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-indigo-700 hover:to-purple-700 py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? 'Sending...' : <><Send size={18} /> Send Feedback</>}
              </button>

              {status === 'success' && <p className="text-green-600 text-center">Feedback sent successfully!</p>}
              {status === 'error' && <p className="text-red-600 text-center">Failed to send feedback. Please try again.</p>}
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackForm;
