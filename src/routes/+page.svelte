<script>
  import * as Tabs from '$lib/components/ui/tabs/index.js';
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
	<title>Wrath of Kings Army Builder</title>
</svelte:head>

<Tabs.Root class="w-full" bind:value={getTabsValue, setTabsValue}>
  <Tabs.List class="w-full">
    <Tabs.Trigger value="faction">Faction</Tabs.Trigger>
    <Tabs.Trigger disabled={!army.gameSizeLabel || !army.factionPath} value="army">Army</Tabs.Trigger>
    <Tabs.Trigger disabled={!army.gameSizeLabel || !army.factionPath} value="record_sheet">Record Sheet</Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="faction">
    <FactionTab />
  </Tabs.Content>

  <Tabs.Content value="army">
    <ArmyTab />
  </Tabs.Content>

  <Tabs.Content value="record_sheet">
    <RecordSheetTab />
  </Tabs.Content>
</Tabs.Root>
