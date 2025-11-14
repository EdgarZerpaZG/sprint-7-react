import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../components/form/registerForm";
import { supabase } from '../lib/supabaseClient';
import { BrowserRouter } from "react-router-dom";

vi.mock("../lib/supabaseClient", () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      or: vi.fn().mockResolvedValue({ data: [], error: null }),
      insert: vi.fn().mockResolvedValue({ data: {}, error: null }),
    })),
  },
}));

// ⬇️ MOCK DE useNavigate (evita error del Router)
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("RegisterForm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should register a user successfully", async () => {
    (supabase.auth.signUp as any).mockResolvedValueOnce({
      data: { user: { id: "123", email: "test@example.com" } },
      error: null,
    });

    render(
      <BrowserRouter>
        <RegisterForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "Luke" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: "123456" } });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/Account created successfully/i)
      ).toBeInTheDocument()
    );
  });
});