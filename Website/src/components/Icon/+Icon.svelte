<script lang="ts">
    import Gmail from "../SVGs/+Gmail.svelte";
    import GoogleCalendar from "../SVGs/+GoogleCalendar.svelte";
    import Spotify from "../SVGs/+Spotify.svelte";
    import Warning from "../SVGs/+Warning.svelte";
    import Weather from "../SVGs/+Weather.svelte";

    export let name: string | undefined;
    export let className: string;
</script>

<div>
    {#if name === "Gmail"}
        <div data-testid="Gmail">
            <Gmail className={className} color=""/>
        </div>    
    {:else if name === "Google Calendar"}
        <div data-testid="Google Calendar">
            <GoogleCalendar className={className} color=""/>
        </div>
    {:else if name === "Spotify"}
        <div data-testid="Spotify">
            <Spotify className={className} color=""/>
        </div>
    {:else if name === "Weather"}
        <div data-testid="Weather">
            <Weather className={className} color=""/>
        </div>
    {:else if name === "Down Detector"}
        <div data-testid="Down Detector">
            <Warning className={className} color=""/>
        </div>
    {/if}
</div>