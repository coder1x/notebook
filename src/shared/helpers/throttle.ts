let timeout = false;
let currentTime: number = Date.now();

const throttle = (onChange: VoidFunction, delay = 100) => {
  if (timeout) return;
  if (delay < 16) delay = 16;

  currentTime = Date.now();
  timeout = true;
  onChange?.();
  const optimize = () => {
    if (Date.now() - currentTime < delay) {
      requestAnimationFrame(optimize);
    } else {
      timeout = false;
    }
  };
  optimize();
};

export default throttle;
