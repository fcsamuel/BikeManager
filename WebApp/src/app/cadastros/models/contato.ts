import { ClienteFornecedor } from "./clienteFornecedor";

export class Contato {
    cdContato: number;
    nmContato: string;
    cdClienteFornecedor: number;
    clienteFornecedor: ClienteFornecedor;
    nrNumero: string;
    dsEmail: string;
    dtRegistro: Date;
    dtAlteracao: Date;
}