import { useState } from "react";
function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //const navigation = useNavigate();
  
    function register() {
      fetch("http://localhost:3000/sign-up",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword
        }),
      }).then((res)=> res.json()).then((data)=>console.log(data))
    }
  

  return (
      <div className="Register">
        <h2>Afro-cinema | Author</h2>
        <p>Register an account.</p>

        <div className="form">
          <div className="username">
            <label htmlFor="username">
              <input
                type="username"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
         
          <div className="email">
            <label htmlFor="email">
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="password">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="confirmPassword">
            <label htmlFor="confirmPassword">
                Confirm Password:
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          <button className="submit-btn" onClick={register}>
            Register
          </button>
    
        </div>
    </div>
  )
}

export default Register
