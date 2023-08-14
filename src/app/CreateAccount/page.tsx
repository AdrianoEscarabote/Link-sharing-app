import Form from "./components/CreateAccountForm/index";
import style from "./style.module.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Create Account",
};

const CreateAccountPage = () => {
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
      <section className={`${style.container} w-full bg-white p-10`}>
        <div className="mb-10">
          <h1 className="HeadingM text-almost_dark">Create account</h1>
          <p className="BodyM text-gray">
            Let’s get you started sharing your links!
          </p>
        </div>
        <Form />
        <div className="flex justify-center gap-2">
          <p className="BodyM text-gray">Already have an account?</p>
          <Link
            className="hover:underline BodyM text-dark_purple"
            href="/Login"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CreateAccountPage;
