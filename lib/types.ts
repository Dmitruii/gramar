export type Article = {
	id: number
	title: string
	content: string
}

export type Collections = {
	Article: Article
}

export type User = {
	id: string;
	first_name: string;
	last_name: string;
	description: string | null;
	avatar?: string | null;
}

export type Query = Record<string, string | number | object | string[]>