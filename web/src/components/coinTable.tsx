"use client";
import Image from "next/image";
import { LoaderCircle, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetch_data } from "@/store/dataSlice";
import { CoinChart } from "@/components/coinChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSWR, { BareFetcher, Fetcher } from "swr";

export default function CoinTable() {
  const coin = useSelector((state: RootState) => state.coin.value);
  const coin_name = useSelector((state: RootState) => state.coin.label);
  const table_data = useSelector((state: RootState) => state.table.data);
  const dispatch = useDispatch();

  function formatDate(date_string: string): string {
    const date = new Date(date_string);

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  }
  const fetcher: BareFetcher<any> = (...args: any) =>
  //@ts-ignore
    fetch(...args).then(async (res) => {
      const data = await res.json();
      dispatch(fetch_data({ data: data }));
      return data;
    });

  const { data, error, isLoading } = useSWR("/api/coindata", fetcher, {
    refreshInterval: 5,
  });

  const avatars = [
    "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/btc.webp",
    "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/eth.webp",
    "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/usdt.webp",
    "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/bnb.webp",
    "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/sol.webp",
  ];
  let currency = Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  if (!isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="w-fit">
            <div className="flex flex-row items-center justify-start gap-2 font-bold">
              <Avatar className="h-6 w-6">
                <AvatarImage src={avatars[coin]} alt="a" />
                <AvatarFallback>a</AvatarFallback>
              </Avatar>
              <h1>{coin_name}</h1>
              <h2 className="text-sm font-semibold text-muted-foreground">
                - {table_data[0]?.data[coin].code}
              </h2>
            </div>

            <div className="flex flex-row items-center justify-start gap-8 py-4 text-sm text-muted-foreground">
              <h1>
                <strong>Age:</strong> {table_data[0].data[coin].age}
              </h1>
              <h1>
                <strong>All Time High:</strong> $
                {table_data[0].data[coin].allTimeHighUSD.toFixed(2)}
              </h1>
              <h1>
                <strong>Total Supply: </strong>
                {currency.format(table_data[0].data[coin].totalSupply)}
              </h1>
            </div>
          </div>
          <div className="w-1/4 rounded-xl overflow-hidden">
            <CoinChart />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead> */}
                <TableHead>Rate</TableHead>
                <TableHead className="text-center">Volume</TableHead>
                <TableHead className="text-center">Market Cap</TableHead>
                <TableHead className="text-center">Vol/MCap</TableHead>
                <TableHead className="text-center">Updated at</TableHead>
              </TableRow>
            </TableHeader>
            {/* <ScrollArea className="h-72 w-full flex"> */}
            <TableBody>
              {table_data.map((entry: any) => (
                <TableRow key={entry.timestamp}>
                  <TableCell className="font-medium w-fit xl:min-w-[300px] xl:w-[300px] py-4">
                    ${entry.data[coin].rate.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    ${currency.format(entry.data[coin].volume)}
                  </TableCell>
                  <TableCell className="text-center">
                    ${currency.format(entry.data[coin].cap)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">
                      {(entry.data[coin].volume / entry.data[coin].cap).toFixed(
                        2
                      )}
                      %
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(entry.timestamp)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* </ScrollArea> */}
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing Latest <strong>20</strong> rates
          </div>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <div className="w-full flex h-[50vh] items-center justify-center">
        <LoaderCircle className="h-6 w-6 animate-spin" />
      </div>
    );
  }
}
