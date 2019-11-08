import { ClienteFornecedor } from "./clienteFornecedor";
import { ItemOrcamento } from "./itemOrcamento";

export class Orcamento {
    cdOrcamento: number;
    cdClienteFornecedor: number;
    dtAbertura: Date;
    dtPrevConclusao: Date;
    dtConclusao: Date;
    dsObservacao: string;
    dtRegistro: Date;
    dtAlteracao: Date;
    dsBicicleta: string;
    vlTotal: number;
    clienteFornecedor: ClienteFornecedor;
    itemList: Array<ItemOrcamento>;
}