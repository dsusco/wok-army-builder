<script>
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import TypeGrouping from '$lib/components/type_grouping.svelte';
  import army from '$lib/components/army.svelte.js';
</script>

<Accordion.Root type="single" value={`type_grouping_${army.MODEL_TYPES[0]}`}>
  {#each Object.entries(army.gameSize).filter(([type]) => army.MODEL_TYPES.indexOf(type) >= 0) as [type, totalRanks]}
    <Accordion.Item value={`type_grouping_${type}`}>
      <Accordion.Trigger>{type} (/{totalRanks})</Accordion.Trigger>

      <Accordion.Content>
        <TypeGrouping {type} />
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>

<style lang="scss">
</style>
