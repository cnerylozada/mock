"use client";
import { client } from "@/client";
import { getContract, readContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";

export const Greeter = () => {
  const contract = getContract({
    client,
    chain: sepolia,
    address: "0xaB8b71C581774F91E2F3f98b8036F6B3F9C87524",
  });

  const {
    data: currentGreet,
    isFetching,
    refetch,
  } = useReadContract({
    contract,
    method: "function greet() view returns (string)",
    params: [],
  });

  return (
    <div className="p-3 border rounded-md">
      <div>Greeter contract: {contract.address}</div>
      <div className="space-x-4">
        <button
          onClick={() => refetch()}
          className="p-2 bg-blue-200 rounded-md text-sm"
        >
          Call greet
        </button>
        <span>Value: {isFetching ? "Loading ..." : currentGreet}</span>
      </div>
      <div>
        <div>Set a message</div>
        <div>
          <input />
        </div>
      </div>
    </div>
  );
};
