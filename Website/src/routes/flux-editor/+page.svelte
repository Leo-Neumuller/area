<script lang="ts">
    import { onMount } from "svelte";
    import Board from "../../components/Editor/Board/+board.svelte";
    import { getCookie } from "../../api/helpers";
    import { goto } from "$app/navigation";

    onMount(() => {
        if (!getCookie('token') || getCookie('token') === "") {
            goto('/');
        }
    });
</script>

<svelte:head>
  <title>Editeur de flux</title>
  <meta name="description" content="AREA"/>
</svelte:head>

<Board />