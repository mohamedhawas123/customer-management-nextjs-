import { baseUrl } from "@/constant/constant";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Auth = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()


  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("user") ?? "null");
    if(isLogged !=null) {
      router.push("/")
    }
  }, [])

  const authenticate = async () => {
    try {
      let responseData;
  
      if (isSignUp) {
        const res = await fetch(`${baseUrl}/auth/signup`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            password: password,
            name: name
          })
        });
        responseData = await res.json();
  
        if (res.status !== 201) {
          setError("the username is already exists");
        } else {
          localStorage.setItem("user", JSON.stringify(responseData));
          toast.success("Sign up successful!");
          router.push("/");
          dispatch({type: 'SIGN_IN'})

        }
      } else {
        const res = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        });
        responseData = await res.json();
  
        if (res.status !== 201) {
          setError("Username or password incorrect");
        } else {
          localStorage.setItem("user", JSON.stringify(responseData));
          router.push("/");
          dispatch({type: 'SIGN_IN'})

          toast.success("Logged in successful!");

        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <div className="container mx-auto max-w-sm flex flex-col items-center justify-center h-screen">
        <h4 className="text-2xl font-bold mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h4>
        {isSignUp && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full py-2 px-4 mb-4 border rounded-lg"
            type="text"
            placeholder="Name"
          />
        )}
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="w-full py-2 px-4 mb-4 border rounded-lg"
          type="text"
          placeholder="Username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full py-2 px-4 mb-4 border rounded-lg"
          type="password"
          placeholder="Password"
        />
        <button
          onClick={authenticate}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </button>
        <button
          onClick={toggleSignUp}
          className="text-red-500 mt-4 hover:underline"
        >
          {isSignUp ? "Back to Login" : "Sign Up"}
        </button>
        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
      </div>
    </>
  );
};

export default Auth;
