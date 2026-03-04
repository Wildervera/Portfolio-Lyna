import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Initial out-of-screen position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Add some spring physics for smooth following
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Check if device supports touch to disable custom cursor
        if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

        // Show cursor on first move
        const showCursor = () => setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            // Show cursor if not visible
            if (!isVisible) setIsVisible(true);
            // Offset by half of cursor dimension (32px/2 = 16px) inside animate
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        // Global interaction checks for hover state
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if we are hovering over an interactive element
            const isInteractive = window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') !== null ||
                target.closest('button') !== null;
            setIsHovering(isInteractive);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseenter', showCursor);
        document.body.addEventListener('mouseover', handleMouseOver);

        // Initial state
        setIsVisible(true);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseenter', showCursor);
            document.body.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    // If touch device, render nothing
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                x: springX,
                y: springY,
                opacity: isVisible ? 1 : 0,
                mixBlendMode: 'difference'
            }}
        >
            <motion.div
                animate={{
                    width: isHovering ? 48 : 32,
                    height: isHovering ? 48 : 32,
                    // compensate position for size change
                    x: isHovering ? -8 : 0,
                    y: isHovering ? -8 : 0,
                    backgroundColor: '#FFFFFF',
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                    borderRadius: "50%",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        </motion.div>
    );
};
