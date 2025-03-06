<script>
  import army from '$lib/components/army.svelte.js';
  import TypeGrouping from '$lib/components/type_grouping.svelte';

  let
    { index } = $props();
</script>

<div class="list _option">
  <div class="title">Option List #{index + 1} (/{army.gameSize.Options / 3})</div>

  {#each Object.entries(army.gameSize).filter(([type]) => army.OPTION_TYPES.indexOf(type) >= 0) as [type, totalRanks]}
    <TypeGrouping {type} optionList={index} />
  {/each}
</div>

<style lang="scss">
</style>
