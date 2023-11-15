import styles from "./ErrorLabel.module.css";
const ErrorLabel = ({
  msg = "",
  margin = "",
}: {
  msg?: string;
  margin?: string;
}) => {
  return (
    <div
      className={styles["error-label"]}
      style={{
        margin,
      }}
    >
      {msg}
    </div>
  );
};

export default ErrorLabel;
