'use server'

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: FormData): Promise<void> {
    const action = formData.get('action') as string;
    await signIn(action, { redirectTo: "/dashboard" });
}

export async function doLogout(): Promise<void> {
  await signOut({ redirectTo: "/" });
}