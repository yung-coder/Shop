import React, { useEffect, useState } from "react";
import { clearErrors, login, register } from "../../actions/useraction";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authtoogle, setauthtoogle] = useState("login");
  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setavatar] = useState();
  const [avatarPreview, setavatarPreview] = useState();

  const loginSumbit = (e) => {
    e.preventDefault();
    dispatch(login(loginemail, loginpassword));
    console.log("submitted sigin");
  };

  const registerSumbit = (e) => {
    e.preventDefault();

    const myfrom = new FormData();

    myfrom.set("name", name);
    myfrom.set("email", email);
    myfrom.set("password", password);
    myfrom.set("avatar", avatar);
    console.log("subitted signup");
    dispatch(register(myfrom));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPreview(reader.result);
          setavatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setuser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      toast("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("error");
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {authtoogle == "login" ? (
        <>
          <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form
                    class="space-y-4 md:space-y-6"
                    action="#"
                    onSubmit={loginSumbit}
                  >
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                        onChange={(e) => setloginemail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        onChange={(e) => setloginpassword(e.target.value)}
                      />
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required=""
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label
                            for="remember"
                            class="text-gray-500 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Dont have an account yet?{" "}
                      <a
                        href="#"
                        onClick={() => setauthtoogle("Signup")}
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create and account
                  </h1>
                  <form
                    class="space-y-4 md:space-y-6"
                    action="#"
                    onSubmit={registerSumbit}
                  >
                    <div>
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                        onChange={registerDataChange}
                      />
                    </div>
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                        onChange={registerDataChange}
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        onChange={registerDataChange}
                      />
                    </div>
                    <div>
                      <label
                        for="avatar"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Profile Image
                      </label>
                      <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        placeholder=""
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        onChange={registerDataChange}
                      />
                    </div>
                    <button
                      type="submit"
                      class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Create an account
                    </button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <a
                        href="#"
                        onClick={() => setauthtoogle("login")}
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AuthUser;
