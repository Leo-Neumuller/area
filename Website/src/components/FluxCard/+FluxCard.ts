import type Flux from "../SVGs/+Flux.svelte";
import FluxCard__SvelteComponent_ from "./+FluxCard.svelte";

export interface FluxCardProps {
    flux: {
        id: number;
        name: string;
        description: string;
        active: boolean;
    };
}

export default FluxCard__SvelteComponent_;
