import Button from './+button.svelte';

export interface ChildProps {
    className?: string;
    onClick?: () => void;
}
export default Button;

export const prerender = true;