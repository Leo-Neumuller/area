<script lang="ts">
    let defaultClassName: string = "rounded-md bg-lightgray pl-3 placeholder:text-[1.4vw] placeholder:text-ultralightgray h-[2.7vw] text-customWhite text-[1.4vw]";
    export let placeholder: string | null | undefined = null;
    export let name: string | null | undefined = null;
    export let className: string | null | undefined = null;
    export let type: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "datetime-local" | "month" | "week" | "time" | "color" | null | undefined = null;
</script>
  
<input class={`${defaultClassName} ${className}`} placeholder={placeholder} name={name} on:input type={type} />