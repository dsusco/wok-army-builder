<script>
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import Model from '$lib/components/model.svelte';
  import army from '$lib/components/army.svelte.js';

  let
    { type,
      totalRanks,
      ranksRemaining,
      optionList,
      accordionItemValue } = $props();
</script>

<Accordion.Item value={accordionItemValue}>
  <Accordion.Trigger>{type} {#if optionList === undefined}({army.rankSums[type]}/{totalRanks}){/if}</Accordion.Trigger>

  <Accordion.Content>
    {#each Object.values(army.models).filter((model) => model.type === type) as model}
      <Model {...model} ranksRemaining={ranksRemaining !== undefined ? ranksRemaining : totalRanks - army.rankSums[type]} {optionList} />
    {/each}
  </Accordion.Content>
</Accordion.Item>

<style lang="scss">
</style>
