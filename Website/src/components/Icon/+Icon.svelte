<script lang="ts">
    import Gmail from "../SVGs/+Gmail.svelte";
    import GoogleCalendar from "../SVGs/+GoogleCalendar.svelte";
    import Spotify from "../SVGs/+Spotify.svelte";

    export let name: string | undefined;
    export let className: string;
</script>

<div>
    {#if name === "Gmail"}
        <div>
            <Gmail className={className} color=""/>
        </div>    
    {:else if name === "Google Calendar"}
        <div>
            <GoogleCalendar className={className} color=""/>
        </div>
    {:else if name === "Spotify"}
        <div>
            <Spotify className={className} color=""/>
        </div>
    {/if}
</div>