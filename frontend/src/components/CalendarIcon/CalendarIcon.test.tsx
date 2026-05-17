import { render, screen } from "@testing-library/react";

import { CalendarIcon } from "./CalendarIcon";

describe("CalendarIcon", () => {
    it("deve renderizar a imagem do ícone do calendário", () => {
        render(<CalendarIcon />);

        expect(screen.getByAltText("Abrir calendário")).toBeInTheDocument();
    });
});