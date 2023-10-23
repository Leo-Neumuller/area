<script lang="ts">
    import { getServices } from "../../api/api";
    import { getCookie } from "../../api/helpers";
    import Instagram from "../SVGs/+Instagram.svelte";

    let actions: any = [];
    let reactions: any = [];
    getServices(getCookie("token")).then((res) => {
        actions = res.action;
        reactions = res.reaction;
    })
</script>

<div class="px-48 py-20 flex flex-col gap-10">
    <div class="flex flex-col gap-4">
        <h1 class="text-[3rem] font-SpaceGrotesk font-medium text-gray">
            Actions
        </h1>
        <div class="flex flex-wrap gap-8 text-[2.1rem] font-SpaceGrotesk font-semibold">
            {#each actions as action}
                <div class="bg-gray/20 rounded-2xl p-6 justify-center items-center flex flex-col gap-6 min-w-[13rem]">
                    <Instagram className="w-20 h-20" color="#373637"/>
                    <h1>{action}</h1>
                </div>
            {/each}
        </div>
    </div>
    <div class="flex flex-col gap-4">
        <h1 class="text-[3rem] font-SpaceGrotesk font-medium text-gray">
            Réactions
        </h1>
        <div class="flex flex-wrap gap-8 text-[2.1rem] font-SpaceGrotesk font-semibold">
            {#each reactions as reaction}
                <div class="bg-gray/20 rounded-2xl p-6 justify-center items-center flex flex-col gap-6 min-w-[13rem]">
                    <Instagram className="w-20 h-20" color="#373637"/>
                    <h1>{reaction}</h1>
                </div>
            {/each}
        </div>
    </div>
</div>