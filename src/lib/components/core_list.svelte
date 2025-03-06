<script>
  import army from '$lib/components/army.svelte.js';
</script>

<div class="list _core">
  <div class="title">Core List</div>

  {#each Object.entries(army.gameSize).filter(([type]) => army.MODEL_TYPES.indexOf(type) >= 0) as [type, totalRanks]}
    {type} {totalRanks}
  {/each}
</div>

<style lang="scss">
</style>
