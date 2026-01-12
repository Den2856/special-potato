import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ingredients = [
  { id: 1, src: '/ingredients/mushroom_2.png', alt: 'Tomato', style: { top: '15%', left: '12%' } },
  { id: 3, src: '/ingredients/basil_1.png', alt: 'Basil', style: { top: '30%', left: '0%' } },
  { id: 5, src: '/ingredients/olive_3.png', alt: 'Olives', style: { bottom: '30%', left: '5%' } },
  { id: 7, src: '/ingredients/jalapeno_1.png', alt: 'Chili', style: { bottom: '20%', left: '20%' } },
  { id: 9, src: '/ingredients/cherry_tomatoes_4.png', alt: 'Mushroom', style: { bottom: '7%', left: '5%' } },
  { id: 2, src: '/ingredients/olive_4.png', alt: 'Cheese', style: { top: '16%', right: '14%' } },
  { id: 4, src: '/ingredients/cherry_tomatoes_1.png', alt: 'Onion', style: { top: '30%', right: '0%' } },
  { id: 6, src: '/ingredients/mushroom_4.png', alt: 'Pepper', style: { top: '48%', right: '4%' } },
  { id: 8, src: '/ingredients/garlic_3.png', alt: 'Onion', style: { top: '60%', right: '22%' } },
  { id: 10, src: '/ingredients/basil_3.png', alt: 'Pepper', style: { bottom: '5%', right: '4%' } },
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('pizza-party-section');
      if (section && section.getBoundingClientRect().top < window.innerHeight) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="pizza-party-section"
      className="relative pt-[170px] pb-[120px] px-4 bg-white text-center"
    >
      <motion.h2
        className="text-7xl font-extrabold text-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        Your Pizza Party <br /> Starts Here!
      </motion.h2>
      <motion.p
        className="mt-4 text-lg text-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        Gather your friends and family and enjoy the best pizza in town. <br />
        Freshly made and delivered hot!
      </motion.p>



      {/* Ингредиенты */}
      <div className="absolute top-0 left-0 right-0 bottom-0 max-w-7xl mx-auto max-md:hidden min-md:block">
        {ingredients.map((ingredient) => (
          <motion.img
            key={ingredient.id}
            src={ingredient.src}
            alt={ingredient.alt}
            className="absolute w-[119px] h-[119px]"
            style={ingredient.style}
            initial={{
              opacity: 0,
              x: ingredient.id % 2 === 0 ? '100%' : '-100%',
            }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : ingredient.id % 2 === 0 ? '100%' : '-100%',
            }}
            transition={{
              delay: 0.5,
              type: 'spring',
              stiffness: 120,
              damping: 20,
            }}
          />
        ))}
      </div>

      <motion.div
        className="my-6 relative z-10 "
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <Link to="/menu"
          className="bg-fire-red px-6 py-2 mb-4 rounded-full text-white hover:bg-dark transition-all"
        >View Our Menu</Link>
      </motion.div>

    {/*    
      <motion.img
        src="/hero2.png"
        alt="Pizza"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 max-w-xs sm:max-w-sm lg:max-w-md object-cover"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 120, damping: 25 }}
      />
    */}
    </section>
  );
}
