import styles from "./Input.module.scss";
import React from "react";

export default function (props) {
  const elem: React.RefObject<any> = React.useRef();

  return (
    <div id={props.id} className={styles.parent}>
      <input
        ref={elem}
        value={props.value}
        defaultValue={props.defaultValue}
        onInput={(e) => {
          if (props.onInput) props?.onInput(elem.current.value);
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
}
