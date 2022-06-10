import React, { useEffect } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../Firebase.init';
import useToken from '../hook/useToken';
import Loading from './Loading';

const Login = () => {
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const {
      register,
      watch,
      formState: { errors },
      handleSubmit,
    } = useForm();
    const email = watch("email");

    const [signInWithEmailAndPassword, user, loading, error] =
      useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const [signInWithGoogle, gUser, gLoading, gError] =
      useSignInWithGoogle(auth);

    const [sendPasswordResetEmail, sending, pResetError] =
      useSendPasswordResetEmail(auth);
const [token] = useToken(user || gUser);
    useEffect(() => {
      if (token) {
        navigate(from, { replace: true });
      }
    }, [token,from,navigate]);

    if (loading || gLoading || sending) {
      return <Loading/>;
    }

    const onSubmit = (data) => {
      const {email,password}=data
     signInWithEmailAndPassword(email, password);
     
    };
    return (
      <div className="md:w-1/2 mx-auto shadow-xl p-10 my-10 rounded-xl font-serif">
        <div>
          <h1 className="text-center text-2xl font-bold text-blue-500  ">
            Please Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full "
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is requires",
                  },
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Provide a valid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is requires",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>

            <input
              className="btn w-2/5 mx-auto block"
              type="submit"
              value="Login"
            />
          </form>
        </div>
        {(error || gError || pResetError) && (
          <p className="text-center text-red-600">
            {error?.message} {gError?.message} {pResetError?.message}
          </p>
        )}

        <p className="text-center mt-4">
          New to Eubrics?{" "}
          <Link to="/register" className="text-blue-500">
            Create new account
          </Link>
        </p>
        <p className="text-center mt-4">
          Forgat Password?{" "}
          <button
            className="text-blue-500"
            onClick={async () => {
              await sendPasswordResetEmail(email);
              alert("Sent email");
            }}
          >
            Reset Password
          </button>
        </p>
        <div className="divider">OR</div>
        <div className="flex justify-center">
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    );
};

export default Login;