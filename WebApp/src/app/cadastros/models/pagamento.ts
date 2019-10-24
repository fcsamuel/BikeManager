import { FormaPagamento } from "./formaPagamento";
import { Conta } from "./conta";

export class Pagamento {
    cdPagamento: number;
    dsPagamento: string;
    formaPagamento: FormaPagamento;
    conta: Conta;
    dtRegistro: Date;
    dtAlteracao: Date;
}