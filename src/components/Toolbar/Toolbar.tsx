import { Settings, OrderByType } from "../../interfaces";

import styles from "./styles.module.scss";

export interface ToolbarProps extends Settings {
  onLoginChange: (login: string) => void;
  onOrderByChange: (sortBy: OrderByType) => void;
  onPerPageChange: (perPage: number) => void;
}

export function Toolbar({
  login,
  orderBy,
  perPage,
  onLoginChange,
  onOrderByChange,
  onPerPageChange,
}: ToolbarProps) {
  const onLoginChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onLoginChange(event.target.value);
  };

  const onOrderByChangeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onOrderByChange(event.target.value as OrderByType);
  };

  const onPerPageChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value) return;
    const count = parseInt(value, 10);
    if (!count) return;

    onPerPageChange(count);
  };

  return (
    <section className={styles.container}>
      <div className={styles.searchParameter}>
        <label className={styles.searchParameter__label} htmlFor="login">
          User's login:
        </label>
        <input
          className={styles.searchParameter__input}
          type="text"
          id="login"
          placeholder="Login"
          value={login}
          onChange={onLoginChangeInput}
        />
      </div>
      <div className={styles.searchParameter}>
        <label className={styles.searchParameter__label} htmlFor="sort">
          Sort by count of repositories:
        </label>
        <select
          className={styles.searchParameter__input}
          id="sort"
          defaultValue={orderBy}
          onChange={onOrderByChangeSelect}
        >
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>
      <div className={styles.searchParameter}>
        <label className={styles.searchParameter__label} htmlFor="perPage">
          Count of items per a page:
        </label>
        <input
          className={styles.searchParameter__input}
          type="number"
          min={1}
          max={50}
          value={perPage}
          onChange={onPerPageChangeInput}
        />
      </div>
    </section>
  );
}
