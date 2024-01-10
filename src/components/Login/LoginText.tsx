import "../../styles/LoginText.css";

function LoginText() {
    return (
      <section className="login-text-container">
        <h1 className="login-title">
          Welcome!
        </h1>
        <p>This is an application for managing your daily tasks or to set some goals.</p>
        <p>You can:</p>
        <ul>
          <li>Create, edit or delete tasks</li>
          <li>Set a deadline if you need it</li>
          <li>Set notifications</li>
        </ul>
      </section>
    );
}

export default LoginText;