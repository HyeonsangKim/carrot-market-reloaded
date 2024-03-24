"use server";
import { redirect } from "next/navigation";

// 이함수가 서버에만 실행되게 해줌 이것만 해주면 알아서 포스트
export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    errors: ["wrong password", "password too short"],
  };
}
