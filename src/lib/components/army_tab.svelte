<script>
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import CoreList from '$lib/components/core_list.svelte';
  import OptionList from '$lib/components/option_list.svelte';
  import army from '$lib/components/army.svelte.js';
</script>

<Accordion.Root type="single" value="core_list">
  <Accordion.Item value="core_list">
    <Accordion.Trigger>Core List</Accordion.Trigger>

    <Accordion.Content>
      <CoreList />
    </Accordion.Content>
  </Accordion.Item>

  {#each { length: army.gameSize['Option Lists'] }, index}
    <Accordion.Item value={`option_list_${index}`}>
      <Accordion.Trigger>Option List #{index + 1} (/{army.gameSize.Options / 3})</Accordion.Trigger>

      <Accordion.Content>
        <OptionList {index} />
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>
