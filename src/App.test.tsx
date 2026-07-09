import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("renders the portfolio's primary sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /arnav mana/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /focused questions/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /rigorous from question/i, level: 2 })).toBeInTheDocument();
  });

  it("copies the contact address", async () => {
    const user = userEvent.setup();
    const clipboard = { writeText: vi.fn().mockResolvedValue(undefined) };
    Object.defineProperty(navigator, "clipboard", { value: clipboard, configurable: true });

    render(<App />);
    await user.click(screen.getByRole("button", { name: /copy email/i }));

    expect(clipboard.writeText).toHaveBeenCalledWith("arnavmana.me@gmail.com");
    expect(screen.getByText(/email copied/i)).toBeInTheDocument();
  });

  it("opens the mobile navigation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /toggle navigation/i }));
    expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeInTheDocument();
  });
});
