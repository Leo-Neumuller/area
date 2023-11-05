import { render, screen } from '@testing-library/svelte';
import Home from '../src/routes/+page.svelte';

test("expect Home to render", () => {
    const a = render(Home);
    expect(a).not.toBeNull();
})


test("expect the button register to be in the page and working", () => {
    render(Home);
    const registerButton = screen.getByTestId("register");
    expect(registerButton).not.toBeNull();
})

test("expect the button login to be in the page and working", () => {
    render(Home);
    const loginButton = screen.getByTestId("login");
    expect(loginButton).not.toBeNull();
})

test("expect Gmail to be in scroller", () => {
    render(Home);
    const Gmail = screen.queryAllByText("Gmail");
    expect(Gmail).not.toBeNull();
})

test("expect Google Calendar to be in scroller", () => {
    render(Home);
    const googleCalendar = screen.queryAllByText("Google Calendar");
    expect(googleCalendar).not.toBeNull();
})

test("expect Down Detector to be in scroller", () => {
    render(Home);
    const downDetector = screen.queryAllByText("Down Detector");
    expect(downDetector).not.toBeNull();
})

test("expect Weather to be in scroller", () => {
    render(Home);
    const weather = screen.queryAllByText("Weather");
    expect(weather).not.toBeNull();
})