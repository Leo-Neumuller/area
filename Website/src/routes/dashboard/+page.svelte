<script lang="ts">
    import { goto } from "$app/navigation";
    import PlusSigne from "../../components/SVGs/+PlusSigne.svelte";
    import DashboardButton from "../../components/DashboardButton/+DashboardButton.svelte";
    import Dashboard from "../../components/SVGs/+Dashboard.svelte";
    import PreCreate from "../../components/SVGs/+PreCreate.svelte";
    import Area from "../../components/SVGs/+Area.svelte";
    import Flux from "../../components/SVGs/+Flux.svelte";
    import ProfileSvg from "../../components/SVGs/+Profile.svelte";
    import Close from "../../components/SVGs/+Close.svelte";
    import Hamburger from "../../components/SVGs/+Hamburger.svelte";

    import ProfilePage from "../../components/ProfilePage/+ProfilePage.svelte";
    import { getCookie } from "../../api/helpers";
    import { onMount } from "svelte";
    import DashboardPage from "../../components/DashboardPage/+DashboardPage.svelte";

    let selected: number = 0;
    let toggleMenu: boolean = true;

    onMount(() => {
        if (!getCookie('token') || getCookie('token') === "") {
            goto('/');
        }
    });

</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="AREA"/>
</svelte:head>

<section class="flex items-center w-full">
    <button class="fixed top-10 left-10 z-50" on:click={() => {
        toggleMenu = !toggleMenu;
    }}>
        {#if toggleMenu}
            <Close className="w-6 h-8" color="#F3F3F3"/>
        {:else}
            <Hamburger className="w-6 h-8" color="#F3F3F3"/>
        {/if}
    </button>
    {#if toggleMenu}
        <div class="fixed h-[90%] w-[24rem] bg-gray top-[10%] left-0 flex flex-col p-5 justify-between">
            <div>
                <button class="flex bg-primary w-full rounded-3xl py-4 items-center align-middle justify-between pl-8 pr-14"
                    on:click={() => {
                        goto('/flux-editor');
                    }}>
                    <PlusSigne className="w-12 h-12 pt-1" color="#373637"/>
                    <h1 class="text-gray font-bold text-[1.8rem]">
                        Nouveaux flux
                    </h1>
                </button>
                <div class="pt-16 flex flex-col gap-3">
                    <DashboardButton label="Dashboard" onClick={() => {selected = 0;}} selected={selected === 0}>
                        <Dashboard className="w-12 h-12" color={selected === 0 ? "#D9C6F4" : "#F3F3F3"}/>
                    </DashboardButton>
                    <DashboardButton label="Flux" onClick={() => {selected = 1;}} selected={selected === 1}>
                        <Area className="w-12 h-12" color={selected === 1 ? "#D9C6F4" : "#F3F3F3"}/>
                    </DashboardButton>
                    <DashboardButton label="Application" onClick={() => {selected = 2;}} selected={selected === 2}>
                        <Flux className="w-12 h-12" color={selected === 2 ? "#D9C6F4" : "#F3F3F3"}/>
                    </DashboardButton>
                    <DashboardButton label="Pré-créé" onClick={() => {selected = 3;}} selected={selected === 3}>
                        <PreCreate className="w-12 h-12" color={selected === 3 ? "#D9C6F4" : "#F3F3F3"}/>
                    </DashboardButton>
                </div>
            </div>
            <div class="self-end flex flex-col w-full border-t border-customWhite pt-6">
                <DashboardButton label="Profile" onClick={() => {selected = 4;}} selected={selected === 4}>
                    <ProfileSvg className="w-12 h-12" color={selected === 4 ? "#D9C6F4" : "#F3F3F3"}/>
                </DashboardButton>
            </div>
        </div>
    {/if}
    {#if selected === 0}
        <div class={`w-full ${toggleMenu ? "pl-[24rem]" : ""}`}>
            <DashboardPage/>
        </div>
    {:else if selected === 1}
        <div>
            
        </div>
    {:else if selected === 2}
        <div>
                
        </div>
    {:else if selected === 3}
        <div>
            
        </div>
    {:else if selected === 4}
        <div class={`w-full ${toggleMenu ? "pl-[24rem]" : ""}`}>
            <ProfilePage/>
        </div>
    {/if}
</section>