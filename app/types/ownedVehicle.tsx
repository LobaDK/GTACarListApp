import { OwnedGarage } from "./ownedGarage";
import { Vehicle } from "./vehicle";

export interface OwnedVehicle {
    id: number;
    upgrades: string;
    vehicle: Vehicle;
    garage: OwnedGarage;
}