import style from "./style.module.css";

const LoadingComponent = () => {
  return (
    <svg className={style.spinner} viewBox="0 0 50 50">
      <circle
        className={style.path}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      ></circle>
    </svg>
  );
};

export default LoadingComponent;
