import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 md:h-12" }) => {
  // Optimization: standardizing image delivery and responsive height
  const logoUrl = "https://ik.imagekit.io/hxkb52bem/afa%20media%20logo%20no%20BG.png?tr=trim-true,w-500,h-200,cm-pad_resize,bg-00000000,f-auto,q-90";

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoUrl} 
        alt="AFA Media - AI Growth Infrastructure" 
        className="h-full w-auto object-contain flex-shrink-0 transition-transform duration-500 hover:scale-105"
        width="500"
        height="200"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default Logo;