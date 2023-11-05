import Icon__SvelteComponent_ from "../src/components/Icon/+Icon.svelte";
import { render, screen } from "@testing-library/svelte";

test("expect Icon component to render", () => {
    const a = render(Icon__SvelteComponent_, { 
                    props: {className: "w-6 h-6",
                            name: "Gmail"}});

    expect(a).not.toBeNull();
})

test("expect Gmail to be the SVG", () => {
    render(Icon__SvelteComponent_, { 
                    props: {className: "w-6 h-6",
                            name: "Gmail"}});
    const registerButton = screen.getByTestId("Gmail");

    expect(registerButton).not.toBeNull();
})

test("expect Google Calendar to be the SVG", () => {
    render(Icon__SvelteComponent_, { 
                    props: {className: "w-6 h-6",
                            name: "Google Calendar"}});
    const registerButton = screen.getByTestId("Google Calendar");

    expect(registerButton).not.toBeNull();
})

test("expect Down Detector to be the SVG", () => {
    render(Icon__SvelteComponent_, { 
                    props: {className: "w-6 h-6",
                            name: "Down Detector"}});
    const registerButton = screen.getByTestId("Down Detector");

    expect(registerButton).not.toBeNull();
})

test("expect Weather to be the SVG", () => {
    render(Icon__SvelteComponent_, { 
                    props: {className: "w-6 h-6",
                            name: "Weather"}});
    const registerButton = screen.getByTestId("Weather");

    expect(registerButton).not.toBeNull();
})

test("expect Spotify to be the SVG", () => {
    render(Icon__SvelteComponent_, { 
                    props: {className: "w-6 h-6",
                            name: "Spotify"}});
    const registerButton = screen.getByTestId("Spotify");

    expect(registerButton).not.toBeNull();
})
