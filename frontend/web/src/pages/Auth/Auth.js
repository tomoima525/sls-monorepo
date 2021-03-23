import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import Loading from "../../fragments/Loading";
import styles from "./Auth.module.css";
import { getSession, saveSession } from "../../utils";

class AuthComponent extends Component {
  constructor(props) {
    super(props);

    const pathName = window.location.pathname.replace("/", "");

    this.state = {};
    this.state.state = pathName;
    this.state.loading = true;
    this.state.waitForCodeInput = false;
    this.state.error = null;
    this.state.formEmail = "";
    this.state.formPassword = "";

    // Bindings
    this.handleFormInput = this.handleFormInput.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormTypeChange = this.handleFormTypeChange.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.setState({
      loading: false,
    });

    // Clear query params
    const url = document.location.href;
    window.history.pushState({}, "", url.split("?")[0]);
  }

  /**
   * Handles a form change
   */
  handleFormTypeChange(type) {
    this.setState({ state: type }, () => {
      this.props.history.push(`/${type}`);
    });
  }

  /**
   * Handle text changes within form fields
   */
  handleFormInput(field, value) {
    value = value.trim();

    const nextState = {};
    nextState[field] = value;

    this.setState(Object.assign(this.state, nextState));
  }

  /**
   * Handles form submission
   * @param {object} evt
   */
  handleSubmit = async (evt) => {
    try {
      evt.preventDefault();

      // Validate email
      if (!this.state.formEmail) {
        return this.setState({
          loading: false,
          formError: "email is required",
        });
      }

      // Validate password
      if (!this.state.formPassword) {
        return this.setState({
          loading: false,
          formError: "password is required",
        });
      }
      if (this.state.state === "auth") {
        const result = await Auth.signUp({
          username: this.state.formEmail,
          password: this.state.formPassword,
          attributes: {
            email: this.state.formEmail,
          },
        });
        console.log({ result });
        const { username } = result.user;
        saveSession(null, username, null);
        this.setState({
          waitForCodeInput: true,
        });
      } else if (this.state.state === "login") {
        const result = await Auth.signIn({
          username: this.state.formEmail,
          password: this.state.formPassword,
          attributes: {
            email: this.state.formEmail,
          },
        });
        console.log({ result });
        const { attributes, username, signInUserSession } = result;
        const { email } = attributes;
        const { accessToken } = signInUserSession;
        saveSession(username, email, accessToken);

        window.location.replace("/");
      }
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  handleConfirm = async (evt) => {
    evt.preventDefault();
    try {
      const session = getSession();
      const userEmail = session?.userEmail || "";
      if (!session?.userEmail) {
        throw new Error("No user email found. Need to retry again");
      }
      await Auth.confirmSignUp(userEmail, this.state.formCode);

      this.setState({
        waitForCodeInput: false,
        state: "login",
      });
    } catch (error) {
      console.log("error confirmation:", error);
    }
  };

  render() {
    return (
      <div className={`${styles.container} animateFadeIn`}>
        <div className={styles.containerInner}>
          {/* Logo */}

          <Link to="/" className={`${styles.logo}`}>
            <img
              draggable="false"
              src={"./fullstack-app-title.png"}
              alt="serverless-fullstack-application"
            />
          </Link>

          {/* Loading */}

          {this.state.loading && (
            <div>{<Loading className={styles.containerLoading} />}</div>
          )}

          {/* Code input form */}
          {this.state.waitForCodeInput && (
            <div className={styles.containerRegister}>
              <form className={styles.form} onSubmit={this.handleConfirm}>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Confirmation Code</label>
                  <input
                    type="text"
                    placeholder="abcdefg"
                    className={styles.formInput}
                    value={this.state.formCode}
                    onChange={(e) => {
                      this.handleFormInput("formCode", e.target.value);
                    }}
                  />
                </div>
                <input
                  className={`buttonPrimaryLarge ${styles.formButton}`}
                  type="submit"
                  value="Confirm"
                />
              </form>
            </div>
          )}

          {/* Registration Form */}

          {!this.state.loading && !this.state.waitForCodeInput && (
            <div className={styles.formType}>
              <div
                className={`${styles.formTypeRegister} 
                ${this.state.state === "auth" ? styles.formTypeActive : ""}`}
                onClick={(e) => {
                  this.handleFormTypeChange("auth");
                }}
              >
                Register
              </div>
              <div
                className={`${styles.formTypeSignIn} 
                ${this.state.state === "login" ? styles.formTypeActive : ""}`}
                onClick={(e) => {
                  this.handleFormTypeChange("login");
                }}
              >
                Sign-In
              </div>
            </div>
          )}

          {this.state.state === "auth" &&
            !this.state.loading &&
            !this.state.waitForCodeInput && (
              <div className={styles.containerRegister}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>email</label>
                    <input
                      type="text"
                      placeholder="yours@example.com"
                      className={styles.formInput}
                      value={this.state.formEmail}
                      onChange={(e) => {
                        this.handleFormInput("formEmail", e.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>password</label>
                    <input
                      type="password"
                      placeholder="your password"
                      className={styles.formInput}
                      value={this.state.formPassword}
                      onChange={(e) => {
                        this.handleFormInput("formPassword", e.target.value);
                      }}
                    />
                  </div>

                  {this.state.formError && (
                    <div className={styles.formError}>
                      {this.state.formError}
                    </div>
                  )}

                  <input
                    className={`buttonPrimaryLarge ${styles.formButton}`}
                    type="submit"
                    value="Register"
                  />
                </form>
              </div>
            )}

          {this.state.state === "login" &&
            !this.state.loading &&
            !this.state.waitForCodeInput && (
              <div className={styles.containerSignIn}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>email</label>
                    <input
                      type="text"
                      placeholder="yours@example.com"
                      className={styles.formInput}
                      value={this.state.formEmail}
                      onChange={(e) => {
                        this.handleFormInput("formEmail", e.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>password</label>
                    <input
                      type="password"
                      placeholder="your password"
                      className={styles.formInput}
                      value={this.state.formPassword}
                      onChange={(e) => {
                        this.handleFormInput("formPassword", e.target.value);
                      }}
                    />
                  </div>

                  {this.state.formError && (
                    <div className={styles.formError}>
                      {this.state.formError}
                    </div>
                  )}

                  <input
                    className={`buttonPrimaryLarge ${styles.formButton}`}
                    type="submit"
                    value="Sign In"
                  />
                </form>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default withRouter(AuthComponent);
