<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import { setupRepo } from "./repo";
  setupRepo();
</script>

<Router {routes} />
