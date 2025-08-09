import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import { AppPeiChart } from "@/components/AppPeiChart";

export default function Home() {
  return (<div>
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart></AppBarChart>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg"> test1</div>
      <div className="bg-primary-foreground p-4 rounded-lg ">Test1</div>
      <div className="bg-primary-foreground p-4 rounded-lg"><AppPeiChart></AppPeiChart> </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart></AppAreaChart>
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">Test1</div>
    </div>
   <div className="flex flex-col items-center justify-center min-h-screen p-4">
    
   </div>
   </div>
 
  );
}
