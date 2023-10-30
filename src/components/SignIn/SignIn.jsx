import {  sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
    const [signInError, setSignInError] = useState('');
    const [success, setsucess] = useState('');
const emailRef = useState(null);

    const handleSignIn = e => {
        e.preventDefault();
        console.log('submited');

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        //Reset Error
        setSignInError('');
        setsucess('');

        // creating user
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setsucess('User Logged in Successfullly')
            })
            .catch(error => {
                console.error(error);
                // setSignInError(error.message) 
            })
    }

 const handleForgetPassword =() =>{
    const email = emailRef.current.value;

    if(!email){
    console.log('email de');
        return;
    }
    else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        console.log("email de beda");
        return;    
    
    }
    
        // Send validation email
        sendPasswordResetEmail(auth, email)
        .then( ()=>{
            alert("Check Email;");
        })
        .catch(error =>{
            console.log(error);
        })
 }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign In Now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" 
                            placeholder="email"
                            ref={emailRef}
                             className="input input-bordered"
                              name="email" 
                              required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {

signInError && <p className="italic text-sm text-slate-950">{signInError}</p>
}
{
success && <p className="font-serif text-center text-sm text-green-600">{success}</p>
}

<p className="text-center p-3 font-semibold italic text-sm">New To Here ? Please <Link className="text-blue-800 font-bold not-italic" to= "/signup">SIGNUP </Link> </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;