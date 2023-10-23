<script lang="ts">
    import { goto } from "$app/navigation";
    import Instagram from "../SVGs/+Instagram.svelte";
    import RightArrow from "../SVGs/+RightArrow.svelte";

    export let flux: {
        id: number;
        name: string;
        description: string;
        active: boolean;
    };

</script>

<div class="rounded-3xl border border-gray/20 pt-4 min-w-[27rem] min-h-[14rem] flex flex-col justify-between">
    <div class="flex gap-5 mx-4">
        <Instagram className="w-12 h-12" color="#000"/>
        <Instagram className="w-12 h-12" color="#000"/>
    </div>
    <h1 class="text-[1.7rem] font-normal font-SpaceGrotesk mx-4">{flux.description}</h1>
    <button class="flex justify-between text-[1.5rem] font-normal font-SpaceGrotesk bg-gray/10 rounded-b-3xl px-3 py-3"
        on:click={() => {
            goto(`/flux-editor?FluxId=${flux.id}`);
        }}>
        <h1>Caca + Prout</h1>
        <div class=" align-middle">
            <RightArrow className="w-10 h-10" color="#000"/>
        </div>
    </button>
</div>