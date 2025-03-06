<script>
  import army from '$lib/components/army.svelte.js';

  let
    { type,
      optionList } = $props();
</script>

{#each Object.values(army.models).filter((model) => model.type === type) as model}
  {model.name} {optionList}
{/each}

<style lang="scss">
</style>
