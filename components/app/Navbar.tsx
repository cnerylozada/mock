import { auth, signOut } from "@/auth";
import Link from "next/link";
import { ConnectWallet } from "../modules/wallet/ConnectWallet";

export const Navbar = async () => {
  const session = await auth();
  return (
    <div className="mb-4 p-2 flex items-center space-x-4 bg-yellow-300">
      <div>
        <Link href={"/"}>Nextjs101</Link>
      </div>
      <div className="flex-grow space-x-4 flex items-center justify-end">
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
        <ConnectWallet />
      </div>
    </div>
  );
};
