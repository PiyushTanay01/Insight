import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import { SignupInput } from "@piyushtanay/medium-common1";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type:"signup"|"signin"})=>{
    const navigate=useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        username:"",
        password:""
    });

    async function sendRequest(){
        try{
            setIsLoading(true);
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
            const jwt=await response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
            setTimeout(() => {
            setIsLoading(false); 
            }, 2000);
        }
        catch(e){
            alert("Error while signing up");
        } 
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-14">
                <div className="text-4xl font-extrabold ">
                {type==="signup"?"Create an account":"Sign in to your account"}
                </div>
                <div className="text-slate-500">
                    {type==="signin"?"Don't have an account?":"Already have an account"} 
                    <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>
                        {type==="signin"?"Sign up":"Sign in"}
                    </Link>
                </div>
            </div>
            <div className="pt-8">
            {type==="signup"?<LabelledInput label="Name" placeholder="John..." onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }}/>:null}
            <LabelledInput label="Username" placeholder="John@gmail.com" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    username:e.target.value
                })
            }}/>
            <LabelledInput1 label="Password" type={"password"} placeholder="123456" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password:e.target.value
                })
            }}/>
            {/* <button onClick={sendRequest} type="button" className="ml-3 w-11/12 mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign up</button> */}
            {/* {type==="signup"?<button onClick={sendRequest} type="button" className="ml-3 w-11/12 mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign up</button>
             :<button onClick={sendRequest} type="button" className="ml-4 w-11/12 sm:ml-12 sm:w-4/5 mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign in</button> } */}
            {type === "signup" ? (
        <button
          onClick={sendRequest}
          type="button"
          className={`ml-3 w-11/12 mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
      ) : (
        <button
          onClick={sendRequest}
          type="button"
          className={`ml-4 w-11/12 sm:ml-12 sm:w-4/5 mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      )}
            </div>
            </div>
        </div>
    </div>
}
interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string;
}

function LabelledInput({label,placeholder,onChange,type}:LabelledInputType)
{
    return (
        <div className="p-4 w-full max-w-md mx-auto">
          <label className="block mb-2 text-sm font-semibold text-black pt-4">
            {label}
          </label>
          <input
            onChange={onChange}
            type={type || "text"}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={placeholder}
            required
          />
        </div>
      );
      
}
function LabelledInput1({label,placeholder,onChange,type}:LabelledInputType)
{
    const [inputType, setInputType] = useState(type);
    const [buttonText, setButtonText] = useState('Show');

    const toggleInputType = () => {
    if (inputType === 'password') {
      setInputType('text');
      setButtonText('Hide');
    } else {
      setInputType('password');
      setButtonText('Show');
    }
   };
    // return <div>
    // <label  className="block mb-2 text-sm font-semibold text-black text-bold pt-4">{label}</label>
    // <div className="relative ">
    // <input onChange={onChange} type={inputType} id="first_name" className="pr-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    // <button type="button" className="absolute right-2 top-2 h-1 border-none bg-transparent cursor-pointer" onClick={toggleInputType}>{buttonText}</button>
    // </div>
    // </div>
    return (
        <div className="p-4 w-full max-w-md mx-auto">
          <label className="block mb-2 text-sm font-semibold text-black">
            {label}
          </label>
          <div className="relative">
            <input
              onChange={onChange}
              type={inputType}
              id="first_name"
              className="pr-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={placeholder}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 border-none bg-transparent cursor-pointer"
              onClick={toggleInputType}
            >
              {buttonText}
            </button>
          </div>
        </div>
      );
      
      
}  