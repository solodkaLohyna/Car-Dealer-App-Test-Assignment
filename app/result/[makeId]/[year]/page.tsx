import { fetchVehicleMakes, fetchVehicleModels } from "@/src/lib/api";
import { Suspense } from "react";
import Link from "next/link";

interface ResultPageProps {
  params: Promise<{
    makeId: string;
    year: string;
  }>;
}

async function VehicleList({ makeId, year }: { makeId: number; year: number }) {
  const models = await fetchVehicleModels(makeId, year);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6 gap-3">
        <Link href="/" className="btn-primary">
          Back
        </Link>
        <h1 className="text-3xl font-bold">Vehicle Models for {year}</h1>
      </div>
      {models.length === 0 ? (
        <p className="text-gray-600">No models found</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {models.map((model) => (
            <div
              key={model.Model_Id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h2 className="font-semibold text-lg">{model.Model_Name}</h2>
              <p className="text-gray-600">Model Year: {year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const PageLoading = ({ year }: { year: number }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6 gap-3">
        <Link href="/" className="btn-primary">
          Back
        </Link>
        <h1 className="text-3xl font-bold">Vehicle Models for {year}</h1>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="bg-grey-200 p-4 rounded-lg shadow-md animate-pulse h-[84px]"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default async function ResultPage({ params }: ResultPageProps) {
  const makeId = Number((await params).makeId);
  const year = Number((await params).year);

  return (
    <Suspense fallback={<PageLoading year={year} />}>
      <VehicleList makeId={makeId} year={year} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  const makes = await fetchVehicleMakes();

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i
  );

  const pages = makes.reduce<Array<Awaited<ResultPageProps["params"]>>>(
    (acc, make) => {
      return acc.concat(
        years.map((year) => ({
          makeId: make.MakeId.toString(),
          year: year.toString(),
        }))
      );
    },
    []
  );

  return pages.slice(0, 5);
}
