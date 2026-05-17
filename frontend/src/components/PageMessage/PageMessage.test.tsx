import { render, screen } from "@testing-library/react";

import { PageMessage } from "./PageMessage";

describe("PageMessage", () => {
    it("deve renderizar mensagem de texto", () => {
        render(
            <PageMessage
                message="Para visualizar o relatório, selecione um período."
                variant="text"
                centerVertical
            />,
        );

        expect(
            screen.getByText("Para visualizar o relatório, selecione um período."),
        ).toBeInTheDocument();
    });

    it("deve renderizar mensagem de alerta", () => {
        render(
            <PageMessage
                message="Nenhuma comissão encontrada."
                severity="info"
            />,
        );

        expect(
            screen.getByText("Nenhuma comissão encontrada."),
        ).toBeInTheDocument();

        expect(screen.getByRole("alert")).toBeInTheDocument();
    });
});