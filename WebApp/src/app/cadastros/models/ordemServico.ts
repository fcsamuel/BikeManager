import { Conta } from "./conta";
import { ClienteFornecedor } from "./clienteFornecedor";

export class OrdemServico {
    cdOrdemServico: number;
    dsOrdemServico: string;
    conta: Conta;
    clienteFornecedor: ClienteFornecedor; 
    dsBicicleta: string;
    vlTotal: number;
    dtAbertura: Date;
    dtPrevConclusao: Date;
    dtConclusao: Date;
    dsObservacao: Date;
    dtRegistro: Date;
    dtAlteracao: Date;
    //itensList: Array<ItemOrdemServico>;
}