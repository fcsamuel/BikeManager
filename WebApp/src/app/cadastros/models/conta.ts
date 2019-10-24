import { OrdemServico } from "./ordemServico";
import { Pagamento } from "./pagamento";

export class Conta {
    cdConta: number;
    dsTipo: string;
    vlTotal: number;
    qtParcelas: number;
    dtVencimento: Date;
    dtPagamento: Date;
    fgPago: boolean;
    pagamentoList: Array<Pagamento>;
    ordemServico: OrdemServico;
    //notaEntrada: NotaEntrada;
}