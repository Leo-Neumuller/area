import Weather__SvelteComponent_ from "./+Weather.svelte";

export interface ChildProps {
    className: string;
    color: string;
}
export default Weather__SvelteComponent_;

export const prerender = true;