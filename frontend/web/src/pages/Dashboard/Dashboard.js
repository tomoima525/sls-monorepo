import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import Loading from "../../fragments/Loading";
import styles from "./Dashboard.module.css";
import useNoteList from "./useNoteList";
import { getSession, deleteSession, formatTime } from "../../utils";

const Dashboard = (props) => {
  const session = getSession();
  const [requestNotes, notes] = useNoteList();
  const userEmail = session?.userEmail || "";
  const userId = session?.userId;

  useEffect(() => {
    requestNotes(userId);
  }, [userId, requestNotes]);

  /**
   * Log user out by clearing cookie and redirecting
   */
  const handleLogout = () => {
    Auth.signOut();
    deleteSession();
    props.history.push(`/`);
  };

  const handleAddContent = () => {
    props.history.push(`/content`);
  };
  return (
    <div className={`${styles.container} animateFadeIn`}>
      <div className={styles.containerInner}>
        {/* Navigation */}

        <div className={styles.navigationContainer}>
          <div className={`link`}>{userEmail}</div>
          <div className={`link`} onClick={handleLogout}>
            logout
          </div>
        </div>

        {/* Content */}

        <div className={styles.contentContainer}>
          <div className={styles.title}>
            <div>Contents</div>
            <div className={styles.add} onClick={handleAddContent}>
              {" "}
              Add{" "}
            </div>
          </div>
          {notes ? (
            <table className={styles.contents}>
              <tbody>
                <tr>
                  <th>id</th>
                  <th>content</th>
                  <th>created at</th>
                </tr>

                {notes.map((note) => {
                  return (
                    <tr key={note.id}>
                      <td>{note.id}</td>
                      <td>{note.content}</td>
                      <td>{formatTime(note.timestamp)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Loading className={styles.containerLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
