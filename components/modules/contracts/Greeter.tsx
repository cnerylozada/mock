"use client";
import { client } from "@/client";
import { formatAddresss } from "@/utils/utils";
import { useState } from "react";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";

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

  const [greetings, setGreetings] = useState("");
  const { mutate, data, isPending, isSuccess, status } = useSendTransaction();
  const onSetGreeting = (_greeting: string) => {
    const transaction = prepareContractCall({
      contract,
      method: "function setGreeting(string _greeting)",
      params: [_greeting],
    });
    mutate(transaction);
  };
  const activeAccount = useActiveAccount();

  return (
    <div className="p-3 border rounded-md">
      <div>Greeter contract: {formatAddresss(contract.address)}</div>
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
        <div className="space-x-4">
          <span>Set a new greetings:</span>
          <input
            value={greetings}
            onChange={(event) => {
              setGreetings(event.target.value);
            }}
            className="p-1 border"
          />
          {!activeAccount && (
            <div className="text-xs uppercase text-red-500">
              Please connect your wallet to perform actions
            </div>
          )}
        </div>
        {activeAccount && (
          <div>
            <button
              disabled={isPending}
              onClick={() => onSetGreeting(greetings)}
              className="p-2 bg-blue-200 rounded-md text-sm"
            >
              {isPending ? "Processing ..." : "Set new greetings"}
            </button>

            {isSuccess && data && (
              <div className="text-sm text-green-700">
                <a
                  href={`https://sepolia.etherscan.io/tx/${data.transactionHash}`}
                  target="_blank"
                >
                  {`https://sepolia.etherscan.io/tx/${formatAddresss(
                    data.transactionHash
                  )}`}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
