import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast } from "./ToastProvider";

function TestHarness() {
  const { showToast } = useToast();
  return (
    <button type="button" onClick={() => showToast("Hello", "success")}>
      Trigger
    </button>
  );
}

describe("ToastProvider", () => {
  it("renders a toast when triggered", async () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: /trigger/i }));
    expect(await screen.findByText("Hello")).toBeInTheDocument();
  });
});
