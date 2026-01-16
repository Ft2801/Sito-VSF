import React, { useRef, useEffect, useState } from 'react';

interface AnimatedComponentProps {
  children: React.ReactNode;
  className?: string;
  initialClass?: string;
  delay?: number;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ children, className = '', initialClass = 'animate-fade-in-up', delay=0 }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const timer = setTimeout(() => setVisible(true), delay);
        const currentRef = domRef.current;
        if (currentRef) {
           observer.unobserve(currentRef);
        }
        return () => clearTimeout(timer);
      }
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`${className} animate-on-scroll ${initialClass} ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};

export default AnimatedComponent;
