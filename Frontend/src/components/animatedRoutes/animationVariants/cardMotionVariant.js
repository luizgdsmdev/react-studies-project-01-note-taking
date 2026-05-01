const cardVariants = (index) => {
  return {
    hidden: {
      opacity: 0,
      y: 30,
      x: -150,
      scale: 0.7,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        delay: index * 0.1,
      },
    },
  };
};

export default cardVariants;
