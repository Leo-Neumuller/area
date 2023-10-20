<script lang="ts">
    import type {inputData} from "../Board/NodeInterface";
    import Select from "../../Select/+select.svelte";

    export let inputD: inputData;

    const typeInput = {
        "text": "text",
        "number": "number",
        "textMultiline": "text",
        "select": "select",
        "checkbox": "checkbox",
        "date" : "datetime-local"
    }

    const changeInput = {
        "text": (e: any) => inputD.value = e.target.value,
        "number": (e: any) => inputD.value = e.target.value,
        "textMultiline": (e: any) => inputD.value = e.target.value,
        "select": (e: any) => inputD.value = e.target.value,
        "checkbox": (e: any) => inputD.value = e.target.checked,
        "date": (e: any) => inputD.value = new Date(e.target.value).toString()
    }

    const classInput = {
        //Basic css créé par github copilot pour montrée le fonctionement
        "text": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        "number": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        "textMultiline": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full resize-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200",
        "select": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        "checkbox": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        "date": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
    }

    const type = {type: typeInput[inputD.inputType]}

</script>

<div>
  <h1 class="text-customWhite text-[1.2vw]">{inputD.name}</h1>
  {#if inputD.inputType === "textMultiline"}
    <textarea class={classInput[inputD.inputType]} on:change={changeInput[inputD.inputType]} rows="5" bind:value={inputD.value} />
  {:else if inputD.inputType === "select"}
    <Select on:change={changeInput[inputD.inputType]} options={inputD.data} bind:value={inputD.value} />
  {:else}
    <!-- {...type} is hack to bypass error from svelte
        because type can't be dynamic with a bind:value
    -->
    <input class={classInput[inputD.inputType]} {...type} on:change={changeInput[inputD.inputType]} bind:value={inputD.value} />
  {/if}
  <!-- TODO add a bottom bar like search bar to make like zappier-->
</div>