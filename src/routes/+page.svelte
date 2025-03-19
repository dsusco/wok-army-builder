<script>
  import { setContext } from 'svelte';
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import LibraryTab from '$lib/components/library_tab.svelte';
  import FactionTab from '$lib/components/faction_tab.svelte';
  import ArmyTab from '$lib/components/army_tab.svelte';
  import RecordSheetTab from '$lib/components/record_sheet_tab.svelte';
  import army from '$lib/components/army.svelte.js';

  let
    tabsValue = $state('faction'),
    dialogModel = $state({});

  function getTabsValue () {
    return tabsValue;
  }

  function setTabsValue (newTabsValue) {
    tabsValue = newTabsValue;
  }

  function setDialogModel (modelName = '') {
    dialogModel = army.models[modelName];
  }

  $effect(() => {
    if (army.gameSizeLabel && army.factionPath) {
      setTabsValue('army');
    }
  });

  setContext('dialogContext', { setDialogModel });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <title>Wrath of Kings Army Builder</title>
</svelte:head>

<Dialog.Root>
  <Tabs.Root class="w-full" bind:value={getTabsValue, setTabsValue}>
    <Tabs.List id="nav" class="w-full">
      <Tabs.Trigger value="library">Library</Tabs.Trigger>
      <Tabs.Trigger value="faction">Faction</Tabs.Trigger>
      <Tabs.Trigger disabled={!army.initialized} value="army">Army</Tabs.Trigger>
      <Tabs.Trigger disabled={!army.initialized} value="record_sheet">Record Sheet</Tabs.Trigger>
    </Tabs.List>

    <div id="actions" class="float-right">
      <Dialog.Trigger onclick={() => setDialogModel()}>
        <span class="sr-only">Share</span>
        <i class="fa fa-share p-2"></i>
      </Dialog.Trigger>
      <button onclick={window.print()}>
        <span class="sr-only">Print</span>
        <i class="fa fa-print p-2"></i>
      </button>
    </div>

    <Tabs.Content id="library_tab" value="library">
      <LibraryTab />
    </Tabs.Content>

    <Tabs.Content id="faction_tab" value="faction">
      <FactionTab />
    </Tabs.Content>

    <Tabs.Content id="army_tab" value="army">
      <ArmyTab />
    </Tabs.Content>

    <Tabs.Content id="record_sheet_tab" value="record_sheet">
      <RecordSheetTab />
    </Tabs.Content>
  </Tabs.Root>

  <Dialog.Content>
    {#if dialogModel === undefined}
      <p class="mb-3">The following <abbr title="Uniform Resource Locator">URL</abbr> can be used to restore the current army you have built:</p>
      <Textarea class="border-primary mb-3" value={army.url} readonly spellcheck="false" rows="8" />
      <Button class="block mx-auto" variant="default" onclick={() => navigator.clipboard.writeText(army.url)}>Copy</Button>
    {:else}
      <img class="mx-auto" alt={dialogModel.name} src={dialogModel.cardPath} style="max-height:calc(90dvh - 4.5rem)">
    {/if}
  </Dialog.Content>
</Dialog.Root>

<style lang="scss">
  @media print {
    @page {
      size: auto;
    }

    :global(body) {
      background-color: #fff;
    }

    :global(
      #header,
      #nav,
      #actions,
      #library_tab,
      #faction_tab,
      #army_tab,
      #footer
    ) {
      display: none;
    }

    :global(#record_sheet_tab) {
      color: #000;
      display: block !important;
      margin: 0;
      padding: 0;
    }
  }
</style>
