<script lang="ts">
    import Gmail from "../SVGs/+Gmail.svelte";

    export let name: string | undefined;
</script>

<div>
    {#if name === "Gmail"}
        <div>
            <Gmail className="w-8 h-8" color=""/>
        </div>    
    {:else if name === "Google Calendar"}
        <div>
            b   
        </div>
    {/if}
</div>