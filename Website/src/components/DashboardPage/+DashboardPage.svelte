<script lang="ts">
    import { getAllFlux } from "../../api/api";
    import { getCookie } from "../../api/helpers";
    import FluxCard from "../FluxCard/+FluxCard.svelte";
    import FluxRow from "../FluxRow/+FluxRow.svelte";
    import Input from "../Input/+input.svelte";
    import Instagram from "../SVGs/+Instagram.svelte";


    async function getFLux() {
        const res = await getAllFlux(getCookie("token"));
        console.log(res)
        return res;
    }
</script>

<div class="pl-6 py-6">
    <div>
        <h1 class="text-[3rem] font-SpaceGrotesk font-medium">
            Actifs
        </h1>
        <div class="flex gap-10 overflow-auto w-full pb-4 pt-10">
            {#await getFLux()}
                <div>Loading...</div>
            {:then flux}
                {#each flux as f}
                    {#if f.active}
                        <FluxCard flux={f}/>
                    {/if}
                {/each}
            {/await}
        </div>
    </div>
    <div class="pt-20 pr-6">
        <h1 class="text-[3rem] font-SpaceGrotesk font-medium">
            Tous les flux
        </h1>
        <div class="bg-gray w-full rounded-3xl pb-6">
            <div class="flex flex-col overflow-auto w-full pb-4 pt-6 px-10 gap-6 mt-10">
                {#await getFLux()}
                    <div>Loading...</div>
                {:then flux}
                    {#each flux as f, index}
                        <FluxRow description={f.description} active={f.active} index={index}/>
                    {/each}
                {/await}
            </div>
        </div>
    </div>
</div>
