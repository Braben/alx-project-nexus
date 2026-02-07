import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

jest.mock("next/router", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/supabase/superbase-client", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signInWithOAuth: jest.fn(),
    },
  },
}));

describe("LoginForm", () => {
  it("shows validation errors when fields are empty", async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole("button", { name: /sign in/i });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(/enter a valid email/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 6 characters/i),
    ).toBeInTheDocument();
  });
});
