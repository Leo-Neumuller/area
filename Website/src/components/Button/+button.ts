import Button from './+button.svelte';

export interface ChildProps {
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | null | undefined;
}
export default Button;

export const prerender = true;