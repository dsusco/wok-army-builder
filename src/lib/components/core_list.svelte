<script>
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import TypeGrouping from '$lib/components/type_grouping.svelte';
  import army from '$lib/components/army.svelte.js';
</script>

<Accordion.Item value="core_list">
  <Accordion.Trigger>Core List</Accordion.Trigger>

  <Accordion.Content>
    <Accordion.Root type="single" value={`type_grouping_${army.MODEL_TYPES[0]}`}>
      {#each Object.entries(army.gameSize).filter(([type]) => army.MODEL_TYPES.indexOf(type) >= 0) as [type, totalRanks]}
        <TypeGrouping {type} {totalRanks} accordionItemValue={`type_grouping_${type}`} />
      {/each}
    </Accordion.Root>
  </Accordion.Content>
</Accordion.Item>

<style lang="scss">
</style>
