"use client";
import { client } from "@/client";
import { hardhat, mainnet, sepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

export const ConnectWallet = () => {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
  ];
  const recommendedWallets = [createWallet("io.metamask")];

  return (
    <div>
      <ConnectButton
        client={client}
        connectModal={{
          title: "Choose your wallet",
          welcomeScreen: {
            title: "This is the title",
            subtitle: "This is the subtitle",
            img: {
              src: "https://storage.builderall.com//franquias/2/862710/editor-html/12352903.png",
              height: 100,
              width: 200,
            },
          },
        }}
        wallets={wallets}
        // chain={sepolia}
        chains={[sepolia, mainnet, hardhat]}
        recommendedWallets={recommendedWallets}
      />
    </div>
  );
};
