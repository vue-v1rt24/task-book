import { gsap } from 'gsap';

//
export const animatePages = () => {
  const скрытие = () => {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: resolve,
      });

      tl.fromTo(
        '.bl_1 .block',
        {
          scaleY: 1,
        },
        {
          scaleY: 0,
          duration: 1,
          delay: 0.2,
          stagger: {
            each: 0.1,
            from: 'start',
            grid: [1, 5],
            axis: 'x',
          },
          ease: 'expo.inOut',
        },
        0,
      );

      tl.fromTo(
        '.bl_2 .block',
        {
          scaleY: 1,
        },
        {
          scaleY: 0,
          duration: 1,
          delay: 0.2,
          stagger: {
            each: 0.1,
            from: 'start',
            grid: [1, 5],
            axis: 'x',
          },
          ease: 'expo.inOut',
        },
        0,
      );
    });
  };

  const показ = () => {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: resolve,
      });

      tl.fromTo(
        '.bl_1 .block',
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          duration: 1,
          delay: 0.2,
          stagger: {
            each: 0.1,
            from: 'end',
            grid: [1, 5],
            axis: 'x',
          },
          ease: 'expo.out',
        },
        0,
      );

      tl.fromTo(
        '.bl_2 .block',
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          duration: 1,
          delay: 0.2,
          stagger: {
            each: 0.1,
            from: 'end',
            grid: [1, 5],
            axis: 'x',
          },
          ease: 'expo.out',
        },
        0,
      );
    });
  };

  //
  return {
    скрытие,
    показ,
  };
};
