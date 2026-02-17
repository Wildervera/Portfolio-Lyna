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
    <section
      className="w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8"
      style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden', paddingTop: '80px', boxSizing: 'border-box' }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: '1176px' }}>
        {/* Section Title — SF Pro 25px semibold */}
        <h2
          className="text-center capitalize"
          style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
            fontWeight: 590,
            fontSize: '25px',
            lineHeight: '150%',
            color: '#313131',
            marginBottom: '24px',
          }}
        >
          What It's Like To Work With Me
        </h2>

        {/* Grid: 1/2/4 columns responsive */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '12px' }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col"
              style={{
                background: '#FFFFFF',
                border: '0.8px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '19px',
                padding: '24px 20px 20px',
                boxSizing: 'border-box',
              }}
            >
              {/* Quote text — Inter light */}
              <p
                className="flex-grow"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  fontSize: '16px',
                  lineHeight: '150%',
                  color: '#000000',
                  marginBottom: '16px',
                }}
              >
                "{t.text}"
              </p>

              {/* Author info — centered at bottom */}
              <div className="flex flex-col items-center text-center" style={{ gap: '24px' }}>
                {/* Avatar */}
                <div
                  className="rounded-full overflow-hidden"
                  style={{ width: '92px', height: '92px', background: '#D9D9D9', flexShrink: 0 }}
                >
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-full h-full object-cover"
                    style={t.avatarStyle}
                  />
                </div>

                {/* Name + Role */}
                <div className="flex flex-col items-center" style={{ gap: '3px' }}>
                  <h4
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: '#000000',
                      textAlign: 'center',
                    }}
                  >
                    {t.author}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '150%',
                      color: '#000000',
                      textAlign: 'center',
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
