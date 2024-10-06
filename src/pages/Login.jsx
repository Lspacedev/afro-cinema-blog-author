import { useState } from "react";
import { useNavigate } from "react-router";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigate();
  
  async function login(e) {
    e.preventDefault();
    let userData = {username: username, password: password};
  
  try {
   const res = await fetch("http://localhost:3000/log-in",{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    console.log(res)
    const data =  await res.json();
    alert(data.message)
     
     localStorage.setItem("token", data.token)
    navigation("/home");
  }catch(err){
    console.log(err)
  }
 
   
      
 
  }
  

  return (
      <div className="Login">
        <h2>Afro-cinema | Author</h2>
        <p>Log in to your author account.</p>

        <form method="POST" className="form-div">
        
            <label htmlFor="username">Username</label>
              <input
                type="username"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
         
     

       
            <label htmlFor="password">
              Password:     </label>
              <input
                type="password"
             
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
     

           <input
            type="submit"
            value="Submit"
            onClick={login}
          ></input>
    
        </form>
    </div>
  )
}

export default Login
