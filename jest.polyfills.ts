// Polyfills for Jest tests
if (typeof global.fetch === 'undefined') {
  const fetchModule = require('cross-fetch');
  global.fetch = fetchModule.default || fetchModule;
  global.Headers = fetchModule.Headers;
  global.Request = fetchModule.Request;
  global.Response = fetchModule.Response;
}

if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (fn: (...args: any[]) => void, ...args: any[]) => {
    return setTimeout(fn, 0, ...args);
  };
}

if (typeof (global as any).ResizeObserver === 'undefined') {
  (global as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
