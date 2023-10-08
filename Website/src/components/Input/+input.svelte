<script lang="ts">
    import type {HTMLInputTypeAttribute} from "svelte/elements";

    let defaultClassName: string = "rounded-md bg-lightgray pl-3 placeholder:text-[1.4vw] placeholder:text-ultralightgray h-[2.7vw] text-customWhite text-[1.4vw]";
    export let placeholder: string | null | undefined = null;
    export let name: string | null | undefined = null;
    export let className: string | null | undefined = null;
    export let type: HTMLInputTypeAttribute | undefined | null = null;
</script>
  
<input class={`${defaultClassName} ${className}`} placeholder={placeholder} name={name} on:input type={type} />