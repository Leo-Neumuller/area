import DashboardButton__SvelteComponent_ from "./+DashboardButton.svelte";

export interface ChildProps {
    label: string;
    onClick: () => void;
    svgSelected: any;
}

export default DashboardButton__SvelteComponent_;

export const prerender = true;