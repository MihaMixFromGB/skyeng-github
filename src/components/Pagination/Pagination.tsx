import { splitRange } from "../../services/arrays";

import styles from "./styles.module.scss";

export interface PaginationProps {
  start: number;
  end: number;
  current: number;
  onCurrentChange: (current: number) => void;
}
export function Pagination({
  start,
  end,
  current,
  onCurrentChange,
}: PaginationProps) {
  const { firstPart, secondPart, hasDelimiter } = splitRange({
    start,
    end,
    current,
    maxCount: 7,
  });

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { page } = event.currentTarget.dataset;
    if (!page) return;
    const pageNum = parseInt(page, 10);
    if (!pageNum) return;
    onCurrentChange(pageNum);
  };

  const firstPages = firstPart.map((num) => (
    <button
      key={num}
      className={`${styles.page} ${num === current ? styles.page_active : ""}`}
      type="button"
      data-page={num}
      onClick={onClick}
    >
      {num}
    </button>
  ));

  const secondPages = secondPart.map((num) => (
    <button
      key={num}
      className={`${styles.page} ${num === current ? styles.page_active : ""}`}
      type="button"
      data-page={num}
      onClick={onClick}
    >
      {num}
    </button>
  ));

  return (
    <div className={styles.container}>
      {firstPages}
      {hasDelimiter && <div>...</div>}
      {secondPages}
    </div>
  );
}
