import React from "react";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom)
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId], 
    () => fetchCoinHistory(coinId),
    // {
    //     refetchInterval: 10000,
    // }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price", 
              data: data?.map((price) => parseFloat(price.close)) ?? []
                                                      // ?? [] : 데이터가 null이 되는 걸 방지하는 코드 - null 대신 빈 배열 반환
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
                curve: "smooth",
                width: 4,
            },
            yaxis: { show: false },
            xaxis: { 
                // axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false},
                type: "datetime",
                categories: data?.map((price) => 
                    new Date(price.time_close * 1000).toISOString()
                ),
            },
            fill: { 
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
                y: {
                    formatter: (value) => `$ ${value.toFixed(2)}`
                }
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;
