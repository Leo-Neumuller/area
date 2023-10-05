<script lang="ts">
    export let label: string;
    export let value: any;
    export let type: string;
    export let placeholder: string;
    export let onInput: (e: any) => void;
</script>

<div class="w-full flex flex-col gap-2 font-SpaceGrotesk">
    <h1 class="text-customWhite">{placeholder}</h1>
    <input type={type} placeholder={placeholder} class="w-full rounded-xl px-4 py-2 bg-customWhite/[10%] outline-none text-customWhite" value={value} on:input={onInput}/>
</div>

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