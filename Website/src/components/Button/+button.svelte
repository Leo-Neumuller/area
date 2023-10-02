<script lang="ts">
    export let className: string = "text-gray bg-primary text-[1.775rem] font-bold px-6 py-2 rounded-full font-SpaceGrotesk";
    export let onClick: () => void;

</script>
  
<button on:click={onClick} class={className}>
    <slot></slot>
</button>