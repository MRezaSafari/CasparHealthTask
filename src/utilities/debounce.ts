function debounce<T extends (...args: any[]) => any>(cb: T, wait = 20) {
  let h: any = 0;
  const callable = (...args: any[]) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };

  callable.cancel = () => {
    clearTimeout(h);
  };

  return callable as T & { cancel: () => void };
}
export default debounce;
