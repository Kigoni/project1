import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";
import { Disclosure } from "@headlessui/react";

const FAQ = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const faqs = [
    {
      question: "How can I explore African Journals?",
      answer:
        "You can explore African Journals through our comprehensive directory, advanced search features, and curated collections. Our platform provides easy navigation and filtering options to help you find relevant journals in your field of interest.",
    },
    {
      question: "What are Partner Repositories, and how do they work?",
      answer:
        "Partner Repositories are collaborative platforms that work with Afrika Journals to provide expanded access to research materials. These partnerships ensure broader coverage and easier access to African scholarly content.",
    },
    {
      question:
        "How does Afrika Journals's indexing system benefit researchers?",
      answer:
        "Our innovative indexing system categorizes and organizes research content effectively, making it easier to discover relevant materials. It includes advanced metadata, cross-referencing, and smart search capabilities.",
    },
    {
      question: "What role do Reviewers play on Afrika Journals?",
      answer:
        "Reviewers on Afrika Journals play a crucial role in maintaining quality standards. They evaluate submissions, provide feedback, and ensure the academic integrity of published content through our peer review process.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-yellow-500/5" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-600 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            We encourage our students, researchers, and professors to ask us any
            questions regarding our journals. Our skilled mentors are ready to
            answer all your questions 24/7.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Disclosure>
                {({ open }) => (
                  <div className=" border border-gray-200 rounded-lg">
                    <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-left">
                      <span className="font-semibold text-gray-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 py-4 text-gray-600 border-t border-gray-200">
                      {faq.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
