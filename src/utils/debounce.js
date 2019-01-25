'use strict';

/**
 * `debounce`
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param {Function} func The function that needs to be debounced.
 * @param {Number} wait Number of milliseconds to wait until the code is not called to finally execute it.
 * @param {Boolean} immediate Flag the function to debounce. true: trigger on the leading edge. false: trailing edge.
 * @author underscore.js
 * @description See David Walsh https://davidwalsh.name/javascript-debounce-function
 */
const debounce = (func, wait, immediate) => {
  let timeout;

  const executedFunction = () => {
    const context = this;
    const args = arguments;
      
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
  
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  
    if (callNow) func.apply(context, args);
  };

  return executedFunction;
};

export default debounce;
