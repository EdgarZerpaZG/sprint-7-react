import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../components/form/loginForm";
import { supabase } from "../lib/supabaseClient";
import { MemoryRouter } from "react-router-dom";

vi.mock("../lib/supabaseClient", () => {
  return {
    supabase: {
      auth: {
        signInWithPassword: vi.fn(),
      },
    },
  };
});

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should log in a user successfully", async () => {
    (supabase.auth.signInWithPassword as any).mockResolvedValueOnce({
      data: { user: { email: "test@example.com" } },
      error: null,
    });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "123456" } });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });
});