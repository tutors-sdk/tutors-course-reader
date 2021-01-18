<script>
  export let color = "#4A5568"
  export let stroke = color
  export let filled = false
  export let fill = filled ? color : 'none'
  export let size = '1em' // default 1em match the parent element
  // default heart icon
  export let d = "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
</script>

<svg class="icon" viewBox='0 0 24 24' {fill} width={size} height={size} xmlns="http://www.w3.org/2000/svg">
  <path {d} {stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<style>
  .icon{
    position: relative;
    display: inline-block;
  }
</style>
