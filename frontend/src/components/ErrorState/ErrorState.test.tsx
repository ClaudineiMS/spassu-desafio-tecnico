import { render, screen } from "@testing-library/react";

import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
    it("deve renderizar mensagem de erro", () => {
        render(<ErrorState message="Erro ao carregar dados." />);

        expect(screen.getByText("Erro ao carregar dados.")).toBeInTheDocument();
    });
});