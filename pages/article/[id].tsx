import Head from "@/components/common/Head";
import client from "@/lib/directus";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next/types";

export default function ArticlePage ({article}: InferGetStaticPropsType<typeof getStaticProps>) {
    const { title, content } = article

    return <>
        <Head title={title} />

        <h1>{title}</h1>
        <hr />
        
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
}

export async function getStaticPaths() {
    const articles = await client.getMany('Article', {
        fields: ['id']
    })

    return {
        paths: articles.map(({id}) => ({ params: {id} })),
        fallback: "blocking",
    }
  }

export async function getStaticProps({ params }: GetStaticPropsContext) {
	return {
		props: {
            article: await client.getOne('Article', (params as { id: string }).id)
		},
        revalidate: 300,
	}
}