"use client";

import * as React from "react";
import { Area, AreaChart} from "recharts";


import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";



const chartConfig = {
  views: {
    label: "Rate",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CoinChart() {
    const coin = useSelector((state: RootState) => state.coin.value);
  const table_data = useSelector((state: RootState) => state.table.data);
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");
     const [chartData, setChartData] = React.useState<any[]>([]);
 React.useEffect(() => {
    const graphData:any[] = []
    table_data.map((data)=>{
        graphData.push({date:data.timestamp,rate:parseFloat(data.data[coin].rate.toFixed(2))})
    })
    setChartData(graphData.reverse())
 }, [table_data, coin]);


  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[80px] w-full"
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
          top: 12,
          bottom: 12,
        }}
        stackOffset="wiggle"
      >
        <Area dataKey="rate" fill={`hsl(var(--primary))`} />
      </AreaChart>
    </ChartContainer>
  );
}
