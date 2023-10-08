<script lang="ts">
    import { goto } from "$app/navigation";
    import PlusSigne from "../../components/SVGs/+PlusSigne.svelte";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="AREA"/>
</svelte:head>

<section class="flex justify-center items-center w-full">
    <div class="fixed h-screen w-[20%] bg-gray top-[10%] left-0 flex flex-col p-5">
        <button class="flex bg-primary w-full rounded-3xl py-4 items-center align-middle justify-between pl-8 pr-14"
            on:click={() => {
                goto('/flux-editor');
            }}>
            <PlusSigne className="w-12 h-12 pt-1" color="#373637"/>
            <h1 class="text-gray font-bold text-[1.75rem]">
                Nouveaux flux
            </h1>
        </button>
    </div>
</section>