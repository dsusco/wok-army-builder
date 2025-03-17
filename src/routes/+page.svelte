<script>
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import FactionTab from '$lib/components/faction_tab.svelte';
  import ArmyTab from '$lib/components/army_tab.svelte';
  import RecordSheetTab from '$lib/components/record_sheet_tab.svelte';
  import army from '$lib/components/army.svelte.js';

  let tabsValue = $state('faction');

  function getTabsValue () {
    return tabsValue;
  }

  function setTabsValue (newTabsValue) {
    tabsValue = newTabsValue;
  }

  $effect(() => {
    if (army.gameSizeLabel && army.factionPath) {
      setTabsValue('army');
    }
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<title>Wrath of Kings Army Builder</title>
</svelte:head>

<Dialog.Root>
  <Tabs.Root class="w-full" bind:value={getTabsValue, setTabsValue}>
    <Tabs.List class="w-full">
      <Tabs.Trigger value="faction">Faction</Tabs.Trigger>
      <Tabs.Trigger disabled={!army.gameSizeLabel || !army.factionPath} value="army">Army</Tabs.Trigger>
      <Tabs.Trigger disabled={!army.gameSizeLabel || !army.factionPath} value="record_sheet">Record Sheet</Tabs.Trigger>
    </Tabs.List>

    <div class="float-right">
      <Dialog.Trigger>
        <span class="sr-only">Share</span>
        <i class="fa fa-share p-2"></i>
      </Dialog.Trigger>
      <button>
        <span class="sr-only">Print</span>
        <i class="fa fa-print p-2"></i>
      </button>
    </div>

    <Tabs.Content value="faction">
      <FactionTab />
    </Tabs.Content>

    <Tabs.Content value="army">
      <ArmyTab />
    </Tabs.Content>

    <Tabs.Content value="record_sheet">
      {#if Object.keys(army.models).length > 0}
        <RecordSheetTab />
      {/if}
    </Tabs.Content>
  </Tabs.Root>

  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Description>
        <p class="mb-3">The following <abbr title="Uniform Resource Locator">URL</abbr> can be used to restore the current army you have built:</p>
        <Textarea class="border-primary mb-3" value={army.url} readonly spellcheck="false" rows="8" />
        <Button class="block mx-auto" variant="default" onclick={() => navigator.clipboard.writeText(army.url)}>Copy</Button>
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
