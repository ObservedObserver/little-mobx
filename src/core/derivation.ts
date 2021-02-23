import { IRunner } from "../interfaces";

export interface IDerivation {
    id: string;
    runner: IRunner;
    links: string[];
}

export const derivationMap: Map<string, IRunner[]> = new Map();