<script lang="ts">
    import { goto } from "$app/navigation";
  import { act } from "@testing-library/svelte";
  import { deleteFlux } from "../../api/api";
  import { getCookie } from "../../api/helpers";
  import Icon from "../Icon/+Icon.svelte";
    import Instagram from "../SVGs/+Instagram.svelte";
    import RightArrow from "../SVGs/+RightArrow.svelte";

    export let flux: {
        id: number;
        name: string;
        description: string;
        active: boolean;
        action: string;
        reaction: string;
    };
    export let deleteButton: boolean | undefined;

</script>

<div class="rounded-3xl border border-gray/20 pt-4 min-w-[27rem]  max-w-[27rem] min-h-[14rem] flex flex-col justify-between">
    <div class="flex justify-between mx-4">
        <div class="flex gap-5">
            <Icon className="w-12 h-12" name={flux.action}/>
            <Icon className="w-12 h-12" name={flux.reaction}/>
        </div>
        {#if deleteButton}
            <button class="font-SpaceGrotesk text-red-600 border border-red-600 rounded-2xl px-6 font-bold hover:text-customWhite hover:bg-red-600"
                on:click={() => {
                    deleteFlux(getCookie("token"), flux.id).then((res) => {
                        console.log(res)
                    });
                }}>
                Supprimer
            </button>
        {/if}
    </div>
    <h1 class="text-[1.7rem] font-normal font-SpaceGrotesk mx-4">{flux.description}</h1>
    <button class="flex justify-between text-[1.5rem] font-normal font-SpaceGrotesk bg-gray/10 rounded-b-3xl px-3 py-3"
        on:click={() => {
            goto(`/flux-editor?FluxId=${flux.id}`);
        }}>
        <h1>{flux.name}</h1>
        <div class=" align-middle">
            <RightArrow className="w-10 h-10" color="#000"/>
        </div>
    </button>
</div>