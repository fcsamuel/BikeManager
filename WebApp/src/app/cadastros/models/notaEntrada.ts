import { Conta } from "./conta";
import { ClienteFornecedor } from "./clienteFornecedor";
import { ItemNotaEntrada } from "./itemNotaEntrada";

export class NotaEntrada {
    cdNotaEntrada: number;
    cdConta: number;
    conta: Conta;
    cdClienteFornecedor: number;
    clienteFornecedor: ClienteFornecedor;
    nrNota: string;
    nrSerie: string;
    fgLancada: boolean;
    nrChaveAcesso: string;
    dtEmissao: Date;
    vlTotal: number;
    vlPendente: number;
    dtRegistro: Date;
    dtAlteracao: Date;
    itemList: Array<ItemNotaEntrada>;
}