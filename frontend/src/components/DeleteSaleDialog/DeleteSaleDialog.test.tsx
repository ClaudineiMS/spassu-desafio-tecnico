import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { DeleteSaleDialog } from "./DeleteSaleDialog";

describe("DeleteSaleDialog", () => {
    it("deve exibir a caixa de diálogo para excluir a venda", () => {
        render(
            <DeleteSaleDialog
                open
                isDeleting={false}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
            />,
        );

        expect(screen.getByText("Remover Venda")).toBeInTheDocument();
        expect(screen.getByText("Deseja remover esta venda?")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Não" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Sim" })).toBeInTheDocument();
    });

    it("deve chamar o método onConfirm quando o botão de confirmação for clicado.", async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();

        render(
            <DeleteSaleDialog
                open
                isDeleting={false}
                onClose={vi.fn()}
                onConfirm={onConfirm}
            />,
        );

        await user.click(screen.getByRole("button", { name: "Sim" }));

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it("deve chamar o método onClose quando o botão Cancelar for clicado.", async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        render(
            <DeleteSaleDialog
                open
                isDeleting={false}
                onClose={onClose}
                onConfirm={vi.fn()}
            />,
        );

        await user.click(screen.getByRole("button", { name: "Não" }));

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});