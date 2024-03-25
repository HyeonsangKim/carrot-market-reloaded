"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
export default function Login() {
  const [state, action] = useFormState(handleForm, null);
  //   const { pending } = useFormStatus() // form 의 자식에서만 사용가능
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Login with email and password.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input name={"email"} type="email" placeholder="Email" required />
        <Input
          name={"password"}
          type="password"
          placeholder="Password"
          required
        />
        <Button text="Login" />
      </form>

      <SocialLogin />
    </div>
  );
}
