import { FormaPagamento } from "./formaPagamento";
import { Conta } from "./conta";

export class Pagamento {
    cdPagamento: number;
    dsPagamento: string;
    cdFormaPagamento: number;
    formaPagamento: FormaPagamento;
    cdConta: number;
    conta: Conta;
    vlPago: number;
    dtPagamento: Date;
    dtRegistro: Date;
    dtAlteracao: Date;
}