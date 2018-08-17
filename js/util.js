export const randomIntFromRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const calculateDistance = (obj1, obj2) => {
  const dx = obj2.x - obj1.x;
  const dy = obj2.y - obj1.y;
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};