import React, { useState } from 'react'

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
  
      const faqData = [
        {
          question: "What is this platform about?",
          answer:
            "This platform helps users find the best listings for their needs, including detailed information and images.",
        },
        {
          question: "How can I add a new listing?",
          answer:
            "You can add a new listing by signing into your account, navigating to the CreateListingPage,fill the form and click on Createlisiting"
        },
        {
          question: "Is this platform free to use?",
          answer:
            "Yes, the platform is free for browsing. However, premium features may require a subscription.",
        },
        {
          question: "How do I contact support?",
          answer:
            "You can contact support by emailing support@example.com or using the live chat feature on our website.",
        },
        {
          question: "Can I edit my listings after posting?",
          answer:
            "Yes, you can edit your listings by going to your account dashboard and selecting the listing you want to modify.",
        },
      ];
    
      const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
      };
    
      return (
        <div className="faq-container max-w-4xl mx-auto p-6 bg-white text-blue-950 rounded-lg shadow-md mt-20">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="faq-item border-b border-gray-300 py-4"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="faq-question w-full text-left text-lg font-medium flex justify-between items-center"
                >
                  {item.question}
                  <span className="text-gray-500">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <p className="faq-answer mt-2 text-gray-700">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    };
    

export default FAQ