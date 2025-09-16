import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import { AppPieChartTickets } from "@/components/AppPeiChart";
import StatsCards from "@/components/StatsCard";
import { TextEditor } from "@/design-system/src/components/organisms/TextEditor";
import data from "./data.json";
import { DataTable } from "@/components/table";

export default function Home() {
  return (
    <div>
      <div className="bg-primary-foreground p-4 grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 ">
        <StatsCards />
      </div>
      <div className="">
        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <AppBarChart></AppBarChart>
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          <AppPieChartTickets></AppPieChartTickets>{" "}
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          <DataTable
            data={data.map((item) => ({
              ...item,
              priority: item.priority as "High" | "Critical" | "Medium" | "Low",
              status: item.status as
                | "In Progress"
                | "Open"
                | "Resolved"
                | "Closed",
            }))}
          />
        </div>
      </div>
    </div>
  );
}
