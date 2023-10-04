import Input from "./+input.svelte";

export interface ChildProps {
    className?: string;
    placeholder?: string | null | undefined;
    name?: string | null | undefined;
    type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "datetime-local" | "month" | "week" | "time" | "color" | null | undefined;
}
export default Input;