import { useState, useEffect } from "react";
import useSWR from "swr";

import { OrderByType } from "../../interfaces";
import { User, Message } from "../../interfaces";
import { Toolbar } from "../Toolbar";
import { Pagination } from "../Pagination";
import { SearchResults } from "../SearchResults";
import { MessageBox } from "../MessageBox";
import { getUsersByLogin } from "../../services/github";

import styles from "./styles.module.scss";

export function Main() {
  const [login, setLogin] = useState("miha");
  const [orderBy, setOrderBy] = useState<OrderByType>("asc");
  const [perPage, setPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [message, setMessage] = useState<Message | null>(null);

  const { data, error, isLoading } = useSWR(
    `/github?${searchKey}&page=${currentPage}`,
    () => {
      if (searchKey === "" || login === "")
        return { total_count: 0, items: [] };
      return getUsersByLogin({ login, orderBy, perPage, currentPage });
    }
  );

  useEffect(() => {
    if (error) setMessage({ type: "error", text: error.message });
    if (searchKey && !isLoading && !data)
      setMessage({ type: "info", text: "Data is not provided!" });
    if (data && data.message) setMessage({ type: "info", text: data.message });
  }, [searchKey, error, error?.message, data, data?.message, isLoading]);

  const items = data && !data.message ? data.items : [];
  const total_count = data && !data.message ? data.total_count : 0;
  const users = items.map<User>((item, idx) => ({
    num: idx + 1 + (currentPage - 1) * perPage,
    login: item.login,
    avatar_url: item.avatar_url,
    html_url: item.html_url,
  }));

  const onSearch = () => {
    setMessage(null);
    setSearchKey(`login=${login}&order=${orderBy}&perPage=${perPage}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Toolbar
          login={login}
          orderBy={orderBy}
          perPage={perPage}
          onLoginChange={setLogin}
          onOrderByChange={setOrderBy}
          onPerPageChange={setPerPage}
        />
        <button className={styles.btnSearch} type="button" onClick={onSearch}>
          SEARCH
        </button>
      </header>
      <nav>
        {total_count > perPage && (
          <Pagination
            start={1}
            end={Math.floor(
              (total_count > 1000 ? 1000 : total_count) / perPage
            )}
            current={currentPage}
            onCurrentChange={setCurrentPage}
          />
        )}
      </nav>
      <main className={styles.content}>
        {message ? (
          <MessageBox {...message} />
        ) : (
          <SearchResults users={users} />
        )}
      </main>
    </div>
  );
}
