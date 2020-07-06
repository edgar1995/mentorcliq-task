import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import { Loading } from '../Loading/Loading';

import { Routes } from '../../routes';
import { store } from '../../store';

export function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
    </Provider>
  );
}
