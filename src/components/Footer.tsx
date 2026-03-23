import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    return (
        <footer
            className="w-full"
            style={{
                background: '#FFFFFF', // Same white as navbar
                border: '1px solid rgba(217, 217, 217, 0.3)', // Same border as navbar
                borderRadius: '45px', // Match navbar border radius roughly
                padding: '20px 36px', // Smaller padding
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '1280px',
                margin: '0 auto',
                boxSizing: 'border-box',
                flexWrap: 'wrap', // In case on mobile
                gap: '16px', // Add gap for mobile wrap
            }}
        >
            {/* Left Section */}
            <div className="flex flex-col" style={{ gap: '4px' }}>
                <span
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: '24px', // Smaller font size
                        color: '#2A2438',
                        lineHeight: '1.2',
                    }}
                >
                    See you!👋
                </span>
                <a
                    href="mailto:lyna.seridji@gmail.com"
                    className="no-underline"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: '15px', // Smaller font size
                        color: '#2A2438',
                        cursor: 'pointer',
                    }}
                >
                    lyna.seridji@gmail.com
                </a>
            </div>

            {/* Right Section */}
            <div className="flex items-center" style={{ gap: '24px' }}>
                {/* LinkedIn Link */}
                <motion.a
                    href="https://www.linkedin.com/in/lyna-seridji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center no-underline"
                    style={{ gap: '6px' }}
                    whileHover={{ opacity: 0.7 }}
                >
                    <span
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: '15px', // Smaller font size
                            color: '#655F75',
                        }}
                    >
                        LinkedIn
                    </span>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                            stroke="#655F75"
                            strokeWidth="1.5"
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
                    className="flex items-center no-underline"
                    style={{ gap: '6px' }}
                    whileHover={{ opacity: 0.7 }}
                >
                    <span
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: '15px', // Smaller font size
                            color: '#655F75',
                        }}
                    >
                        Resume
                    </span>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                            stroke="#655F75"
                            strokeWidth="1.5"
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
