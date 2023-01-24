import fetcher from "./fetcher";
import type { Collections, User } from "./types";

type Params = {
	page?: number;
	offset?: number;
	limit?: number;
	sort?: string[];
	fields?: string[];
	search?: string;
	filter?: any;
	meta?: string[]
};

const client = {
	getOne<T extends keyof Collections>(collection: T, key: string, params?: Params) {
		return fetcher<Collections[T]>(`/items/${collection}/${key}`, { query: params });
	},
	getMany<T extends keyof Collections>(collection: T, params?: Params) {
		return fetcher<Collections[T][]>(`/items/${collection}`, { query: params });
	},
	getUser(key: string) {
		return fetcher<User>(`/users/${key}`, {
			query: { fields: ["id", "first_name", "last_name", "description", "avatar"] },
		});
	},
	getUsers() {
		return fetcher<User[]>(`/users`, {
			query: { fields: ["id"] },
		});
	},
};

export default client;
