<script lang="ts">
    import PlusSigne from "../../SVGs/+PlusSigne.svelte";
    import TextInput from "../../TextInput/+TextInput.svelte";
    import Close from "../../SVGs/+Close.svelte";

    export let showDelete: boolean;
    export let onCLickAdd: (numberInputs: number, numberOutputs: number, type: string) => void;
    export let onClickDelete: () => void;
    export let open: boolean;
    
    let numberOfInput: number = 1;
    let numberOfOutput: number = 1;
    let type: string = "";
    let deactivated: boolean = false;

    function handleChangeNumberOfInput(e: any) {
        if (e.target.value > 4 || e.target.value < 0) return;
        numberOfInput = e.target.value;
    }

    function handleChangeNumberOfOutput(e: any) {
        if (e.target.value > 4 || e.target.value < 0 ) return;
        numberOfOutput = e.target.value;
    }

    function handleChangeType(e: any) {
        type = e.target.value;
        if (type === "Action") {
            numberOfInput = 0;
            deactivated = true;
        } else {
            deactivated = false;
        }
    }

    function handleAddNode(e: any) {
        e.stopPropagation();
        if (numberOfInput > 4 || numberOfInput < 0 || numberOfOutput > 4 || numberOfOutput < 0 || type === "") return;

        open = false;
        onCLickAdd(numberOfInput, numberOfOutput, type);
        numberOfInput = 0;
        numberOfOutput = 0;
        const selectElement = document.getElementById("lang") as HTMLSelectElement;
        selectElement.selectedIndex = 0;
        type = "";
        deactivated = false;
    }
</script>

<div>

    <button class="cursor-pointer flex justify-center items-center absolute top-6 right-6 z-[30]" 
        on:click={() => {
            open = true;
        }}>
        <PlusSigne className="w-14 h-14" color="white"/>
    </button>
    <div class={`${open ? "flex" : "hidden"} gap-3 rounded-xl flex-col absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[30] bg-gray border border-black p-6`}>
        <div class="flex justify-between items-center align-middle pb-4">
            <h1 class="text-customWhite font-SpaceGrotesk uppercase">Nouveau node</h1>
            <button on:click={() => {
                open = false;
            }}>
                <Close className="w-4 h-4" color="#F3F3F3"/>
            </button>
        </div>
        <TextInput label="Number of input" type="number" placeholder="Nombre d'entrées" value={numberOfInput}
            onInput={handleChangeNumberOfInput} deactivated={deactivated}/>
        <TextInput label="Number of output" type="number" placeholder="Nombre de sorties" value={numberOfOutput}
            onInput={handleChangeNumberOfOutput} deactivated={false}/>
    
        <div class="w-full flex flex-col gap-2">
            <h1 class="text-customWhite font-SpaceGrotesk">Type</h1>
            <select name="types" id="lang" on:input={handleChangeType} class="w-full rounded-xl px-4 py-2 bg-customWhite/[10%] outline-none text-customWhite">
                <option class="bg-gray" disabled selected value> -- Choissisez un type --</option>
                <option class="bg-gray" value="Action">Action</option>
                <option class="bg-gray" value="Reaction">Reaction</option>
            </select>
        </div>
    
        <button class="text-customWhite rounded border border-customWhite mt-2" on:click={handleAddNode}>
            Ajouter un node
        </button>
    </div>
</div>