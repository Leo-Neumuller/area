<script lang="ts">
    export let options: string[] = [];
    export let value: string | undefined = undefined;
    export let placeholder: string = "";
    export let onChange: (value: string) => void = () => {};


    function handleChangeType(e: any) {
        onChange(e.target.value);
    }
</script>

<select on:input={handleChangeType} class="w-full bg-customWhite/[10%] rounded-lg p-4 font-SpaceGrotesk text-customWhite text-[1.65rem] font-normal">
    {#if placeholder}
        <option class="bg-gray" selected={true} disabled={true}>{placeholder}</option>
    {/if}
    {#each options as option}
        {#if value === option}
            <option class="bg-gray" value={option} selected>{option}</option>
        {:else}
            <option class="bg-gray" value={option}>{option}</option>
        {/if}
    {/each}
</select>
