import { Article } from "@/lib/types"
import Link from "next/link"

type PropsType = {
    article: Pick<Article, 'id' | 'title'>
}

export default function MiniArticle ({article}: PropsType) {
    const { id, title } = article

    return <section>
        <Link href={`/article/${id}`}>
            {title}
        </Link>
        <hr />
    </section>
}