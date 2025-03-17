<script>
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import TypeGrouping from '$lib/components/type_grouping.svelte';
  import army from '$lib/components/army.svelte.js';

  let
    { index } = $props(),
    rankSums = $derived(`${Math.trunc(army.rankSums.optionLists[index] / 3)}~${army.rankSums.optionLists[index] % 3}`
      .replace('~0', '')
      .replace('~1', '⅓')
      .replace('~2', '⅔')
      .replace(/^0(.)/, "$1")),
    accordionValue = $state('faction');

  function getAccordionValue () {
    return accordionValue;
  }

  function setAccordionValue (newAccordionValue) {
    accordionValue = newAccordionValue;
  }

  $effect(() => {
    if (army.gameSizeLabel && army.factionPath) {
      setAccordionValue(`option_list_${index}_type_grouping_${army.OPTION_TYPES[0]}`);
    }
  });
</script>

<Accordion.Item value={`option_list_${index}`}>
  <Accordion.Trigger>
    <span class="basis-full px-2 text-left">Option List #{index + 1}</span>

    <span>({rankSums}/{army.gameSize.Options / 3})</span>
  </Accordion.Trigger>

  <Accordion.Content>
    <Accordion.Root type="single" bind:value={getAccordionValue, setAccordionValue}>
      {#each army.OPTION_TYPES as type}
        <TypeGrouping {type} ranksRemaining={army.gameSize.Options - army.rankSums.optionLists[index]} optionList={index} />
      {/each}
    </Accordion.Root>
  </Accordion.Content>
</Accordion.Item>
