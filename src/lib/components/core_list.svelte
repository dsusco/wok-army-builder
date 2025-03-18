<script>
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import TypeGrouping from '$lib/components/type_grouping.svelte';
  import army from '$lib/components/army.svelte.js';

  let accordionValue = $state('faction');

  function getAccordionValue () {
    return accordionValue;
  }

  function setAccordionValue (newAccordionValue) {
    accordionValue = newAccordionValue;
  }

  $effect(() => {
    if (army.gameSizeLabel && army.factionPath) {
      setAccordionValue(`type_grouping_${army.MODEL_TYPES[0]}`);
    }
  });
</script>

<Accordion.Item value="core_list">
  <Accordion.Trigger>
    <span class="basis-full px-2 text-left">Core List</span>
  </Accordion.Trigger>

  <Accordion.Content>
    <Accordion.Root type="single" bind:value={getAccordionValue, setAccordionValue}>
      {#each army.MODEL_TYPES as type (type)}
        <TypeGrouping {type} totalRanks={army.gameSize[type]} />
      {/each}
    </Accordion.Root>
  </Accordion.Content>
</Accordion.Item>
