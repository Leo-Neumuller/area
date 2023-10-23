<script lang="ts">
  import Button from "../../components/Button/+button.svelte";
  import { goto } from "$app/navigation";
  import { loginPost } from "../../api/api";
  import Input from "../../components/Input/+input.svelte";
  import { onMount } from 'svelte';

  let errorMsg: string;
  
  onMount(() => {
    if (document.cookie.includes("token")) {
      goto("/dashboard");
    }
  });

  function handleSubmit(event: SubmitEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    let data: { [key: string]: string } = {};

		for (let field of formData) {
			const [key, value] = field as [string, string];
      if (!value) {
        errorMsg = "Veuillez remplir tous les champs";
        return;
      }
			data[key] = value;
		}
    
    loginPost(data)
    .then((res: Response) => res.json())
    .then((res) => {
      document.cookie = `token=${res.access_token}; path=/`;
      goto("/dashboard");
    })
    .catch((err: Error) => {
      errorMsg = err.message;
    })
	}

</script>
<svelte:head>
    <title>Se Connecter</title>
    <meta name="description" content="AREA"/>
</svelte:head>

<section class="flex justify-center items-center w-full font-SpaceGrotesk">
  <div class="flex justify-around w-11/12 pb-4">
    <div class="flex flex-col float-right w-3/6">
      <h1 class="font-bold text-[4.2vw] text-black mt-[10vw] self-center w-9/12">
        <p>Bon retour parmis nous</p>
      </h1>
      <h2 class="mt-[4vw] text-[2.2vw] self-center w-9/12">
        <p>Connectez vous pour retrouver tous vos flux</p>
      </h2>
    </div>
    <form method="post" on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-col float-right bg-gray w-[30vw] rounded-[4vw] mt-[10vw] h-">
        <div class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw]">
          <p class="self-start text-[1.4vw] text-customWhite">Email</p>
          <Input className="w-full"  placeholder="Email" name="email" />
        </div>
        <div class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw]">
          <p class="self-start text-[1.4vw] text-customWhite">Mot de passe</p>
          <Input className="w-full" placeholder="Mot de passe" name="password" type="password" />
        </div>
        {#if errorMsg}
          <p class="text-[1.4vw] self-center text-red-300 pt-[2vw] w-4/6 text-center">{errorMsg}</p>
        {/if}
        <div class="self-center mt-auto mb-7 pt-[2vw]">
          <Button type="submit">
            <p>Se connecter</p>
          </Button>
        </div>
      </div>
    </form>
  </div>
</section>