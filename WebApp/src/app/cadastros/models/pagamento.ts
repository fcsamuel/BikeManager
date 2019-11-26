import { FormaPagamento } from "./formaPagamento";
import { Conta } from "./conta";

export class Pagamento {
    cdPagamento: number;
    cdFormaPagamento: number;
    formaPagamento: FormaPagamento;
    cdConta: number;
    conta: Conta;
    vlPago: number;
    fgPago: boolean;
    dtPagamento: Date;
    dtRegistro: Date;
    dtAlteracao: Date;
}