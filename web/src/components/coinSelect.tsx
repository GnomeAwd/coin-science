import * as React from "react";
import type { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { update } from "@/store/coinSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CoinSelect() {
  const coin = useSelector((state: RootState) => state.coin.value);
  const dispatch = useDispatch();
  const coins = [
    {
      value: 0,
      label: "Bitcoin",
    },
    {
      value: 1,
      label: "Ethereum",
    },
    {
      value: 2,
      label: "Tether",
    },
    {
      value: 3,
      label: "BNB",
    },
    {
      value: 4,
      label: "Solana",
    },
  ];

  const avatars = [
    "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/btc.webp",
    "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/eth.webp",
    "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/usdt.webp",
    "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/bnb.webp",
    "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/sol.webp",
  ];
  return (
    <Select
      onValueChange={(e) => {
        dispatch(update(coins[parseInt(e)]));
      }}
      value={coin.toString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Coin" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {coins.map((entry: { value: number; label: string }) => (
            <SelectItem value={entry.value.toString()} key={entry.value}>
              <div className="flex flex-row items-center justify-start gap-2">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={avatars[entry.value]} alt={entry.label} />
                  <AvatarFallback>{entry.label}</AvatarFallback>
                </Avatar>
                <h1 className="text-sm font-semibold">{entry.label}</h1>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
