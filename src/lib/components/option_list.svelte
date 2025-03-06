<script>
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import TypeGrouping from '$lib/components/type_grouping.svelte';
  import army from '$lib/components/army.svelte.js';

  let
    { index } = $props();
</script>

<Accordion.Root type="single" value={`option_list_${index}_type_grouping_${army.OPTION_TYPES[0]}`}>
  {#each Object.entries(army.gameSize).filter(([type]) => army.OPTION_TYPES.indexOf(type) >= 0) as [type, totalRanks]}
    <Accordion.Item value={`option_list_${index}_type_grouping_${type}`}>
      <Accordion.Trigger>{type}</Accordion.Trigger>

      <Accordion.Content>
        <TypeGrouping {type} optionList={index} />
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>

<style lang="scss">
</style>
