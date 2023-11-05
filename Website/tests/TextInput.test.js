import { render, screen } from "@testing-library/svelte";
import TextInput from "../src/components/TextInput/+TextInput.svelte";

test("expect placeholder in TextInput component", () => {
    render(TextInput, { 
                    props: {label: "label",
                            value: "a",
                            type: "text",
                            placeholder: "placeholder",
                            onInput: () => {},
                            deactivated: false}});

    const placeholder = screen.getByText("placeholder");

    expect(placeholder).not.toBeNull();
})

test("expect TextInput to render", () => {
    const a = render(TextInput, { 
                    props: {label: "label",
                            value: "a",
                            type: "text",
                            placeholder: "placeholder",
                            onInput: () => {},
                            deactivated: false}});

    expect(a).not.toBeNull();
})