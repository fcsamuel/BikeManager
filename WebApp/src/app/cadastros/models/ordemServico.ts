import { Conta } from "./conta";
import { ClienteFornecedor } from "./clienteFornecedor";
import { ItemOrdemServico } from "./itemOrdemServico";

export class OrdemServico {
    cdOrdemServico: number;
    dsOrdemServico: string;
    cdConta: number;
    conta: Conta;
    cdClienteFornecedor: number;
    clienteFornecedor: ClienteFornecedor; 
    dsBicicleta: string;
    vlTotal: number;
    vlPendente: number;
    dtAbertura: Date;
    dtPrevConclusao: Date;
    dtConclusao: Date;
    dsObservacao: Date;
    dtRegistro: Date;
    dtAlteracao: Date;
    itemList: Array<ItemOrdemServico>;
}