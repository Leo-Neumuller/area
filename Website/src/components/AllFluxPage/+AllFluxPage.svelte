<script lang="ts">
    import { getAllFlux } from "../../api/api";
    import { getCookie } from "../../api/helpers";
    import FluxCard from "../FluxCard/+FluxCard.svelte";

    async function getFLux() {
        const res = await getAllFlux(getCookie("token"));
        return res;
    }
</script>

<div class="p-6 pl-14">
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
</div>