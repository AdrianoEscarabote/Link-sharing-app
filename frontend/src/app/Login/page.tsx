import Login from "./components/LoginForm/index";
import style from "./style.module.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <main
      className={`${style.main} min-h-screen flex items-center justify-center flex-col gap-12 bg-almost_white`}
    >
      <Image
        src="/assets/logo-devlinks-large.svg"
        width="182"
        height="40"
        alt=""
      />
      <section
        className={`${style.container} w-full flex flex-col p-10 bg-white`}
      >
        <div className="mb-10">
          <h1 className="HeadingM">Login</h1>
          <p className="BodyM text-gray">
            Add your details below to get back into the app
          </p>
        </div>
        <Login />
        <div className={`${style.wrapper_link} flex justify-center gap-2 mt-6`}>
          <p className="BodyM text-gray">Don’t have an account?</p>
          <Link
            className="hover:underline BodyM text-dark_purple"
            href="/CreateAccount"
          >
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
