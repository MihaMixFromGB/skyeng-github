export type OrderByType = "asc" | "desc";

export interface Settings {
  login: string;
  orderBy: OrderByType;
  perPage: number;
}
