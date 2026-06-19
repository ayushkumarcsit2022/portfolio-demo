import React from "react";
import PortfolioContainer from "@/components/ui/PortfolioContainer";
import { getPortfolioData } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();

  return <PortfolioContainer data={data} />;
}
