import NextHead  from "next/head";

type PropsType = {
    title?: string
}

export default function Head ({title}: PropsType) {
    const fullTitle = title ? `${title} – Gramar` : 'Gramar'

    return <NextHead>
        <title>{fullTitle}</title>
    </NextHead>
}