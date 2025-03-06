<script>
  import CoreList from '$lib/components/core_list.svelte';
  import OptionList from '$lib/components/option_list.svelte';
  import army from '$lib/components/army.svelte.js';
</script>

<CoreList />

{#each { length: army.gameSize['Option Lists'] }, index}
  <OptionList {index} />
{/each}
