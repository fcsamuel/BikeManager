import { Marca } from "./marca";
import { Categoria } from "./categoria";

export class Produto {
    cdProduto: number;
    dsProduto: string;
    dsModelo: string;
    dsInfAdicionais: string;
    fgAtivo: boolean;
    fgBicicleta: boolean;
    marca: Marca;
    categoria: Categoria;
    dtRegistro: Date;
    dtAlteracao: Date;
}