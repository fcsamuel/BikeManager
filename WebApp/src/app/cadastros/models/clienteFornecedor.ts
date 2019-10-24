import { Endereco } from "./endereco";
import { Contato } from "./contato";

export class ClienteFornecedor {
    cdClienteFornecedor: number;
    dsNomeRazao: string;
    dsFantasia: string;
    nrCpfCnpj: string;
    fgAtivo: boolean;
    dtNascimento: Date;
    enderecoList: Array<Endereco>;
    contatoList: Array<Contato>;
    dtRegistro: Date;
    dtAlteracao: Date;
}