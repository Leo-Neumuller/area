<script lang="ts">
    import './style.css'
    import Modify from "../../SVGs/+Modify.svelte";

    export let id: string;
    export let type: string;
    export let pos: { x: number, y: number };
    export let numberOfInputs: number;
    export let numberOfOutputs: number;
    export let selected: boolean;
    export let onMouseDownNode: (id: string, e: MouseEvent) => void;
    export let onMouseDownOutput: (outputPositionX: number, outputPositionY: number, nodeId: string,  outputIndex: number) => void;
    export let onMouseEnterInput: (inputPositionX: number, inputPositionY: number, nodeId: string, inputIndex: number) => void;
    export let onMouseLeaveInput: (nodeId: string, inputIndex: Number) => void;
    export let modify: boolean;
    export let title: string;
    export let img: string;
    
    let refBinder: any = [];
    let refBinderOutput: any = [];

    function handleMouseEnterInput(inputIndex: number) {
        const centerX: number =
            refBinder[inputIndex].getBoundingClientRect().left + Math.abs(refBinder[inputIndex].getBoundingClientRect().right - refBinder[inputIndex].getBoundingClientRect().left) / 2;
        const centerY: number = 
            refBinder[inputIndex].getBoundingClientRect().top + Math.abs(refBinder[inputIndex].getBoundingClientRect().bottom - refBinder[inputIndex].getBoundingClientRect().top) / 2;
        onMouseEnterInput(centerX, centerY, id, inputIndex)
    }

    function handleMouseDownOutput(e: Event, outputIndex: number) {
        e.stopPropagation()
        const centerX: number =
            refBinderOutput[outputIndex].getBoundingClientRect().left + Math.abs(refBinderOutput[outputIndex].getBoundingClientRect().right - refBinderOutput[outputIndex].getBoundingClientRect().left) / 2;
        const centerY: number =
            refBinderOutput[outputIndex].getBoundingClientRect().top + Math.abs(refBinderOutput[outputIndex].getBoundingClientRect().bottom - refBinderOutput[outputIndex].getBoundingClientRect().top) / 2;

        onMouseDownOutput(centerX, centerY, id, outputIndex);
    }

    function handleMouseLeaveInput(inputIndex: number) {
        onMouseLeaveInput(id, inputIndex);
    }


    for (let i = 0; i < numberOfInputs; i++) {
        refBinder.push(null);
    }
    for (let i = 0; i < numberOfOutputs; i++) {
        refBinderOutput.push(null);
    }
</script>

<div role="presentation" class={`${selected ? "nodeSelected" : "node"} ${type}`} style="transform: translate({pos.x}px, {pos.y}px)" on:mousedown={(e) => {
        e.stopPropagation();
        onMouseDownNode(id, e);
    }}>
    <div class="flex h-full align-middle justify-between items-center px-6">
        <div>
            <h1 class={`text-[2.1rem] font-SpaceGrotesk ${type === "Action" ? "text-customWhite" : "text-gray"} text-customWhite font-semibold`}>{title}</h1>
        </div>
        <button on:click={() => {
            modify = !modify;
        }}>
            <Modify className="w-10 h-10" color={type === "Action" ? "white" : "#373637"} />
        </button>
    </div>
    <div class="inputsWrapper">
        {#each {length: Number(numberOfInputs)} as _, index}
            <div role="presentation" class="input" bind:this={refBinder[index]}
                on:mouseenter={() => {handleMouseEnterInput(index)}} 
                on:mouseleave={() => {handleMouseLeaveInput(index)}}>
            </div>
        {/each}
    </div>
    <div class="outputsWrapper">
        {#each {length: Number(numberOfOutputs)} as _, index}
            <div role="presentation" class="output" bind:this={refBinderOutput[index]}
                on:mousedown={(e) => {handleMouseDownOutput(e, index)}}>
            </div>
        {/each}
    </div>  
</div>