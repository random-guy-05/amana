import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(window.HTMLElement.prototype, "scrollTo", {
  writable: true,
  value: () => undefined,
});

describe("App", () => {
  it("renders all major sections", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /arnav mana/i, level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /signals of rigor/i, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /research casebook/i, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /leadership with outcomes/i, level: 2 }),
    ).toBeInTheDocument();
  });

  it("copies email and shows a toast", async () => {
    const user = userEvent.setup();
    const clipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };

    Object.defineProperty(navigator, "clipboard", {
      value: clipboard,
      configurable: true,
    });

    render(<App />);
    await user.click(screen.getByRole("button", { name: /copy email/i }));

    expect(clipboard.writeText).toHaveBeenCalledWith("arnavmana.me@gmail.com");
    expect(screen.getByText(/email copied/i)).toBeInTheDocument();
  });

  it("renders hero summary copy", () => {
    render(<App />);

    expect(
      screen.getByText(
        /i work at the intersection of computational biology, translational cardiology, and clinical ai/i,
      ),
    ).toBeInTheDocument();
  });

  it("shows selected project details in the casebook showcase", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(
      screen.getByText(
        /can lactate serve as an earlier and more interpretable warning signal for shock progression/i,
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("tab", { name: /latent shock topologies with gatv2/i }),
    );

    expect(
      screen.getByText(
        /can graph attention models surface earlier latent shock structure than conventional staging/i,
      ),
    ).toBeInTheDocument();
  });
});
