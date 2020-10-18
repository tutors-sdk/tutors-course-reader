<script lang="ts">
  import { onMount } from "svelte";
  import { logout } from "../../services/analytics/auth-service";

  onMount(async () => {
    logout();
  });
</script>

<div class="uk-text-center">
  <hr class="uk-divider-icon" />
  <div class="uk-heading-small">You have been logged out of Tutors</div>
  <hr class="uk-divider-icon" />
</div>
