import Hamburger__SvelteComponent_ from "./+Hamburger.svelte";

export interface ChildProps {
    className: string;
    color: string;
}
export default Hamburger__SvelteComponent_;

export const prerender = true;