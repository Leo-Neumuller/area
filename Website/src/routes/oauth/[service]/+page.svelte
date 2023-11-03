<script>
  import {onMount} from "svelte";
  import {pushOauthData} from "../../../api/api";

  /** @type {import('./$types').PageData} */
  export let data;

  onMount(() => {
    pushOauthData(data.service, window.location.search).then((us) => {
      console.log(window.location.search)
      if (us.redirected) {
        window.location.href = us.url
      }
    })
  })

</script>

<h1 class="text-center">Loading...</h1>