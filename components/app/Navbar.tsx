import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="mb-4 p-3 flex space-x-4 bg-yellow-300">
      <div>Navbar</div>
      <div className="">
        <div>
          <Link href={"/users"}>Users</Link>
        </div>
      </div>
    </div>
  );
};
