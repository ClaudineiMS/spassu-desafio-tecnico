import { render, screen } from "@testing-library/react";

import { FeedbackToast } from "./FeedbackToast";

describe("FeedbackToast", () => {
    it("deve renderizar mensagem de feedback", () => {
        render(
            <FeedbackToast
                open
                message="Venda cadastrada com sucesso!"
                onClose={() => {}}
            />,
        );

        expect(
            screen.getByText("Venda cadastrada com sucesso!"),
        ).toBeInTheDocument();
    });
});