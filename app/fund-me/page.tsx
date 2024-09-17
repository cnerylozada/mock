"use client";
import { client } from "@/client";
import { Address, getContract, prepareEvent, toEther } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useContractEvents } from "thirdweb/react";

export default function FundMePage() {
  const contract = getContract({
    client,
    address: "0x0893E68222D8AA93ED733b961B4ee84261380a44",
    chain: sepolia,
  });
  const myEvent = prepareEvent({
    signature: "event fundEvent(address funder, uint amount)",
  });

  const { isLoading, data, isError } = useContractEvents({
    contract,
    events: [myEvent],
  });

  return (
    <div>
      {isLoading && <div>Cargando ...</div>}
      {data && (
        <div>
          {data.map((_, index) => {
            const item = _.args as { funder: Address; amount: bigint };
            return (
              <div key={index}>
                <div>Funder: {item.funder}</div>
                <div>Amount: {toEther(item.amount)} ETH</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
