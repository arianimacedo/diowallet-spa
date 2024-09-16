import { zodResolver } from "@hookform/resolvers/zod";
import { BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input.jsx";
import ErrorInput from "../components/ErrorInput.jsx";
import Button from "../components/Button.jsx";
import { transactionSchema } from "../schemas/TransactionSchema.js";
import { createNewTransaction } from "../services/transactions.js";
import { useState } from "react";

export default function NewTransaction() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [apiErrors, setApiErrors]  = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  async function onSubmitForm(data) {
    try {
      const body = {...data, type} 
      await createNewTransaction(body);
      navigate("/");
    } catch(error) {
      setApiErrors(error.message)
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-around bg-zinc-900 rouded p-8 gap-7 relative">
      <header>
        <Link to="/">
          <BiArrowBack className="text-white absolute top-3 left-3 text-2xl" />
          <h1 className="text-white font-bold text-5xl">New {type}</h1>
        </Link>
      </header>

      {apiErrors && <ErrorInput text={apiErrors} />}

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col justify-center gap-4 w-full text-2xl"
      >
        <Input
          type="number"
          placeholder="Value"
          register={register}
          name="value"
        />

        

        <Input
          type="text"
          placeholder="Descrição"
          register={register}
          name="description"
        />

        {errors.description && <ErrorInput text={errors.description.message} />}

        <Button type="submit" text="SALVAR" />
      </form>
    </div>
  );
}
