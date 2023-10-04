<script>
	import { page } from '$app/stores';
    import Button from '../components/Button/+button.svelte';
    import { goto } from '$app/navigation';

    import LeftArrow from '../components/SVGs/+LeftArrow.svelte';
</script>

<header>
    <div id="test" class="fixed top-0 w-full bg-gray px-6 py-4 flex justify-between items-center font-SpaceGrotesk z-20">
        {#if $page.url.pathname === '/dashboard'}
            <div>
                
            </div>
        {/if}
        {#if $page.url.pathname === '/flux-editor'}
            <button on:click={() => {
                console.log(document.cookie);
                if (document.cookie.includes("token")) {
                    goto("/dashboard");
                } else {
                    goto('/');
                }
            }}>
                <LeftArrow className="w-14 h-14" color="white" />
            </button>
        {/if}
        <button on:click={() => {
            goto('/');
        }}>
            <h1 class="font-Logo text-white text-[3.125rem]">FLUX</h1>
        </button>
        {#if $page.url.pathname === '/dashboard'}
            <div>
                
            </div>
        {/if}
        {#if $page.url.pathname === '/flux-editor'}
            <div>
                <LeftArrow className="w-14 h-14" color=""/>
            </div>
        {/if}

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
