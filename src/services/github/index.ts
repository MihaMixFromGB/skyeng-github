import { User } from "../../interfaces";
import { OrderByType } from "../../interfaces";

const GITHUB_API = "https://api.github.com/search";

interface GetUsersByLoginArgs {
  login: string;
  orderBy: OrderByType;
  perPage: number;
  currentPage: number;
}

interface GitHubSearchUsersResponse {
  total_count: number;
  items: Array<Omit<User, "num">>;
  message?: string;
}

export async function getUsersByLogin({
  login,
  orderBy,
  perPage,
  currentPage,
}: GetUsersByLoginArgs) {
  const res = await fetch(
    `${GITHUB_API}/users?` +
      new URLSearchParams({
        q: `${login} in:login`,
        sort: "repositories",
        order: orderBy,
        per_page: String(perPage),
        page: String(currentPage),
      })
  );
  return await (res.json() as Promise<GitHubSearchUsersResponse>);
}

export async function getRepositoriesCountByLogin(login: string) {
  const res = await fetch(
    `${GITHUB_API}/repositories?` +
      new URLSearchParams({
        q: `user:${login}`,
      })
  );
  const data = await res.json();
  if (!data || data.message || !data.total_count) return 0;
  return data.total_count as number;
}
