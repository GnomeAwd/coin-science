import CoinTable from "@/components/coinTable";
import Navbar from "@/components/navbar";
import {Github} from "lucide-react";
 
export default async function Home() {
  return (
    <div className="h-fit w-screen flex flex-col gap-4 items-start justify-start pb-12">
      <Navbar />
      <div className="h-fit w-full flex flex-col gap-4 items-start justify-start px-12">
        <CoinTable />
      </div>
      <div className="h-fit w-full flex gap-4 items-center justify-end px-12">
      <p className="text-sm font-semibold text-muted-foreground">
        Created by Srenjoy Saha
      </p>
       <a href="https://github.com/GnomeAwd"><Github className="h-5 w-5"/></a>
      </div>
    </div>
  );
}
