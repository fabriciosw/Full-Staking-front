import React from 'react';

export interface ILoaderContext {
  showLoader: boolean;
  setShowLoader: (showLoader: boolean) => void;
  renderLoader: (action: 'show' | 'hide') => void;
}

export interface ILoaderProvider {
  children: React.ReactElement;
}
