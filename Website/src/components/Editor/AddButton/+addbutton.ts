import Addbutton__SvelteComponent_ from "./+addbutton.svelte";

export interface ChildProps {
    showDelete: boolean;
    onCLickAdd: (numberInputs: number, numberOutputs: number, type: string) => void;
    onClickDelete: () => void;
    open: boolean;
}

export default Addbutton__SvelteComponent_;

export const prerender = true;