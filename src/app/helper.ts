import queryString from 'query-string';

export const getQuery = (queryStr: string) => {
  const query = queryString.parse(queryStr);
  return query;
};

export const generateParams = (query: any) => {
  return Object.entries(query).reduce((acc, [key, value]) => {
    return acc + `&${key}=${value}`;
  }, '');
};

export const debounce = (func: (...args: any[]) => void, delay = 300) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: any[]) {
    const context = this; // 'this' is typed as any

    // Clear the previous timeout if the function is called again
    if (timeout) {
      console.log('Clearing timeout:', timeout);
      clearTimeout(timeout);
    }

    // Set a new timeout and log its ID
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, delay);

    console.log('New timeout set:', timeout);
  };
};
