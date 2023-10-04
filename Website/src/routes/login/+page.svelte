<script lang="ts">
    import Button from "../../components/Button/+button.svelte";
    import { goto } from "$app/navigation";
    import login from "../../API/login";
    
    let email: string = "";
    let password: string = "";

    if (document.cookie.includes("token")) {
        goto("/dashboard");
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
    <div class="flex flex-col float-right bg-gray w-[30vw] rounded-[4vw] mt-[10vw] h-">
      <div class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw] text-customWhite text-[1.4vw]">
        <p class="self-start text-[1.4vw] text-customWhite">Email</p>
        <input bind:value={email} class="self-start w-full rounded-md bg-lightgray placeholder:pl-3 placeholder:text-[1.4vw] placeholder:text-ultralightgray h-[2.7vw]" placeholder="Email" />
      </div>
      <div class="flex flex-col items-center w-5/6 mx-auto pt-[2vw] gap-[1vw] text-customWhite text-[1.4vw]">
        <p class="self-start text-[1.4vw] text-customWhite">Password</p>
        <input type="password" bind:value={password} class="self-start w-full rounded-md bg-lightgray placeholder:pl-3 placeholder:text-[1.4vw] placeholder:text-ultralightgray h-[2.7vw]" placeholder="Password" />
      </div>
      <div class="self-center mt-auto mb-7 pt-[2vw]">
        <Button onClick={() => {
            Promise.resolve(login(email, password)).then((res) => {
                document.cookie = `token=${res.access_token}; path=/;`;
            });
        }}>
          <p>Se connecter</p>
        </Button>
      </div>
    </div>
  </div>
</section>