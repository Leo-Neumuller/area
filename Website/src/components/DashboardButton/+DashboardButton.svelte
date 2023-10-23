<script lang="ts">
    export let label: string;
    export let onClick: () => void;
    export let selected: boolean;
</script>

<button class={`${selected ? "bg-primary/10" : ""} w-full rounded-3xl font-SpaceGrotesk flex items-center align-middle pr-14 pl-8 gap-6 hover:bg-primary/[10%] cursor-pointer`}
    on:click={onClick}>
    <slot></slot>
    <h1 class="p-5 text-customWhite text-[1.75rem] font-medium">{label}</h1>
</button>