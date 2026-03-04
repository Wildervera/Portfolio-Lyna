import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    return (
        <footer
            className="w-full"
            style={{
                background: '#313131',
                borderRadius: '24px',
                padding: '0 60px',
                height: '252px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                maxWidth: '1280px',
                margin: '0 auto',
                boxSizing: 'border-box',
            }}
        >
            <div className="flex flex-col" style={{ gap: '30px' }}>
                {/* LinkedIn Link */}
                <motion.a
                    href="https://www.linkedin.com/in/lyna-seridji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-end no-underline"
                    style={{ gap: '12px' }}
                    whileHover={{ opacity: 0.8 }}
                >
                    <span
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: '26px',
                            lineHeight: '31px',
                            color: '#FFFFFF',
                        }}
                    >
                        Linkedin
                    </span>
                    {/* Arrow icon */}
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 25L25 10M25 10H12M25 10V23"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.a>

                {/* Resume Link */}
                <motion.a
                    href="https://drive.google.com/file/d/1x-eHJhxqN30-BeOglUkfrMp2jQyNFhF2/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-end no-underline"
                    style={{ gap: '12px' }}
                    whileHover={{ opacity: 0.8 }}
                >
                    <span
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: '26px',
                            lineHeight: '31px',
                            color: '#FFFFFF',
                        }}
                    >
                        Resume
                    </span>
                    {/* Arrow icon */}
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 25L25 10M25 10H12M25 10V23"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.a>
            </div>
        </footer>
    );
};

export default Footer;
