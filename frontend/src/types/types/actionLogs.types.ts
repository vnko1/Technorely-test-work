import { ActionLog } from "../enums";
import { ICompany } from "./company.types";
import { IInstance, IMeta } from "./instance.types";
import { IUser } from "./user.types";

interface IMetaData {
  [k: string]: string;
}

export interface ILog extends Omit<IInstance, "updatedAt"> {
  action: ActionLog;
  userId: number | null;
  companyId: number | null;
  entityName: string | null;
  metadata: IMetaData | null;
  user: IUser | null;
  company: ICompany | null;
}

export type LogsApiType = { data: Array<ILog>; meta: IMeta };
