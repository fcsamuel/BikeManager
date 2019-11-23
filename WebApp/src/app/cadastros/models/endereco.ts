import { ClienteFornecedor } from "./clienteFornecedor";
import { Estado } from "./estado";
import { Municipio } from "./municipio";

export class Endereco {
    cdEndereco: number;
    municipio: Municipio;
    dsMunicipio: string;
    dsSigla: string
    clienteFornecedor: ClienteFornecedor;
    cdClienteFornecedor: number;
    cdMunicipio: number;
    cdEstado: number;
    nrCep: string;
    dsRua: string;
    nrNumero: string;
    dsBairro: string;
    dsReferencia: string;
    dsComplemento: string;
    dtRegistro: Date;
    dtAlteracao: Date;
}