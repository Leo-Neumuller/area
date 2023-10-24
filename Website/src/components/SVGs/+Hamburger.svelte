<script lang="ts">
    export let className: string;
    export let color: string;
</script>

<svg
    viewBox="0 0 30 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
>
    <path
        d="M1 1H29M1 13H29M1 25H29"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
