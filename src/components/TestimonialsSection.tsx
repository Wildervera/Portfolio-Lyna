import React from 'react';

interface TestimonialData {
  text: string;
  author: string;
  role: string;
  avatar: string;
  avatarStyle?: React.CSSProperties;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: TestimonialData[] = [
    {
      text: "Lyna joined my team as a UI/UX Designer and quickly demonstrated a strong understanding of the project, along with a clear sense of leadership and professionalism. She played a key role in defining a clean, intuitive, and user-friendly UI/UX, and was always available to support the team when needed. I confidently recommend her for any UI/UX design project.",
      author: "Anis Moualhi",
      role: "Project Manager",
      avatar: "/testimonials/anis.webp"
    },
    {
      text: "Worked with Lyna for some US clients, she was so assertive proposing wireframes and layouts. She has a good method to spot missing aspect in old designs and proposing new ones improving user experience. She is clear communicating to the business and technical sides, delivers fast and proves knowledge domain in her area. Hope to work with her in other opportunities.",
      author: "Joseph Hernandez",
      role: "Full Stack Developer",
      avatar: "/testimonials/joseph hernandez.webp",
      avatarStyle: { objectPosition: 'center 20%', transform: 'scale(1.5)' }
    },
    {
      text: "Throughout the collaboration, Lyna demonstrated strong skills in both UX and UI design, creating solutions that were both visually appealing and user-focused. What stood out most was her receptiveness to feedback. She consistently approached revision requests with professionalism and a collaborative spirit, making the design iteration process smooth and productive.",
      author: "Harlen Giraldo",
      role: "Full Stack Developer",
      avatar: "/testimonials/harlen photo profil .webp",
      avatarStyle: { objectPosition: 'center 20%', transform: 'scale(1.5)' }
    },
    {
      text: "I really enjoyed working with Lyna. She has a very thoughtful approach to design and is consistently thorough with the details. She's proactive about keeping projects moving and is always clear and easy to communicate with, which made the whole process feel very smooth.",
      author: "Wilder Vera",
      role: "Product Owner",
      avatar: "/testimonials/wilder vera.webp"
    }
  ];

  return (
    <section className="w-full py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-lg md:text-xl font-bold text-center text-black mb-8 md:mb-12">
          What It's Like To Work With Me
        </h2>

        {/* Testimonials Grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* First row - 3 cards */}
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6 flex-grow">
                "{t.text}"
              </p>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden mb-2">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-full h-full object-cover"
                    style={t.avatarStyle}
                  />
                </div>
                <h4 className="font-semibold text-xs md:text-sm text-black">{t.author}</h4>
                <p className="text-[10px] md:text-xs text-gray-400">{t.role}</p>
              </div>
            </div>
          ))}

          {/* Second row - 1 card aligned left */}
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 flex flex-col md:col-span-1">
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6 flex-grow">
              "{testimonials[3].text}"
            </p>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden mb-2">
                <img
                  src={testimonials[3].avatar}
                  alt={testimonials[3].author}
                  className="w-full h-full object-cover"
                  style={testimonials[3].avatarStyle}
                />
              </div>
              <h4 className="font-semibold text-xs md:text-sm text-black">{testimonials[3].author}</h4>
              <p className="text-[10px] md:text-xs text-gray-400">{testimonials[3].role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
