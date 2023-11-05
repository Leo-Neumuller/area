<script lang="ts">
    export let name: string;
</script>

<div class="flex rounder-2xl justify-center items-center gap-4">
    <slot></slot>
    <h2 class="text-gray/[70%] text-[1.9vw] font-semibold">{name}</h2>
</div>