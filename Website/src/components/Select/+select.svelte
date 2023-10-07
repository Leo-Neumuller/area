<script lang="ts">
  export let options: string[] = [];
  export let value: string | undefined = undefined;

  export let placeholder: string = "";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()

</script>
<select bind:value={value} on:change={e => dispatch("change", e.target.value)}>
  {#if placeholder}
    <option value="" disabled selected hidden>{placeholder}</option>
  {/if}
  {#each options as option}
    <option value={option}>{option}</option>
  {/each}
</select>