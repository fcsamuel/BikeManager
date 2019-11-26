import { OrdemServico } from "./ordemServico";
import { Pagamento } from "./pagamento";
import { NotaEntrada } from "./notaEntrada";

export class Conta {
    cdConta: number;
    dsTipo: string;
    vlTotal: number;
    qtParcelas: number;
    dtVencimento: Date;
    //dtPagamento: Date;
    fgPago: boolean;
    vlPago: number;
    pagamentoList: Array<Pagamento>;
    ordemServico: OrdemServico;
    notaEntrada: NotaEntrada;
}