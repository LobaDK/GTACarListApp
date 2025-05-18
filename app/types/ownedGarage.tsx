import { garage } from "./garage";
import { OwnedVehicle } from "./ownedVehicle";

export interface OwnedGarage {
    id: number;
    customName: string;
    garage: garage;
    vehicles: OwnedVehicle[];
}