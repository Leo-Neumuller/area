import AppSpotlight__SvelteComponent_ from "./+AppSpotlight.svelte";

export interface ChildProps {
    name: string;
    image: string;
}

export default AppSpotlight__SvelteComponent_;

export const prerender = true;