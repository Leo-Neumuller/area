<script lang="ts">
    import { goto } from "$app/navigation";
    import { userMe } from "../../api/api";
    import { getCookie } from "../../api/helpers";
    import TextInput from "../TextInput/+TextInput.svelte";

    async function getUserMe() {
        const res = await userMe(getCookie("token"));
        return res
    }
</script>

<div class="p-6">
    {#await getUserMe()}
        <div>Loading...</div>
    {:then user}
        <h1 class="text-[5.62rem] font-bold font-SpaceGrotesk text-gray">Bonjour {user.name}</h1>
        <h1 class="text-[3.1rem] font-SpaceGrotesk font-medium text-gray pt-5">Informations</h1>
        <div class="bg-gray rounded-3xl p-10 flex flex-wrap justify-between gap-2">
            <div class="flex flex-col gap-2 font-SpaceGrotesk font-medium text-[1.8rem] text-customWhite">
                <h1 class="text-customWhite">Nom</h1>
                <h1 class={`rounded-xl px-4 py-2 bg-customWhite/[10%] outline-none text-customWhite/20 w-[30rem]`}>
                    {user.name}
                </h1>   
            </div>
            <div class="flex flex-col gap-2 font-SpaceGrotesk font-medium text-[1.8rem] text-customWhite">
                <h1 class="text-customWhite">Prénom</h1>
                <h1 class={`rounded-xl px-4 py-2 bg-customWhite/[10%] outline-none text-customWhite/20 w-[30rem]`}>
                    {user.surname}
                </h1>   
            </div>
            <div class="flex flex-col gap-2 font-SpaceGrotesk font-medium text-[1.8rem] text-customWhite">
                <h1 class="text-customWhite">Email</h1>
                <h1 class={`rounded-xl px-4 py-2 bg-customWhite/[10%] outline-none text-customWhite/20 w-[30rem]`}>
                    {user.email}
                </h1>   
            </div>
        </div>
    {/await}
    <div class="w-full flex justify-center pt-10">
        <button class="border border-red-500 rounded-2xl hover:bg-red-500 hover:text-white text-red-500 px-6"
            on:click={() => {
                document.cookie = 'token=; Max-Age=-99999999;'; 
                goto('/');
            }}>
            <h1 class="font-SpaceGrotesk font-medium text-[2.1rem] p-2 ">Déconnexion</h1>
        </button>
    </div>
</div>