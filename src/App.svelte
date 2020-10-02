<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import MainNavigator from "./elements/navigators/MainNavigator.svelte";
  import { getDefaultTitleProps, setupRepo } from "./repo";
  setupRepo();
  let titleProps = getDefaultTitleProps();
  function routeEvent(event) {
    titleProps = event.detail;
  }
</script>

<MainNavigator {titleProps} />
<Router {routes} on:routeEvent={routeEvent} />
