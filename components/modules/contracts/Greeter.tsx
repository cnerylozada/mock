"use client";
import { client } from "@/client";
import { formatAddresss } from "@/utils/utils";
import { useState } from "react";
import { getContract, prepareContractCall } from "thirdweb";
import { hardhat } from "thirdweb/chains";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";

export const Greeter = () => {
  const greeterContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contract = getContract({
    client,
    chain: hardhat,
    address: greeterContractAddress,
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
  const { mutate, data, isPending, isSuccess } = useSendTransaction();
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
