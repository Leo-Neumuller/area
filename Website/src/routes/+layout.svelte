<script>
	import Header from './Header.svelte';
	import "../app.css";
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>This is The footer for all the page</p>
	</footer>
</div>

<style>

</style>
