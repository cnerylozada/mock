import { auth, signOut } from "@/auth";
import Link from "next/link";

export const Navbar = async () => {
  const session = await auth();

  return (
    <div className="mb-4 p-3 flex space-x-4 bg-yellow-300">
      <div>Navbar</div>
      <div className="flex-grow flex space-x-4 justify-end">
        <div>
          <Link href={"/products"}>Products</Link>
        </div>
        {!session && (
          <>
            <div>
              <Link href={"/auth/login"}>Login</Link>
            </div>
            <div>
              <Link href={"/auth/register"}>Register</Link>
            </div>
          </>
        )}
        {session && (
          <>
            <div>{session?.user?.name}</div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/auth/login" });
              }}
            >
              <button type="submit">Logout</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
