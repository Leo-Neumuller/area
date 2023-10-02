<script lang="ts">
    export let showDelete: boolean;
    export let onCLickAdd: (numberInputs: number, numberOutputs: number, type: string) => void;
    export let onClickDelete: () => void;

    let open: boolean = false;
    let numberOfInput = 0;
    let numberOfOutput = 0;
    let type: string = "";

    function handleChangeNumberOfInput(e: any) {
        numberOfInput = e.target.value;
    }

    function handleChangeNumberOfOutput(e: any) {
        numberOfOutput = e.target.value;
    }

    function handleChangeType(e: any) {
        type = e.target.value;
    }

    function handleAddNode(e: any) {
        e.stopPropagation();
        if (numberOfInput > 4 || numberOfInput < 0 || numberOfOutput > 4 || numberOfOutput < 0) return;

        open = false;
        onCLickAdd(numberOfInput, numberOfOutput, type);
        numberOfInput = 0;
        numberOfOutput = 0;
        type = "";
    }
</script>

<div>
    <button
        class={`${showDelete ? "hidden" : "flex"} cursor-pointer flex bg-primary box-border items-center justify-end fixed top-[400px] left-0 z-[100]`}
        on:click={onClickDelete}>
        Delete
    </button>
    <button class="cursor-pointer bg-primary flex justify-center items-center fixed top-[300px] left-10 z-10" 
        on:click={() => {
            open = true;
        }}>
        +
    </button>
    <div class={`${open ? "flex" : "hidden"} flex-col top-[350px] fixed left-10 z-10 bg-white border border-black p-6`}>
        <input type="number" placeholder="number of input" class="border border-black" value={numberOfInput} 
            on:input={handleChangeNumberOfInput}/>
        <input type="number" placeholder="number of output" class="border border-black" value={numberOfOutput}
            on:input={handleChangeNumberOfOutput}/>
        <select name="types" id="lang" on:input={handleChangeType} class="border border-black">
            <option disabled selected value> -- select an option -- </option>
            <option value="Action">Action</option>
            <option value="Reaction">Reaction</option>
        </select>
        <button class="border border-black" on:click={handleAddNode}>
            Add node
        </button>
    </div>
</div>