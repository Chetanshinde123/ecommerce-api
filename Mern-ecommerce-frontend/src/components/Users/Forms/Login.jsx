import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlice";
import { useNavigate } from "react-router-dom";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComp from "../../LoadingComp/LoadingComp";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // email: "chetan@gmail.com",
    // password: "12345",
  });

//   // Destructure formData
  const { email, password } = formData;

//   // Redux state for user authentication
  const userAuth = useSelector((state) => state.users.userAuth);
  

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault(); // Prevent Enter key from submitting the form
  //   }
  // };
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChangerHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error once user starts typing
    if (error) {
      setIsSubmitted(false); // Reset the submitted state to avoid showing the error
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // window.location.reload()
    dispatch(loginUserAction({ email, password }));
  };


  const {error,loading,userInfo} = useSelector((state) => state.users.userAuth)


// //   // Redirect on successful login
//   useEffect(() => {
//     // Redirect after userInfo is updated
//     if (userInfo?.userFound?.isAdmin) {
//       window.location.href = "/admin"; // Redirect to admin route
//     } else if (userInfo?.userFound) {
//       window.location.href = "/customer"; // Redirect to customer route
//     }
//   }, [userInfo]);  // Dependency on userInfo to watch for changes

  

  return (
    <>
      <section className="p py-20 bg-gray-100 ">
        <div className="relative container px-4 mx-auto">
          <div className="absolute inset-0 bg-blue-200 my-24 -ml-4">
            <div className="relative flex flex-wrap bg-white">
              <div className="w-full md:w-4/6 px-4">
                <div className="lg:max-w-3xl mx-auto py-20 px-4 md:px-10 lg:px-20">
                  <h3 className="mb-8 text-4xl md:text-5xl font-bold font-heading">
                    Login to your account
                  </h3>
                  {error && <ErrorMsg message={error?.message}/>}
                  <p className="mb-10 font-semibold text-white font-heading">
                    Happy to see you again..
                  </p>

                  <form className="flex flex-wrap -mx-4" onSubmit={onSubmitHandler} >

                    <div className="w-full md:w-1/2 px-4 mb-8 md:mb-12">
                      <label>
                        <h4 className="mb-5 text-gray-400 uppercase font-bold font-heading">
                          Your Email
                        </h4>
                        <input
                          name="email"
                          value={email}
                          onChange={onChangerHandler}
                          // onKeyDown={handleKeyDown}
                          className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                          type="email"
                        />
                      </label>
                    </div>
                    <div className="w-full md:w-1/2 px-4 mb-12">
                      <label>
                        <h4 className="mb-5 text-gray-400 uppercase font-bold font-heading">
                          Password
                        </h4>
                        <input
                          name="password"
                          value={password}
                          onChange={onChangerHandler}
                          // onKeyDown={handleKeyDown}
                          className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                          type="password"
                        />
                      </label>
                    </div>

                    <div className="w-full px-4">
                      {loading ? ( 
                        <LoadingComp/>
                       ) : (
                        <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-8 rounded-md uppercase">
                        Login
                      </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div className="w-full md:w-2/6 h-128 md:h-auto flex items-center"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
