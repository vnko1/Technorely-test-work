import { IInstance, IMeta } from "./instance.types";

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface ICompany extends IInstance {
  name: string;
  capital: bigint;
  logo: string | null;
  location: ILocation | null;
  coords: string | null;
  userId: number;
  service: string;
  currency: string;
}

export type CompaniesType = { data: Array<ICompany>; meta: IMeta };
