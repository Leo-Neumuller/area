<script lang="ts">
    import { toggleFlux } from "../../api/api";
    import { getCookie } from "../../api/helpers";
    import Instagram from "../SVGs/+Instagram.svelte";
    import RightArrow from "../SVGs/+RightArrow.svelte";

    export let description: string;
    export let active: boolean;
    export let index: number;
    export let id: number;
</script>

<div class={`flex justify-between ${index === 0 ? "" : "border-t"} border-customWhite pt-6 text-[1.75rem] text-customWhite font-SpaceGrotesk`}> 
    <div class="flex gap-4 align-middle">
        <Instagram className="w-12 h-12" color="#f7ccff"/>
        <Instagram className="w-12 h-12" color="#f7ccff"/>
    </div>
    <h1 class="align-middle">{description}</h1>
    <div class="">
        {#if active}
            <button class="rounded-xl bg-primary text-gray min-w-[11rem] py-1 font-medium"
                on:click={() => {
                    toggleFlux(getCookie("token"), id);
                    active = !active;
                    window.location.reload();
                }}>
                Activer
            </button>
        {:else}
            <button class="rounded-xl bg-white/30 min-w-[11rem] py-1 font-medium"
                on:click={() => {
                    toggleFlux(getCookie("token"), id);
                    active = !active;
                    window.location.reload();
                }}>
                Désactiver
            </button>   
        {/if}
    </div>
</div>