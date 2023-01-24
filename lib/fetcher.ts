import type { Query } from "./types";

export default async function fetcher<T>(
	path: string,
	{ query, ...options }: RequestInit & { query?: Query } = {}
) {
	options.headers ||= {};

	if (options.body) {
		options.headers = { ...options.headers, "Content-Type": "application/json" };
		options.body = JSON.stringify(options.body);
	}

	if (query) {
		const params = Object.entries(query).reduce((acc, [key, value]) => {
			if (!value) return acc;
			if (acc) acc += "&";

			const param = Array.isArray(value)
				? value.join(",")
				: typeof value === "object"
				? JSON.stringify(value)
				: value.toString();

			return acc + `${key}=${param}`;
		}, "");

		if (params) path += "?" + params;
	}

	const res = await fetch(encodeURI(`${process.env.NEXT_PUBLIC_API_URL}${path}`.toLowerCase()), options);
	if (!res.ok) throw { status: res.status };

	return (await res.json()).data as T;
}
