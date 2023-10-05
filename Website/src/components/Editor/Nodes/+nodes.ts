import Nodes__SvelteComponent_ from "./+nodes.svelte";

export interface ChildProps {
    id: string;
    type: string;
    pos: { x: number, y: number };
    numberOfInputs: number;
    numberOfOutputs: number;
    selected: boolean;
    onMouseDownNode: (id: string, e: MouseEvent) => void;
    onMouseDownOutput: (outputPositionX: number, outputPositionY: number, nodeId: string,  outputIndex: number) => void;
    onMouseEnterInput: (inputPositionX: number, inputPositionY: number, nodeId: string, inputIndex: number) => void;
    onMouseLeaveInput: (nodeId: string, inputIndex: Number) => void;

    modify: boolean;
    title: string;
    img: string;
}

export default Nodes__SvelteComponent_;

export const prerender = true;