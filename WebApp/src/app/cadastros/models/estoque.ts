import { NotaEntrada } from "./notaEntrada";
import { OrdemServico } from "./ordemServico";

export class Estoque {
    cdEstoque: number;
    cdProduto: number;
    cdOrdemServico: number;
    cdNotaEntrada: number;
    qtProduto: number;
    tpLancamento: string;
    vlCustoMedio: number;
    vlCusto: number;
    dtRegistro: Date;
    dtAlteracao: Date;
    notaEntrada: NotaEntrada;
    ordemServico: OrdemServico;
}