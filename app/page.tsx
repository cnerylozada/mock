import { Greeter } from "@/components/modules/contracts/Greeter";
import { WalletDetails } from "@/components/modules/wallet/WalletDetails";

export default function Home() {
  return (
    <main>
      <WalletDetails />
      <Greeter />
    </main>
  );
}
