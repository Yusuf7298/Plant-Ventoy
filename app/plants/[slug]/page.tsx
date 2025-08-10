import React from "react";
import { getPlantById } from "@/src/actions/plant.action";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";
import PlantCard from "./plantCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Await params
  const [id] = slug.split("--");

  const plant = await getPlantById(id);
  return {
    title: plant ? plant.name : "Plant Details",
    description: plant ? plant.description : "Plant details page",
  };
}

async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Await params
  const [id] = slug.split("--");

  const user = await stackServerApp.getUser();
  const plant = await getPlantById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <PlantCard plant={plant} />
      </div>
    </div>
  );
}

export default Page;
