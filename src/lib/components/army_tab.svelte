<script>
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import CoreList from '$lib/components/core_list.svelte';
  import OptionList from '$lib/components/option_list.svelte';
  import army from '$lib/components/army.svelte.js';
</script>

<Accordion.Root type="single" value="core_list">
  <CoreList />

  {#each { length: army.gameSize['Option Lists'] }, index}
    <OptionList {index} />
  {/each}
</Accordion.Root>
