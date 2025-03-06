<script>
  import army from '$lib/components/army.svelte.js';

  let
    { type,
      totalRanks,
      ranksRemaining,
      optionList } = $props();
</script>

<div class="type_grouping">
  <div class="title">{type} {#if optionList === undefined}(/{totalRanks}){/if}</div>

  {#each Object.values(army.models).filter((model) => model.type === type) as model}
    {model.name} {optionList}
  {/each}
</div>

<style lang="scss">
</style>
