import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function LogIn() {
    const [ form,setForm ] = useState({
        email:'',
        password:''
    })

    useEffect(() => {


        
    }, []);

    function handleChange(e) {
        const { name,value } = e.target

        setForm(prev => {
            return {
                ...prev,
                [name]:value
            }
        })

    }

    function handleSubmit(e) {
        e.preventDefault()
        
    }

  return (
    <div className="login-page">
        <div className="login-title"><b>Login</b></div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
                <br />
                <input 
                    type="email" 
                    placeholder="Email" 
                    name="email"
                    onChange={(e)=>handleChange(e)}
                />
                <br />
                <br />
                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    onChange={(e)=>handleChange(e)}
                />
                <br />
                <br />
                <button className="btn login-btn" >Log In</button>
            </form>  
        </div>
        <div style={{color:"white"}}>Don't have an account? <Link style={{color:"red"}} to={'signup'}>Sign Up</Link></div>
        
        
    </div>
  )
}

export default LogIn
