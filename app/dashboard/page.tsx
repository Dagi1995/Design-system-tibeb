import AppBarChart from "@/components/AppBarChart";
import { AppPieChartTickets } from "@/components/AppPeiChart";
import StatsCards from "@/components/StatsCard";
import data from "./data.json";
import { DataTable } from "@/components/table";
import AppLineChart from "@/components/AppLineChart";

export default function Home() {
  return (
    <div className="py-2">
      <div className="bg-primary-foreground p-4 rounded-2xl grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 ">
        <StatsCards />
      </div>

      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          <div className="bg-primary-foreground p-4 rounded-lg">
            <AppLineChart />
          </div>

          <div className="bg-primary-foreground p-4 rounded-lg">
            <AppPieChartTickets />
          </div>
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          <DataTable
            data={data.map((item) => ({
              id: item.id,
              fullName: item.requester,
              email: item.email,
              category: item.category,
              createdAt: item.dueDate || "", // or provide a default/placeholder if needed
              phoneNumber: item.phone,
              dueDate: item.dueDate,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
