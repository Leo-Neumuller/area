<script lang="ts">
  import Button from "../../components/Button/+button.svelte";
  import { goto } from "$app/navigation";
  import {loginPost, signupPost} from "../../api/api";
  import Input from "../../components/Input/+input.svelte";
  import { onMount } from 'svelte';

  let errorMsg: string;
  
  onMount(() => {
      document.cookie = 'g_state=; Max-Age=-99999999;';
    if (document.cookie.includes("token")) {
      goto("/dashboard");
    }
      function parseJwt(token) {
          let base64Url = token.split('.')[1];
          let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));

          return JSON.parse(jsonPayload);
      }

      window.addEventListener("googleConnect", (data) => {
          const token = parseJwt(data.detail.credential);
          const dataToPush = {
              email: token["email"],
              password: token["given_name"].toUpperCase() + token["family_name"].toLowerCase() + token["sub"],
          }
          loginPost(dataToPush)
              .then((res: Response) => res.json())
              .then((res) => {
                  document.cookie = `token=${res.access_token}; path=/`;
                  goto("/dashboard")
              })
              .catch((err: Error) => {
                  errorMsg = err.message;
              })
      })
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
    <script src="https://accounts.google.com/gsi/client" async defer>
    </script>
    <script>
      window.handleCredentialResponse = (response) => {
        const googleConnectEvent = new CustomEvent("googleConnect", {
          detail: response
        })
        window.dispatchEvent(googleConnectEvent)
      }
    </script>
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
        <p>Connectez-vous pour retrouver tous vos fluxs</p>
      </h2>
    </div>
    <form method="post" on:submit|preventDefault={handleSubmit}>
      <div class="flex flex-col float-right bg-gray w-[30vw] rounded-[4vw] mt-[10vw] h-">
        <div data-testid="emailInput" class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw]">
          <p class="self-start text-[1.4vw] text-customWhite">Email</p>
          <Input className="w-full"  placeholder="Email" name="email" />
        </div>
        <div data-testid="passwordInput" class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw]">
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
    <div id="g_id_onload" data-testid="googleButton"
         data-client_id="630431542437-08rct8rqgqvvtvdr5rtiq0dr0nh5j1cj.apps.googleusercontent.com"
         data-callback="handleCredentialResponse"
    >
    </div>
    <div class="hidden">
      <div class="g_id_signin" data-type="standard"></div>
    </div>
  </div>
</section>