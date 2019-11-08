import { Estado } from "./estado";
import { Endereco } from "./endereco";

export class Municipio {
    cdMunicipio: number;
    dsMunicipio: string;
    cdEstado: number;
    estado: Estado;
    enderecoList: Array<Endereco>;
}