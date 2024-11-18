
export interface VehicleMake {
    MakeId: number;
    MakeName: string;
  }
  
  export interface VehicleModel {
    Model_Id: number;
    Model_Name: string;
    Make_Id: number;
  }
  
  export interface VehicleApiResponse<T> {
    Count: number;
    Message: string;
    Results: T[];
  }
  