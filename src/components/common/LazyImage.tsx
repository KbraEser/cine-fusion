import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQyIiBoZWlnaHQ9IjUxMyIgdmlld0JveD0iMCAwIDM0MiA1MTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNDIiIGhlaWdodD0iNTEzIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzEgMjMwVjI4M0gxOTVWMjMwSDE3MVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'}
      alt={alt}
      className={className}
      onClick={onClick}
      loading="lazy"
    />
  );
};

export default LazyImage; 