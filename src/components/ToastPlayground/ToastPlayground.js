import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf/ToastShelf";
import styles from "./ToastPlayground.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";
import useEscapeKey from "../../hooks/useEscapeKey";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [text, setText] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const { addToast, removeAllToasts } = React.useContext(ToastContext);

  const escapeHandler = React.useCallback(
    (e) => {
      if (e.code === "Escape") {
        removeAllToasts();
      }
    },
    [removeAllToasts]
  );

  useEscapeKey(escapeHandler);

  function textHandler(e) {
    e.preventDefault();

    setText(e.target.value);
  }

  function variantHandler(e) {
    setVariant(e.target.value);
  }

  function handleAddToast(e) {
    e.preventDefault();

    addToast({ text, variant });
    resetState();
  }

  function resetState() {
    setText("");
    setVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />
      <form onSubmit={handleAddToast}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={text}
                onChange={textHandler}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((item) => (
                <label key={item} htmlFor={`variant-${item}`}>
                  <input
                    id={`variant-${item}`}
                    type="radio"
                    name="variant"
                    value={item}
                    checked={variant === item}
                    onChange={variantHandler}
                  />
                  {item}
                </label>
              ))}

              {/* TODO Other Variant radio buttons here */}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
