<script lang="ts">
    export let className: string = "text-gray bg-primary text-[2vw] font-bold px-6 py-2 rounded-full font-SpaceGrotesk";
    export let onClick: () => void = () => {};
    export let type: "button" | "submit" | "reset" | null | undefined = null;

</script>
  
<button on:click={onClick} class={className} type={type}>
    <slot></slot>
</button>