import { Municipio } from "./municipio";

export class Estado {
    cdEstado: number;
    dsEstado: string;
    dsSigla: string;
    municipioList: Array<Municipio>;
    dtRegistro: Date;
    dtAlteracao: Date;
}