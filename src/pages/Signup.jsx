import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import { signup } from "../services/user";

import { BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "../components/ErrorInput";

import { signupSchema } from "../schemas/SignupSchema";

import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState("");


  async function handleSubmitForm(data) {
    try {
      await signup(data);
      navigate("/signin")
      
    } catch (error) {
        console.log(error.message);
        setApiErrors(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem] relative ">
      <Link to="/signin">
        <BiArrowBack className="text-white absolute top-3 left-3 text-2xl hover:text-sky-600" />
      </Link>
      <img src={logo} alt="logo" className="w-44" />
      {errors.email && <ErrorInput text={errors.email.message} />}
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col items-center justify-center gap-4 w-full text-2xl"
      >
        <Input
          type="text"
          placeholder="Nome completo"
          register={register}
          name="name"
        />

        {errors.name && <ErrorInput text={errors.name.message} />}

        <Input
          type="email"
          placeholder="Email"
          register={register}
          name="email"
        />
        {errors.email && <ErrorInput text={errors.email.message} />}

        <Input
          type="password"
          placeholder="Senha"
          register={register}
          name="password"
        />

        {errors.password && <ErrorInput text={errors.password.message} />}

        <Input
          type="password"
          placeholder="Confirme a senha"
          register={register}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <ErrorInput text={errors.confirmPassword.message} />
        )}

        <Button type="submit" text="Registre-se" />
      </form>
    </div>
  );
}
