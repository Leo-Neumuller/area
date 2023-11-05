import FluxRow__SvelteComponent_ from "./+FluxRow.svelte";

export interface FluxCardProps {
    description: string;
    active: boolean;
    index: number;
    id: number;
    logo: {action: string, reaction: string};
}

export default FluxRow__SvelteComponent_;
