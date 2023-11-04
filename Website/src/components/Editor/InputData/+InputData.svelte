<script lang="ts">
    import type {inputData} from "../Board/NodeInterface";
    import Select from "../../Select/+select.svelte";
  import { getSubServiceMetadata } from "../../../api/api";
  import { getCookie } from "../../../api/helpers";

    export let inputD: inputData;
    export let nodeType: {[key: string]: any} | undefined;
    export let service: string | undefined;

    let metadata: [] = [];

    const typeInput = {
        "text": "text",
        "number": "number",
        "textMultiline": "text",
        "select": "select",
        "checkbox": "checkbox",
        "date" : "datetime-local"
    }

    const changeInput = {
        "text": (e: any) => inputD.value["value"] = e.target.value,
        "number": (e: any) => inputD.value["value"] = e.target.value,
        "textMultiline": (e: any) => inputD.value["value"] = e.target.value,
        "select": (e: any) => inputD.value["value"] = e.target.value,
        "checkbox": (e: any) => inputD.value["value"] = e.target.checked,
        "date": (e: any) => inputD.value["value"] = e.target.value,
    }

    const classInput = {
        //Basic css créé par github copilot pour montrée le fonctionement
        "text": `p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full`,
        "number": "p-2 border-2 border-gray-300 rounded-md focus:outline-none  focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        "textMultiline": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full resize-none scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200",
        "select": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        "checkbox": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full",
        "date": "p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
    }

    const type = {type: typeInput[inputD.inputType]}
    if (nodeType) {
      getSubServiceMetadata(getCookie("token"), nodeType["subService"]).then((res) => {
        metadata = res["outputsData"];
      })
    }
    if (typeof inputD.value === "string") {
      inputD.value = {
        "value": "",
      }
    }
</script>

<div class="pt-4">
	<h1 class="text-customWhite text-[1.2vw]">{inputD.name}</h1>
	{#if inputD.inputType === "textMultiline"}
    {#if inputD.value["id"] === "Rien"  || inputD.value["id"] === undefined}
		  <textarea class={classInput[inputD.inputType]} on:change={changeInput[inputD.inputType]} rows="5" bind:value={inputD.value["value"]} placeholder="Ecriver..."/>
      {:else}
      <textarea disabled class={classInput[inputD.inputType]} on:change={changeInput[inputD.inputType]} rows="5" value="" placeholder=""/>
    {/if}
    <div class="w-full">
      <select on:change={(e) => {
        if (e) {
          inputD.value = {
            "id": e?.target?.value,
            ...nodeType
          }
        }
      }} value="a" class="w-full bg-customWhite/[10%] rounded-lg p-4 font-SpaceGrotesk text-customWhite text-[1.25rem] font-normal">
        <option class="bg-gray text-center" value="Rien" selected>
          <h1>Rien</h1>
        </option>
        {#each metadata as data}
            {#if data["type"] === inputD.type}
              {#if data["id"] === inputD.value["id"]}
                <option class="bg-gray" value={data["id"]} selected>{data["id"]}</option>
              {:else}
                <option class="bg-gray" value={data["id"]}>{data["id"]}</option>
              {/if}
            {/if}
        {/each}
      </select>
    </div>
	{:else if inputD.inputType === "select"}
		<Select on:change={changeInput[inputD.inputType]} options={inputD.data} bind:value={inputD.value} />
	{:else}
		<!-- {...type} is hack to bypass error from svelte
				because type can't be dynamic with a bind:value
		-->
		<div class="flex gap-4">
      {#if inputD.value["id"] === "Rien" || inputD.value["id"] === undefined}
			  <input class={classInput[inputD.inputType]} {...type} on:change={changeInput[inputD.inputType]} bind:value={inputD.value["value"]} placeholder="Ecriver..." />
        {:else}
			  <input disabled class={classInput[inputD.inputType]} {...type} on:change={changeInput[inputD.inputType]} value="" placeholder="" />
      {/if}
            {#if service === "Reaction"}
            <h1 class="self-center text-white/20 font-SpaceGrotesk">ou</h1>
              <div class="w-full">
                <select on:change={(e) => {
                  if (e) {
                    inputD.value = {
                      "id": e?.target?.value,
                      ...nodeType
                    }
                  }
                }} value="a" class="w-full bg-customWhite/[10%] rounded-lg p-4 font-SpaceGrotesk text-customWhite text-[1.25rem] font-normal">
                  <option class="bg-gray text-center" value="Rien" selected>
                    <h1>Rien</h1>
                  </option>
                  {#each metadata as data}
                      {#if data["type"] === inputD.type}
                        {#if data["id"] === inputD.value["id"]}
                          <option class="bg-gray" value={data["id"]} selected>{data["id"]}</option>
                        {:else}
                          <option class="bg-gray" value={data["id"]}>{data["id"]}</option>
                        {/if}
                      {/if}
                  {/each}
                </select>
              </div>
            {/if}
		</div>
	{/if}
	<!-- TODO add a bottom bar like search bar to make like zappier-->
</div>