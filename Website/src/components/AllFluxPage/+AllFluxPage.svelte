<script lang="ts">
    import { getAllFlux } from "../../api/api";
    import { getCookie } from "../../api/helpers";
    import FluxCard from "../FluxCard/+FluxCard.svelte";

    let noFLux: boolean = false;

    async function getFLux() {
        const res = await getAllFlux(getCookie("token"));
        if (res.length === 0) {
            noFLux = true;
        }
        return res;
    }
</script>

<div class="p-6 pl-14">
    {#if !noFLux}
        <h1 class="text-[3rem] font-SpaceGrotesk font-medium text-gray">
            Vos flux
        </h1>
        <div class="flex flex-wrap gap-10 w-full pb-4 pt-6">
            {#await getFLux()}
                <div>Loading...</div>
            {:then flux}
                {#each flux as f}
                    <FluxCard flux={f}/>
                {/each}
            {/await}
        </div>
    {:else}
        <div class="w-full h-[90vh] flex items-center justify-center text-[1.7rem] font-SpaceGrotesk text-gray/50">
            Aucun flux créé pour l'instant
        </div>
    {/if}
</div>