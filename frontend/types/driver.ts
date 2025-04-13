export interface IDriver {
  _id: string;
  name: string;
  email: string;
  role: "driver";
  vehicle?: {
    model: string;
    plateNumber: string;
    capacity?: number;
  };
  orderCount: number;
}
