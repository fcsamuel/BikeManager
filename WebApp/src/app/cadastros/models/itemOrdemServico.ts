import { Produto } from "./produto";
import { OrdemServico } from "./ordemServico";
import { TabelaPreco } from "./tabelaPreco";

export class ItemOrdemServico {
    cdProduto: number;
    cdOrdemServico: number;
    cdTabelaPreco: number;
    vlUnitario: number;
    vlTotal: number;
    qtProduto: number;
    vlCusto: number;
    vlCustoMedio: number;
    dsObservacao: string;
    dtRegistro: Date;
    dtAlteracao: Date;
    ordemServico: OrdemServico;
    produto: Produto;
    tabelaPreco: TabelaPreco;
    countItem: number;
    tpItem: string;
}