import { Greeter } from "@/components/modules/contracts/Greeter";
import { WalletDetails } from "@/components/modules/wallet/WalletDetails";

export default async function Home() {
  return (
    <main className="">
      <div>Home</div>
      <WalletDetails />

      <Greeter />
    </main>
  );
}
