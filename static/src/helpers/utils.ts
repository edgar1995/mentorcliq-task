import { createSelectorCreator, defaultMemoize } from 'reselect';
import { is } from 'immutable';

export const createSelector: any = createSelectorCreator(defaultMemoize, is);

export const setFullPath = ({ ...urls }, prevPath = '') => {
  Object.values(urls).forEach((url) => {
    url.fullPath = `${prevPath}${url.mainPath}`;

    if (url.subs) {
      url.subs = setFullPath(url.subs, url.fullPath);
    }
  });

  return urls;
};
