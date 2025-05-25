// import { auth } from "@/auth";
// import Image from "next/image";

// import { redirect } from "next/navigation";
// import Logout from "../auth/Logout";

// export default async function Dashboard() {
//   const session = await auth();

//   if (!session?.user) redirect("/");

//   return (
//     <div className="flex flex-col items-center m-4">
//       <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
//       <Image
//         src={session?.user?.image}
//         alt={session?.user?.name}
//         width={72}
//         height={72}
//         className="rounded-full"
//       />
//       <Logout/>
//     </div>
//   );
// }


"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logout from "../auth/Logout";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session?.user) {
      router.push("/");
    }
  }, [session, status, router]);

  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center m-4">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // If no session, don't render anything (redirect will happen)
  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center m-4">
      <h1 className="text-3xl my-2">Welcome, {session?.user?.name}</h1>
      <Image
        src={session?.user?.image || "/default-avatar.png"}
        alt={session?.user?.name || "User"}
        width={72}
        height={72}
        className="rounded-full"
      />
      <Logout />
    </div>
  );
}