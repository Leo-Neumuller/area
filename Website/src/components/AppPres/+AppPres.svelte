<script lang="ts">
    import RightArrow from "../SVGs/+RightArrow.svelte";

    export let image: string;
    export let title: string;
    export let text: string;
    export let hideButton: boolean;
    export let buttonText: string;
    export let onClick: () => void;
</script>

<div class="flex items-center justify-center gap-[4vw]">
    <div>
        <img src={image} alt="reaction action" class="w-[30vw]">
    </div>
    <div class="flex flex-col lg:gap-[3vw] h-full w-[40vw] object-contain">
        <h2 class="text-gray text-[2.2vw] font-semibold">{title}</h2>
        <p class="text-gray text-[1.8vw] lg:text-[1.4vw]">{text}</p>
        {#if !hideButton}
            <!-- <button on:click={onClick} class="flex items-center align-middle self-end text-[1.2vw] lg:text-[0.9vw]">
                <button class="hover-underline-animation text-gray">
                    {buttonText}
                </button>
                <RightArrow className="w-8 h-8" color="#373637"/>
            </button> -->
        {/if}
    </div>
</div>