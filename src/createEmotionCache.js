import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

const createEmotionCache = () => {
  return createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin, prefixer],
    insertionPoint: document.head.firstChild,
    prepend: true, // Ensure styles are inserted before MUI styles
  });
};

export default createEmotionCache;
