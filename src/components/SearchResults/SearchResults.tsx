import { useState } from "react";

import { User } from "../../interfaces";
import { UserInfo } from "../UserInfo";

import styles from "./styles.module.scss";

interface SearchResultsProps {
  users: User[];
}

export function SearchResults({ users }: SearchResultsProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [selectUserIdx, setSelectUserIdx] = useState(0);

  const results = users.map((user, idx) => (
    <li key={user.num} className={styles.results__item}>
      <span>{user.num}</span>
      <span>{user.login}</span>
      <button
        onClick={() => {
          setSelectUserIdx(idx);
          setShowInfo(true);
        }}
      >
        ...
      </button>
    </li>
  ));

  return (
    <section className={styles.container}>
      <ul className={styles.results}>{results}</ul>
      {showInfo && (
        <UserInfo
          {...users[selectUserIdx]}
          onClose={() => setShowInfo(false)}
        />
      )}
    </section>
  );
}
