<script lang="ts">
    import AppPres from "../components/AppPres/+AppPres.svelte";
    import AppSpotlight from "../components/AppSpotlight/+AppSpotlight.svelte";

    import Instagram from "../components/SVGs/+Instagram.svelte";
    import { browser } from '$app/environment';

    import Bougy from "../lib/images/test.gif";
    import Reactact from "../lib/images/reactAct.png";
    import Connect from "../lib/images/Connect.png";
    import Timesave from "../lib/images/TimeSave.png";

    import {goto} from "$app/navigation";
    import Icon from "../components/Icon/+Icon.svelte";

    if (browser) {
        if (document.cookie.includes("token")) {
            goto("/dashboard");
        }
    }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="AREA"/>
</svelte:head>


<section class="font-SpaceGrotesk overflow-x-hidden flex flex-col justify-center items-center">
  <div class="flex justify-center items-center w-full bg-gray px-10 pb-4">
    <div class="w-full flex justify-center">
      <img src={Bougy} alt="area-bougy" class="w-[30vw]">
    </div>
    <div class="flex flex-col gap-10 w-full justify-center items-center">
      <h1 class="font-bold text-[4.4vw] text-customWhite">
        <p class="text-center">Commencez à automatiser votre quotidien</p>
      </h1>
      <div class="flex gap-6">
        <button data-testid="register" on:click={() => {
                goto('/register');
            }}>
          <nav>
            <ul>
              <li
                class="font-SpaceGrotesk font-semibold flex rounded-3xl px-6 py-4 align-middle items-center justify-center text-[1.6vw] uppercase">
                S'inscrire
                <span></span><span></span><span></span><span></span>
              </li>
            </ul>
          </nav>
        </button>
        <button data-testid="login" on:click={() => {
                    goto('/login');
                }}>
          <nav>
            <ul>
              <li
                class="font-SpaceGrotesk font-semibold flex rounded-3xl px-6 py-4 align-middle items-center justify-center text-[1.6vw] uppercase">
                Se connecter
                <span></span><span></span><span></span><span></span>
              </li>
            </ul>
          </nav>
        </button>
      </div>
    </div>
  </div>
  <section class="py-10">
    <div class="flex">
      {#each {length: 4} as _, index (index)}
        <section class="scrolling-text-title">
          <div>
            <AppSpotlight name="Gmail">
              <Icon className="w-[2.3vw] h-[2.3vw]" name="Gmail"/>
            </AppSpotlight>
          </div>
          <div>
            <AppSpotlight name="Weather">
              <Icon className="w-[2.3vw] h-[2.3vw]" name="Weather"/>
            </AppSpotlight>
          </div>
          <div>
            <AppSpotlight name="Down Detector">
              <Icon className="w-[2.3vw] h-[2.3vw]" name="Down Detector"/>
            </AppSpotlight>
          </div>
          <div>
            <AppSpotlight name="Google Calendar">
              <Icon className="w-[2.3vw] h-[2.3vw]" name="Google Calendar"/>
            </AppSpotlight>
          </div>
        </section>
      {/each}
    </div>
  </section>
  <div class="flex flex-col gap-[8vw] border-t border-gray pt-20">
    <AppPres image={Reactact} buttonText="Explorer les flux" hideButton={false} onClick={() => {}}
             title="Créez des fluxs d'automatisation personalisés"
             text="Automatisez les taches fastidieuses pour vous concentrer sur le travail qui compte vraiment avec les fluxs."/>
    <AppPres image={Connect} buttonText="Catalogue d'applications" hideButton={false} onClick={() => {}}
             title="Un large nombre d'applications à interconnecter"
             text="Un grand nombre de services disponibles pour répondre à tous vos besoins."/>
    <AppPres image={Timesave} hideButton onClick={() => {}} buttonText="  "
             title="Optimisez votre quotidien et les tâches redondantes"
             text="Fini les tâches répétitives à réaliser tous les jours, développez vos fluxs."/>
  </div>
</section>

<style lang="postcss">
    :global(html) {
        background-color: "#F3F3F3";
    }
</style>
