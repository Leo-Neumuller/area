<script lang="ts">
    export let className: string;
    export let color: string;
</script>

<svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
>
    <path
        d="M28 6H42V20"
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6H18"
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M25.7998 22.1999L41.0998 6.8999"
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
