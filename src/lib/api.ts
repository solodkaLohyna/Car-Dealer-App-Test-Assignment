import { VehicleApiResponse, VehicleMake, VehicleModel } from "../types";

export const fetchVehicleMakes = async (): Promise<VehicleMake[]> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_VEHICLE_MAKES_API!);
    const data: VehicleApiResponse<VehicleMake> = await response.json();
    return data.Results;
  } catch (error) {
    console.error("Failed to fetch vehicle makes", error);
    throw new Error("Failed to fetch vehicle makes");
    return [];
  }
};

const wait = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchVehicleModels = async (
  MakeId: number,
  year: number
): Promise<VehicleModel[]> => {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/MakeId/${MakeId}/modelyear/${year}?format=json`
    );

    await wait(1000);

    const data: VehicleApiResponse<VehicleModel> = await response.json();
    return data.Results;
  } catch (error) {
    console.error("Failed to fetch vehicle models", error);
    return [];
  }
};
