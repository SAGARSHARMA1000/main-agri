// components/TiltCard.jsx
import { useState } from "react";

const TiltCard = ({ children, className }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    setRotate({
      x: (y - box.height / 2) / 20,
      y: (box.width / 2 - x) / 20,
    });
  };

  return (
    <div
      className={`transition-transform duration-200 preserve-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
      }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
