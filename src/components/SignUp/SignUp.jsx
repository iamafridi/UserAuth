import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";



const SignUp = () => {

    const [signUpError, setSignUpError] = useState('');
    const [success, setsucess] = useState('');
    const [showPassword, setShowPassword] = useState(false);



    const handleSignUp = e => {
        e.preventDefault();
        console.log('submited');
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const aceptedTerms = e.target.terms.checked;
        console.log(name, email, password, aceptedTerms);

        //Reset Error
        setSignUpError('');
        setsucess('');


        if (password.length < 6) {
            setSignUpError(' Password should be at least 6 characters (auth/weak-password).')
            return;
        }
        else if (!aceptedTerms){
            setSignUpError('Warning : Please Accept our terms and conditions!')
            return;
        }

        //create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setsucess('User Created Successfully')

                //Update Profile
                updateProfile(result.user,{
                    displayName : name,
                    photoURL: "https://pm1.aminoapps.com/7839/c4c7daae0f85bdda14820127b50a2f6c38350f60r1-735-1102v2_hq.jpg"
                })
                .then(()=> console.log("Profile Updated"))
                .catch()

                // Send Varification
                sendEmailVerification(result.user)
                .then(()=>{
                    alert("Please Check Your Email And Verify Your Email");
                })
            })
            .catch(
                error => {
                    console.error(error);
                    setSignUpError(error.message);
                }
            )


    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Your Name" className="input input-bordered" name="name" required />
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" name="email" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered w-full"
                                    required />
                                <span className=" text-xs m-1 p-0.5  top-1/3 absolute border border-cyan-600 rounded-2xl" onClick={() => setShowPassword(!showPassword)}>

                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }

                                </span>
                            </div>
                            <br />
                            <div className="flex items-center mb-3 ">
                                <input type="checkbox" name="terms" id="terms" value="" />
                                <label className="ml-2 text-xs" htmlFor="terms">Accept out <a href="">Terms and Condition</a> </label>

                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>

                </div>
                {

                    signUpError && <p className="italic text-sm text-slate-950">{signUpError}</p>
                }
                {
                    success && <p className="font-serif text-sm text-green-600">{success}</p>
                }

<p className="text-center p-3 font-semibold italic text-sm">Already Have an Account ? Please <Link className="text-blue-800 font-bold not-italic" to= "/signin">SIGNIN </Link> </p>

            </div>
        </div>
    );
};

export default SignUp;