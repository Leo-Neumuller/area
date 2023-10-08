<script lang="ts">
    import { goto } from "$app/navigation";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="AREA"/>
</svelte:head>

<section class="flex justify-center items-center w-full">
    <button on:click={() => {
        goto('/flux-editor');
    }}>
        go to flux
    </button>
</section>