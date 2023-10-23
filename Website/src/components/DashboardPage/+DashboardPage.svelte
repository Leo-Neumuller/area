<script lang="ts">
    import { getAllFlux } from "../../api/api";
    import { getCookie } from "../../api/helpers";
    import FluxCard from "../FluxCard/+FluxCard.svelte";
    import FluxRow from "../FluxRow/+FluxRow.svelte";
    import Input from "../Input/+input.svelte";
    import Instagram from "../SVGs/+Instagram.svelte";

    let noFLux: boolean = false;
    async function getFLux() {
        const res = await getAllFlux(getCookie("token"));
        console.log(res)
        if (res.length === 0) {
            noFLux = true;
        }
        return res;
    }

    function checkActive(flux: any) {
        for (let i = 0; i < flux.length; i++) {
            if (flux[i].active) {
                return true;
            }
        }
        return false;
    }
</script>

<div class="pl-14 py-6">
    {#if !noFLux}
        <div>
            {#await getFLux()}
                <div>Loading...</div>
            {:then flux}
                {#if checkActive(flux)}
                    <h1 class="text-[3rem] font-SpaceGrotesk font-medium text-gray">
                        Actifs
                    </h1>
                    <div class="flex gap-10 overflow-auto w-full pt-10 pb-20">
                        {#each flux as f}
                            {#if !flux}
                                Aucun flux
                            {/if}
                            {#if f.active}
                                <FluxCard flux={f}/>
                            {/if}
                        {/each}
                    </div>
                {/if}
            {/await}
        </div>
        <div class="pr-6">
            <h1 class="text-[3rem] font-SpaceGrotesk font-medium text-gray">
                Tous les flux
            </h1>
            <div class="bg-gray w-full rounded-3xl pb-6">
                <div class="flex flex-col overflow-auto w-full pb-4 pt-6 px-10 gap-6 mt-10">
                    {#await getFLux()}
                        <div>Loading...</div>
                    {:then flux}
                        {#each flux as f, index}
                            <FluxRow description={f.description} active={f.active} index={index} id={f.id}/>
                        {/each}
                    {/await}
                </div>
            </div>
        </div>
    {:else}
        <div class="w-full h-[80vh] flex items-center justify-center text-[1.7rem] font-SpaceGrotesk text-gray/50">
            Aucun flux créé pour l'instant
        </div>
    {/if}
</div>
