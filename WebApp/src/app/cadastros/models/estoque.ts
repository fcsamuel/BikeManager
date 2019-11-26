import { NotaEntrada } from "./notaEntrada";
import { OrdemServico } from "./ordemServico";

export class Estoque {
    cdEstoque: number;
    cdProduto: number;
    cdOrdemServico: number;
    cdNotaEntrada: number;
    qtProduto: number;
    tpLancamento: string;
    vlCusto: number;
    qtAtual: number;
    vlCustoMedio: number;
    dtRegistro: Date;
    dtAlteracao: Date;
    notaEntrada: NotaEntrada;
    ordemServico: OrdemServico;
}