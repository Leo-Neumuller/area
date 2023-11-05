import AppPres__SvelteComponent_ from "./+AppPres.svelte";

export interface ChildProps {
    title: string;
    text: string;
    image: string;
    hideButton?: boolean;
    buttonText?: string;
    onCLick?: () => void;
}

export default AppPres__SvelteComponent_;

export const prerender = true;