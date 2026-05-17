export function formatarDataHora(dataHora: string): string {
    const data = new Date(dataHora);

    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
    }).format(data);

    const horaFormatada = new Intl.DateTimeFormat("pt-BR", {
        timeStyle: "short",
    }).format(data);

    return `${dataFormatada} - ${horaFormatada}`;
}

export function formatarMoeda(valor: number | string): string {
    const valorNumerico = Number(String(valor).replace(",", "."));

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valorNumerico);
}

export function formatarPercentual(valor: number | string): string {
    const valorNumerico = Number(String(valor).replace(",", "."));

    return `${valorNumerico.toLocaleString("pt-BR", {
        maximumFractionDigits: 2,
    })}%`;
}