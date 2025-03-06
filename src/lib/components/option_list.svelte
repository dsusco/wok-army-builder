<script>
  import army from '$lib/components/army.svelte.js';

  let
    { index } = $props();
</script>

<div class="list _option">
  <div class="title">Option List #{index + 1} (/{army.gameSize.Options / 3})</div>

  {#each Object.entries(army.gameSize).filter(([type]) => army.OPTION_TYPES.indexOf(type) >= 0) as [type, totalRanks]}
    {type} {index}
  {/each}
</div>

<style lang="scss">
</style>
