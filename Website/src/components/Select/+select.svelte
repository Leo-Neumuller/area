<script lang="ts">
    export let options: string[] = [];
    export let value: string | undefined = undefined;
    export let placeholder: string = "";
    export let onChange: (value: string) => void = () => {};


    function handleChangeType(e: any) {
        onChange(e.target.value);
    }
</script>

<select value={value} on:input={handleChangeType} class="w-full bg-customWhite/[10%] rounded-lg p-4 font-SpaceGrotesk text-customWhite text-[1.75rem] font-normal">
    {#if placeholder}
        <option class="bg-gray" disabled selected value>{placeholder}</option>
    {/if}
    {#each options as option}
        <option class="bg-gray" value={option}>{option}</option>
    {/each}
</select>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
</style>