// Utility function for filtering with debounce
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Filter data based on multiple criteria
export const filterData = (data, filters) => {
  return data.filter(item => {
    return Object.keys(filters).every(key => {
      if (!filters[key]) return true;
      
      const itemValue = String(item[key] || '').toLowerCase();
      const filterValue = String(filters[key]).toLowerCase();
      
      return itemValue.includes(filterValue);
    });
  });
};