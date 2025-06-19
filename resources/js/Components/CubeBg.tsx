import { debounce } from '@/utilities/general';
import { useEffect, useState } from 'react';

export const CubeBg = () => {
    const [screenWidth, setScreenWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024,
    );

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', debounce(handleResize, 100));
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMediumOrLarger = screenWidth >= 768;
    const cubesToRender = isMediumOrLarger ? Math.ceil(screenWidth / 10) : 30;
    const columns = isMediumOrLarger ? 14 : 5;

    return (
        <div className="cube-bg-grid -mt-[30px] -ml-[32px] grid h-full w-full grid-cols-5 grid-rows-6 gap-x-25 gap-y-30 md:-mt-0 md:grid-cols-8 md:grid-rows-8 md:gap-x-20 md:gap-y-24">
            {Array.from({ length: cubesToRender }).map((_, i) => {
                // Generate random starting rotations for each cube
                const initialX = Math.floor(Math.random() * 360);
                const initialY = Math.floor(Math.random() * 360);
                return (
                    <div
                        key={i}
                        className={
                            'cube-3d mx-auto my-auto' +
                            ((i % columns) % 2 === 1 ? ' cube-3d-stagger' : '')
                        }
                    >
                        <div
                            className="cube-3d-inner"
                            style={
                                {
                                    '--initial-rotate-x': `${initialX}deg`,
                                    '--initial-rotate-y': `${initialY}deg`,
                                } as React.CSSProperties
                            }
                        >
                            <div className="cube-3d-face front"></div>
                            <div className="cube-3d-face back"></div>
                            <div className="cube-3d-face right"></div>
                            <div className="cube-3d-face left"></div>
                            <div className="cube-3d-face top"></div>
                            <div className="cube-3d-face bottom"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
