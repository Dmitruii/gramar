import { useDebounce } from "@/hooks/useDebounce";
import { ArticleContext, SearchContext } from "@/pages/_app";
import Link from "next/link";
import { useContext, useEffect } from "react";
import useSWR from "swr";
import client from '@/lib/directus'

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Header () {
  const { search, setSearch} = useContext(SearchContext)
  const { articles, setAticles } = useContext(ArticleContext)
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_URL + '/items/article?fields[]=id', fetcher)
  // const { data: searchData } = useSWR(process.env.NEXT_PUBLIC_API_URL + '/items/article?fields[]=id,title&filter[_and][0][title][_contains]=' + search, fetcher)

  const searchHandler = async (search: string) => {
    setAticles(await client.getMany('Article', {
      fields: ['id', 'title'],
      filter: !(search === '') && {
        _and: [
          {
            title: {
              _contains: search
            }
          }
        ]
      }
    }) || [])
  }

  const handleSearch = useDebounce(
		(search: string) => {
      setSearch(search)
      searchHandler(search)
    }, 300
	);

  console.log(articles)

  return  <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container">
      <Link href='/' className="navbar-brand">
        Gramar
      </Link>

      <div className="d-flex align-items-center">
        {!isLoading && <Link href={`/article/${getRandomId(data.data.map(({id}: { id: string }) => id))}`}>
          <h3 className="btn btn-primary block me-2">{isLoading ? "Loading..." : "Random"}</h3>
        </Link>}
        <form className="d-flex ml-auto" role="search">
            <input 
              onChange={e => handleSearch(e.target.value)}
              className="form-control me-2" 
              type="search" 
              placeholder="Search article" 
              aria-label="Search"
            />
            <button className="btn btn-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
} 

function getRandomId(ids: string[]) {
  return ids[Math.floor((Math.random()*ids.length))]
}