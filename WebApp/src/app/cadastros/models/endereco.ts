import { ClienteFornecedor } from "./clienteFornecedor";
import { Estado } from "./estado";
import { Municipio } from "./municipio";

export class Endereco {
    cdEndereco: number;
    municipio: Municipio;
    clienteFornecedor: ClienteFornecedor;
    nrCep: string;
    dsRua: string;
    nrNumero: string;
    dsReferencia: string;
    dsComplemento: string;
    dtRegistro: Date;
    dtAlteracao: Date;
}