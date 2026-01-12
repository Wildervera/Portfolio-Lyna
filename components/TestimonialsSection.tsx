
import React from 'react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      text: "Lyna demonstrated a strong understanding of user research and information architecture. Her ability to translate requirements into user-friendly designs was top notch.",
      author: "Sneha Kapoor",
      role: "VP of Product, HealthTech",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80"
    },
    {
      text: "She led the user research efforts with a thoughtful, professional, and methodical approach. The insights she produced were critical to our series B pivot.",
      author: "James Chen",
      role: "Founder, Evoleum",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-10 flex flex-col justify-center items-center py-20">
      <div className="text-center mb-20">
        <span className="text-purple-500 font-bold tracking-widest text-[0.7rem] uppercase mb-4 block">✦ KIND WORDS</span>
        <h2 className="font-serif text-5xl">Collaborator feedback</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-12 rounded-sm group hover:border-purple-500/50 transition-all duration-700">
            <span className="font-serif text-8xl text-purple-500/20 leading-none mb-4 block">“</span>
            <p className="text-xl text-gray-300 leading-relaxed mb-10 italic">
              {t.text}
            </p>
            <div className="flex items-center gap-4">
              <img src={t.avatar} className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all duration-700" alt={t.author} />
              <div>
                <h4 className="font-bold text-sm tracking-wider uppercase">{t.author}</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
