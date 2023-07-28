import { Message } from "../../interfaces";

import styles from "./styles.module.scss";

interface MessageProps extends Message {}

export function MessageBox({ type, text }: MessageProps) {
  const textClasses = `${styles.container} ${styles.text} ${
    type === "error" ? styles.text_error : ""
  }`;

  return (
    <section className={textClasses}>
      {type === "error" && <h5>ERROR</h5>}
      <p>{text}</p>
    </section>
  );
}
