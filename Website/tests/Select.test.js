import Select from "../src/components/Select/+select.svelte";
import { render, screen } from "@testing-library/svelte";

test("expect Select component to be render", () => {
    render(Select, { props: {options: ["test1", "test2", "test3"],
                     value: undefined,
                     placeholder: "test",
                     onChange: () => {}}});
    const registerButton = screen.getByTestId("select");

    expect(registerButton).not.toBeNull();
})

test("expect placeholder in page", () => {
    render(Select, { props: {options: ["test1", "test2", "test3"],
                     value: undefined,
                     placeholder: "placeholder",
                     onChange: () => {}}});
    const registerButton = screen.getByText("placeholder");

    expect(registerButton).not.toBeNull();
})

test("expect a selected option", () => {
    render(Select, { props: {options: ["test1", "test2", "test3"],
                     value: "test1",
                     placeholder: "placeholder",
                     onChange: () => {}}});
    const registerButton = screen.getByTestId("selected");

    expect(registerButton).not.toBeNull();
})