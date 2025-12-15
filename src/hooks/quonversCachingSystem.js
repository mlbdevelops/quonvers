import { useState } from 'react';

const cache = new Map()

export default function useCache(){
  const setProvider = (keyElem, value) => {
    cache.set(keyElem, value)
  }
  
  const getProvider = (keyElem) => {
    return cache.get(keyElem)
  }
  const remove = (keyElem) => cache.delete(keyElem)
  const clear = () => cache.clear()
  const has = (keyElem) => cache.has(keyElem)
  
  return {
    setProvider,
    getProvider,
    remove,
    clear,
    has
  };
}