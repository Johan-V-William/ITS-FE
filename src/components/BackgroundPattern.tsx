import backgroundImage from "@/assets/BackgroundImage.png"

export const BackgroundPattern = () => {
  const flowers = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="w-full h-full object-cover opacity-10"
      />

      {/* Animated flowers on top */}
      <div className="absolute inset-0">
        {flowers.map((flower) => (
          <div
            key={flower.id}
            className="absolute text-gray-400 opacity-30"
            style={{
              left: flower.left,
              top: flower.top,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${flower.delay}s`,
            }}
          >
            {Math.random() > 0.5 ? '🌼' : '🌱'}
          </div>
        ))}
      </div>
    </div>
  );
};
