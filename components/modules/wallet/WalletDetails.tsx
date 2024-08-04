"use client";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "@/client";
import { mainnet, sepolia } from "thirdweb/chains";
import { Account } from "thirdweb/wallets";

const Balance = ({ account }: { account: Account }) => {
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: mainnet,
    address: account.address,
  });
  return (
    <div>
      {!isLoading ? (
        <p>
          Wallet balance: {balance?.displayValue} {balance?.symbol}
        </p>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export const WalletDetails = () => {
  const account = useActiveAccount();

  return (
    <div>
      {account ? (
        <div>
          <p>Wallet address: {account.address}</p>
          <Balance account={account} />
        </div>
      ) : (
        <div>There is no wallet connected</div>
      )}
    </div>
  );
};
