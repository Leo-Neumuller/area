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
    }

    const changeInput = {
        "text": (e: any) => inputD.value = e.target.value,
        "number": (e: any) => inputD.value = e.target.value,
        "textMultiline": (e: any) => inputD.value = e.target.value,
        "select": (e: any) => inputD.value = e.target.value,
        "checkbox": (e: any) => inputD.value = e.target.checked,
    }

    const classInput = {
      //Basic css créé par github copilot pour montrée le fonctionement
      "text": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        "number": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        "textMultiline": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full resize-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200",
        "select": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        "checkbox": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
    }

</script>

<div>
  <h1 class="text-customWhite text-[1.2vw]">{inputD.name}</h1>
  {#if inputD.inputType === "textMultiline"}
    <textarea class={classInput[inputD.inputType]} on:change={changeInput[inputD.inputType]} rows="5"/>
  {:else if inputD.inputType === "select"}
    <Select on:change={changeInput[inputD.inputType]} options={inputD.data}/>
  {:else}
    <input class={classInput[inputD.inputType]} type={typeInput[inputD.inputType]} on:change={changeInput[inputD.inputType]}/>
  {/if}
  <!-- TODO add a bottom bar like search bar to make like zappier-->
</div>