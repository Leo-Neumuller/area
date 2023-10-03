<script lang="ts">
  import Button from "../../components/Button/+button.svelte";
  import { goto } from "$app/navigation";
</script>

<svelte:head>
  <title>S'inscrire</title>
  <meta name="description" content="AREA"/>
</svelte:head>

<section class="flex justify-center items-center w-full">
  <div class="flex justify-center w-11/12 gap-[2vw] pb-4">
    <div class="flex flex-col float-right ml-[9vw] w-3/6">
      <h1 class="font-bold text-[4.2vw] text-black mt-[10vw] self-center w-11/12">
        <p>Près à optimiser votre quotidien ?</p>
      </h1>
      <h2 class="mt-[4vw] text-[2.2vw] self-center w-11/12">
        <p>Créé un compte pour commencer à réaliser vos propre flux</p>
      </h2>
    </div>
    <div class="flex flex-col float-right bg-gray w-[30vw] h-auto rounded-[4vw] mt-[3vw]">
      <div class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw]">
        <p class="self-start text-[1.4vw] text-customWhite">Nom</p>
        <input class="self-start w-full rounded-md bg-lightgray placeholder:pl-3 placeholder:text-[1.4vw] placeholder:text-ultralightgray h-[2.7vw]" placeholder="Nom" />
      </div>
      <div class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw]">
        <p class="self-start text-[1.4vw] text-customWhite">Prénom</p>
        <input class="self-start w-full rounded-md bg-lightgray placeholder:pl-3 placeholder:text-[1.4vw] placeholder:text-ultralightgray h-[2.7vw]" placeholder="Prénom" />
      </div>
      <div class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw]">
        <p class="self-start text-[1.4vw] text-customWhite">Email</p>
        <input class="self-start w-full rounded-md bg-lightgray placeholder:pl-3 placeholder:text-[1.4vw] placeholder:text-ultralightgray h-[2.7vw]" placeholder="Email" />
      </div>
      <div class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw]">
        <p class="self-start text-[1.4vw] text-customWhite">Mot de passe</p>
        <input class="self-start w-full rounded-md bg-lightgray placeholder:pl-3 placeholder:text-[1.4vw] placeholder:text-ultralightgray h-[2.7vw]" placeholder="Mot de passe" />
      </div>
      <div class="self-center mt-auto pb-[2vw] pt-[2vw]">
        <Button onClick={() => {
          goto('/register');
        }}>
          <p>S'inscrire</p>
        </Button>
      </div>
    </div>
  </div>
</section>