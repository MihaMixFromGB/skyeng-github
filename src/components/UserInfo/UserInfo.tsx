import useSWR from "swr";

import { User } from "../../interfaces";
import { getRepositoriesCountByLogin } from "../../services/github";
import styles from "./style.module.scss";

interface UserInfoProps extends User {
  onClose: () => void;
}

export function UserInfo({
  login,
  avatar_url,
  html_url,
  onClose,
}: UserInfoProps) {
  const { data } = useSWR(`/repositories/${login}`, () =>
    getRepositoriesCountByLogin(login)
  );

  return (
    <article className={styles.container}>
      <div className={styles.info}>
        <button className={styles.info__close} onClick={onClose}>
          X
        </button>
        <img className={styles.info__avatar} src={avatar_url} alt="avatar" />
        <p className={styles.info__label}>{login}</p>
        <a className={styles.info__label} href={html_url}>
          {html_url}
        </a>
        <p className={styles.info__label}>{`Repositories (not all:)): ${
          data ? data : 0
        }`}</p>
      </div>
    </article>
  );
}
