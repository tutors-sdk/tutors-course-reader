<script lang="ts">
  import { onMount } from "svelte";
  import { logout } from "tutors-reader-lib/src/utils/auth-utils";

  onMount(async () => {
    logout();
  });
</script>

<div class="container mx-auto text-center mt-8">
  <div>You have been logged out of Tutors</div>
</div>
