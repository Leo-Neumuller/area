<script lang="ts">
    import './style.css'

    export let id: string;
    export let pos: { x: number, y: number };
    export let numberOfInputs: number;
    export let numberOfOutputs: number;
    export let selected: boolean;
    export let onMouseDownNode: (id: string, e: MouseEvent) => void;
    export let onMouseDownOutput: (outputPositionX: number, outputPositionY: number, nodeId: string,  outputIndex: number) => void;
    export let onMouseEnterInput: (inputPositionX: number, inputPositionY: number, nodeId: string, inputIndex: number) => void;
    export let onMouseLeaveInput: (nodeId: string, inputIndex: Number) => void;

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

<div role="presentation" class={selected ? "nodeSelected" : "node"} style="transform: translate({pos.x}px, {pos.y}px)" on:mousedown={(e) => {
        e.stopPropagation();
        onMouseDownNode(id, e);
    }}>
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