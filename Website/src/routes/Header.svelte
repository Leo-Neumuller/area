<script>
	import { page } from '$app/stores';
    import Button from '../components/Button/+button.svelte';
    import { goto } from '$app/navigation';
</script>

<header>
    <div id="test" class="fixed top-0 w-full bg-gray px-6 py-4 flex justify-between items-center font-SpaceGrotesk z-20">
        <button on:click={() => {
            goto('/');
        }}>
            <h1 class="font-Logo text-white text-[3.125rem]">FLUX</h1>
        </button>
        {#if $page.url.pathname === '/'}
        <div>
            <button class="hover-underline-animation-alt text-customWhite text-[1.775rem] font-medium px-6 py-2 rounded-full uppercase">
                explorer
            </button>
            <Button onClick={() => {
                goto('/login');
            }}>
                Commencer
            </Button>
        </div>
        {/if}
        {#if $page.url.pathname === '/login'}
            <Button onClick={() => {
                goto('/register');
            }}>
                S'inscrire
            </Button>
        {/if}
        {#if $page.url.pathname === '/register'}
            <Button onClick={() => {
                goto('/login');
            }}>
                Se connecter
            </Button>
        {/if}
    </div>
    <div class="w-full bg-gray px-6 py-4 flex justify-between items-center font-SpaceGrotesk">
        <h1 class="font-Logo text-white text-[3.125rem]">FLUX</h1>
        {#if $page.url.pathname === '/'}
        <div>
            <button class="text-customWhite text-[1.775rem] font-medium px-6 py-2 rounded-full uppercase">
                explorer
            </button>
            <Button onClick={() => {}}>
                Commencer
            </Button>
        </div>
        {/if}
    </div>
</header>


<!-- <p>This is Header For All Pages</p>
<p> Title:
    {#if $page.url.pathname === '/'}
        Home Page
    {:else if $page.url.pathname === '/bonjour'}
        Bonjour Page
    {:else}
        404 Page
    {/if}
</p>
{#if $page.url.pathname === '/'}
    <a href="/bonjour" class="underline">Go To Bonjour</a>
{:else if $page.url.pathname === '/bonjour'}
    <a href="/" class="underline">Go To Home</a>
{:else}
    <a href="/" class="underline">Go To Home</a>
{/if} -->
