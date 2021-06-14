<script>
</script>

<style global>
  @tailwind base;
  @tailwind components;

  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
  .tooltip .tooltip-text {
    @apply invisible p-1 absolute z-50 inline-block mt-12 text-sm rounded-lg border border-gray-900 bg-white text-gray-900;
  }

  .tooltip:hover .tooltip-text {
    @apply visible;
  }
  @tailwind utilities;
</style>
