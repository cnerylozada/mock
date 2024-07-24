import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      <div>DashboardPage</div>
      <div>{JSON.stringify(session, null, 4)}</div>
    </div>
  );
}
