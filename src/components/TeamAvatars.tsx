import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectTeam } from '../types';

export const TeamAvatars: React.FC<{ team: ProjectTeam }> = ({ team }) => {
    const [isHovered, setIsHovered] = useState(false);

    const bgColor = team.backgroundColor || '#262E71';
    const txtColor = team.textColor || '#FFFFFF';

    return (
        <div
            className="relative flex items-center"
            style={{ marginLeft: '0', cursor: 'pointer' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered && team.description && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 10, x: '-50%' }}
                        style={{
                            position: 'absolute',
                            bottom: '100%',
                            left: '50%',
                            marginBottom: '10px',
                            backgroundColor: bgColor,
                            color: txtColor,
                            padding: '8px 16px',
                            borderRadius: '20px',
                            whiteSpace: 'nowrap',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            fontWeight: 500,
                            zIndex: 100,
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        {team.description}
                        {/* Arrow tooltip */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 0,
                                height: 0,
                                borderLeft: '6px solid transparent',
                                borderRight: '6px solid transparent',
                                borderTop: `6px solid ${bgColor}`,
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {team.members.map((member, i) => (
                <div
                    key={i}
                    className="rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold overflow-hidden transition-transform duration-300"
                    style={{
                        width: '47px',
                        height: '47px',
                        backgroundColor: bgColor,
                        color: txtColor,
                        zIndex: team.members.length - i,
                        marginLeft: i > 0 ? '-11px' : '0',
                        transform: isHovered ? `translateX(${i * 5}px)` : 'none',
                    }}
                >
                    {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        member.name.charAt(0)
                    )}
                </div>
            ))}
            {team.additionalCount && team.additionalCount > 0 && (
                <div
                    className="rounded-full border-2 border-white flex items-center justify-center transition-transform duration-300"
                    style={{
                        width: '47px',
                        height: '47px',
                        backgroundColor: bgColor,
                        zIndex: 0,
                        marginLeft: '-11px',
                        transform: isHovered ? `translateX(${team.members.length * 5}px)` : 'none',
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                            fontWeight: 590,
                            fontSize: '16px',
                            lineHeight: '19px',
                            color: txtColor,
                        }}
                    >
                        +{team.additionalCount}
                    </span>
                </div>
            )}
        </div>
    );
};
