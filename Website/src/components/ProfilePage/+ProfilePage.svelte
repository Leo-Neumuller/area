<script lang="ts">
    import { goto } from "$app/navigation";
    import { checkConnected, disconnectService, getOauthLink, getServices, userMe } from "../../api/api";
    import { getCookie } from "../../api/helpers";
  import Icon from "../Icon/+Icon.svelte";
    import Goto from "../SVGs/+Goto";
    import Instagram from "../SVGs/+Instagram.svelte";
    import Validate from "../SVGs/+Validate.svelte";
    import TextInput from "../TextInput/+TextInput.svelte";

    let services:any = [];
    async function getUserMe() {
        const res = await userMe(getCookie("token"));
        return res
    }

    let dic: {[key: string] : boolean} = {};
    async function isConnected(service: string) {
        const res = await checkConnected(getCookie("token"), service);
        dic = {...dic, [service]: res.is_connected}
    }

    function onlyUnique(value: any, index: any, array: any) {
        return array.indexOf(value) === index;
    }

    getServices(getCookie("token")).then((res) => {
        let data = [...res.action, ...res.reaction];
        services = data.filter(onlyUnique) 
    })
</script>

<div class="p-6">
    {#await getUserMe()}
        <div>Loading...</div>
    {:then user}
        <h1 class="text-[5.22rem] font-bold font-SpaceGrotesk text-gray">Bonjour {user.name}</h1>
        <h1 class="text-[3rem] font-SpaceGrotesk font-medium text-gray">
            Informations
        </h1>
        <div class="bg-gray rounded-[3rem] p-10 flex justify-center items-center mt-4 mx-10">
            <div class="flex flex-wrap gap-6">
                <div class="flex flex-col gap-2 font-SpaceGrotesk font-medium text-[1.5rem] text-customWhite">
                    <h1 class="text-customWhite">Nom</h1>
                    <h1 class={`rounded-xl px-4 py-2 bg-customWhite/[10%] outline-none text-customWhite/20 w-[30rem]`}>
                        {user.name}
                    </h1>   
                </div>
                <div class="flex flex-col gap-2 font-SpaceGrotesk font-medium text-[1.5rem] text-customWhite">
                    <h1 class="text-customWhite">Prénom</h1>
                    <h1 class={`rounded-xl px-4 py-2 bg-customWhite/[10%] outline-none text-customWhite/20 w-[30rem]`}>
                        {user.surname}
                    </h1>   
                </div>
                <div class="flex flex-col gap-2 font-SpaceGrotesk font-medium text-[1.5rem] text-customWhite">
                    <h1 class="text-customWhite">Email</h1>
                    <h1 class={`rounded-xl px-4 py-2 bg-customWhite/[10%] outline-none text-customWhite/20 w-[30rem]`}>
                        {user.email}
                    </h1>   
                </div>
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
    <h1 class="text-[3rem] font-SpaceGrotesk font-medium text-gray mt-10">
        Comptes connectés
    </h1>
    <div class="flex gap-6 flex-wrap pt-4">
        {#each services as service}
            <div class="border border-gray rounded-lg p-3 text-[1.5rem]">
                {#await isConnected(service)}
                    Wait
                {:then res}
                    {#if dic[service]}
                        <button class="flex justify-between gap-5"
                            on:click={() => {
                                disconnectService(getCookie("token"), service).then((res) => {
                                    dic = {...dic, [service]: false};
                                })
                            }}>
                            <Icon name={service} className="w-10 h-10"/>
                            <h1 class="items-center">Se déconnecter</h1>
                            <div>
                                <Validate className="w-8 h-8 pt-1" color="#373637"/>
                            </div>
                        </button>
                    {:else}
                        <button class="flex justify-between gap-5"
                            on:click={() => {
                                getOauthLink(getCookie("token"), service).then((res) => {
								const popup = window.open(res["url"], "popup", "width=600,height=600 popup=true");
								const interval = setInterval(() => {
									try {
										if (popup?.closed) {
											clearInterval(interval);
                      dic = {...dic, [service]: true};
										}
									} catch {
										return;
									}
								}, 1000);
							});
                            }}>
                            <Icon name={service} className="w-10 h-10"/>
                            <h1 class="items-center">Se connecter</h1>
                            <div>
                                <Goto className="w-8 h-8 pt-2" color="#373637"/>
                            </div>
                        </button>
                    {/if}
                {/await}
            </div>
        {/each}
    </div>
</div>