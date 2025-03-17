<script>
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import CoreList from '$lib/components/core_list.svelte';
  import OptionList from '$lib/components/option_list.svelte';
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
      setAccordionValue('core_list');
    }
  });
</script>

<Accordion.Root class="max-w-[45rem] mx-auto" type="single" bind:value={getAccordionValue, setAccordionValue}>
  <CoreList />

  {#each { length: army.gameSize['Option Lists'] }, index}
    <OptionList {index} />
  {/each}
</Accordion.Root>
