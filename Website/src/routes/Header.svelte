<script>
	import { page } from '$app/stores';
</script>

<header>
	<p>This is Header For All Pages</p>
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
	{/if}

</header>

<style lang="postcss">
	header {
		background-color: theme(colors.violet.600);
		color: #fff;
		padding: 1rem;
	}
</style>
