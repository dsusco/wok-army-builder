<script>
  import army from '$lib/components/army.svelte.js';
  import Model from '$lib/components/model.svelte';

  let
    { type,
      optionList } = $props();
</script>

{#each Object.values(army.models).filter((model) => model.type === type) as model}
  <Model {...model} {optionList} />
{/each}

<style lang="scss">
</style>
