import MiniArticle from "@/components/article/MiniArticle";
import Head from "@/components/common/Head";
import { fetcher } from "@/components/common/Header";
import client from "@/lib/directus";
import { Article } from "@/lib/types";
import { InferGetStaticPropsType } from "next";
import { useContext, useEffect } from "react";
import useSWR from 'swr';
import { ArticleContext } from "./_app";

export default function Home() {
  const { articles, setAticles } = useContext(ArticleContext)
  const { data, error, isLoading } = useSWR<any>(process.env.NEXT_PUBLIC_API_URL + '/items/article', fetcher)

  useEffect(() => {
    setAticles(data?.data || null)
  }, [isLoading, data])

  return (
    <>
      <Head title="Articles" />

      <h1 className="mb-4">{data?.data.length} Articles</h1>

      {
        isLoading ? 
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> 
        : (articles || []).map((article: Article) => (
          <MiniArticle 
            key={article.id}
            article={article}
          />
        ))
      }
    </>
  )
}
