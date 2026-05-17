import { render, screen } from "@testing-library/react";

import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
    it("deve renderizar a mensagem de carregamento", () => {
        render(<LoadingState message="Carregando vendas..." />);

        expect(screen.getByText("Carregando vendas...")).toBeInTheDocument();
    });
});