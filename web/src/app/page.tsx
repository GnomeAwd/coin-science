import CoinTable from "@/components/coinTable";
import Navbar from "@/components/navbar";

export default async function Home() {
  return (
    <div className="h-fit w-screen flex flex-col gap-4 items-start justify-start pb-12">
      <Navbar />
      <div className="h-fit w-full flex flex-col gap-4 items-start justify-start px-12">
        <CoinTable />
      </div>
    </div>
  );
}
