<script lang="ts">
  import Button from "../../components/Button/+button.svelte";
  import { goto } from "$app/navigation";
</script>
<svelte:head>
  <title>Se Connecter</title>
  <meta name="description" content="AREA"/>
</svelte:head>

<section class="flex justify-center items-center w-full">
  <div class="flex justify-around w-11/12 pb-4">
    <div class="flex flex-col float-right w-3/6">
      <h1 class="font-bold text-[4.2vw] text-black mt-[10vw] self-center w-9/12">
        <p>Bon retour parmis nous</p>
      </h1>
      <h2 class="mt-[4vw] text-[2.2vw] self-center w-9/12">
        <p>Connectez vous pour retrouver tous vos flux</p>
      </h2>
    </div>
    <div class="flex flex-col float-right bg-gray w-[30vw] rounded-[4vw] mt-[10vw] h-">
      <div class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw]">
        <p class="self-start text-[1.4vw] text-customWhite">Nom</p>
        <input class="self-start w-full rounded-md bg-lightgray placeholder:pl-3 placeholder:text-[1.4vw] placeholder:text-ultralightgray h-[2.7vw]" placeholder="Nom" />
      </div>
      <div class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw]">
        <p class="self-start text-[1.4vw] text-customWhite">Prénom</p>
        <input class="self-start w-full rounded-md bg-lightgray placeholder:pl-3 placeholder:text-[1.4vw] placeholder:text-ultralightgray h-[2.7vw]" placeholder="Prénom" />
      </div>
      <div class="self-center mt-auto mb-7 pt-[2vw]">
        <Button onClick={() => {
          goto('/register');
        }}>
          <p>Se connecter</p>
        </Button>
      </div>
    </div>
  </div>
</section>