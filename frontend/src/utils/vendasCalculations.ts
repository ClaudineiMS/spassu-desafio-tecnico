import type { Venda } from "../types/sales";

type ItemVenda = Venda["itens"][number];

export function calcularComissaoItem(item: ItemVenda): number {
    return Number(item.valor_comissao);
}

export function calcularQuantidadeTotal(venda: Venda): number {
    return venda.itens.reduce(
        (total, item) => total + item.quantidade,
        0,
    );
}

export function calcularTotalComissao(venda: Venda): number {
    return venda.itens.reduce(
        (total, item) => total + calcularComissaoItem(item),
        0,
    );
}

export function obterDescricaoProduto(item: ItemVenda): string {
    return `${item.produto} - ${item.produto_descricao}`;
}