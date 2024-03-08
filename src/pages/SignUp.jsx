import { useState } from "react"
import { Link } from "react-router-dom"

function SignUp() {
    const [ form,setForm ] = useState({
        email:'',
        password:''
    })
    console.log(form)

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
        <div className="login-title"><b>Sign up</b></div>
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
                <button className="btn login-btn" >Sigup</button>
            </form>  
        </div>
        <div style={{color:'white'}}>Already have an account? <Link style={{color:"red"}} to={'/'}>Login</Link></div>
        
        
    </div>
  )
}

export default SignUp