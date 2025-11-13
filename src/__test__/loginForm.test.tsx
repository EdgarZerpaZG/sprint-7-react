import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "../context/AuthContext";
import LoginForm from "../components/form/loginForm";
import { supabase } from "../lib/supabaseClient";

describe("Form validation", () => {
  it("shows errors for invalid data", async () => {
    render(
        <AuthProvider>
            <LoginForm />
        </AuthProvider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(passwordInput, "invalid-password");
    await userEvent.click(button);

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
    expect(await screen.findByText(/invalid password/i)).toBeInTheDocument();
  });

  it("submits correctly with valid data", async () => {
    render(
        <AuthProvider>
            <LoginForm />
        </AuthProvider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "usuario@dominio.com");
    await userEvent.type(passwordInput, "123456789");
    await userEvent.click(button);

    expect(await screen.findByText(/invalid email/i)).not.toBeInTheDocument();
    expect(await screen.findByText(/invalid password/i)).not.toBeInTheDocument();
  });
});