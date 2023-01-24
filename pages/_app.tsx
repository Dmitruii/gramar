import Header from '@/components/common/Header'
import { Article } from '@/lib/types';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useMemo, useState } from 'react';

export const SearchContext = createContext<any>(null);
export const ArticleContext = createContext<any>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [search, setSearch] = useState('');
  const searchValue = useMemo(
    () => ({ search, setSearch }), 
    [search]
  )

  const [articles, setAticles] = useState('');
  const articlesValue = useMemo(
    () => ({ articles, setAticles }), 
    [articles]
  )
  
  return <>
    <SearchContext.Provider value={searchValue}>
      <ArticleContext.Provider value={articlesValue}>
        <Header />

        <div className='container my-3'>
          <Component {...pageProps} />
        </div>
      </ArticleContext.Provider>
    </SearchContext.Provider>
  </>
}
