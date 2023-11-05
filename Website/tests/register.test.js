import { render, screen } from '@testing-library/svelte';
import Register from "../src/routes/register/+page.svelte"

test("expect Register to render", () => {
    const a = render(Register);
    expect(a).not.toBeNull();
})

test("expect the field Surname to be in the page", () => {
    render(Register);
    const registerButton = screen.getByTestId("surNameInput");
    expect(registerButton).not.toBeNull();
})

test("expect the field Surname to be in the page", () => {
    render(Register);
    const registerButton = screen.getByTestId("surNameInput");
    expect(registerButton).not.toBeNull();
})

test("expect the field Name to be in the page", () => {
    render(Register);
    const registerButton = screen.getByTestId("nameInput");
    expect(registerButton).not.toBeNull();
})

test("expect the field Email to be in the page", () => {
    render(Register);
    const registerButton = screen.getByTestId("emailInput");
    expect(registerButton).not.toBeNull();
})

test("expect the field Password to be in the page", () => {
    render(Register);
    const registerButton = screen.getByTestId("PasswordInput");
    expect(registerButton).not.toBeNull();
})

test("expect the google Provider working", () => {
    render(Register);
    const registerButton = screen.getByTestId("googleButton");
    expect(registerButton).not.toBeNull();
})
