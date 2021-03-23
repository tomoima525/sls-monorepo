import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Loading from "../../fragments/Loading";
import styles from "./Content.module.css";
import useContent from "./useContent";
import { getSession } from "../../utils";

const Content = (props) => {
  const [form, setForm] = useState("");
  const [loading, setLoading] = useState(false);
  const postContent = useContent();
  const session = getSession();
  const userId = session?.userId;
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const result = await postContent(userId, form);
    setLoading(false);
    const message = result?.message;
    if (message.includes("Success")) {
      props.history.replace(`/`);
    }
  };

  return (
    <div className={`${styles.container} animateFadeIn`}>
      <div className={styles.containerInner}>
        <div className={styles.containerRegister}>
          <div className={styles.title}>Add Content</div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formField}>
              <label className={styles.formLabel}>Content</label>
              <input
                type="text"
                placeholder="abcdefg"
                className={styles.formInput}
                value={form}
                onChange={(e) => setForm(e.target.value)}
              />
            </div>
            <input
              className={`buttonPrimaryLarge ${styles.formButton}`}
              type="submit"
              value="Submit"
            />
          </form>
        </div>
        {!!loading && (
          <div>{<Loading className={styles.containerLoading} />}</div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Content);
