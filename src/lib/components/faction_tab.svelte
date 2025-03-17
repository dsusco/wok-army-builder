<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import FACTIONS from '$lib/components/factions.svelte.js';
  import army from '$lib/components/army.svelte.js';
  import gameSizes from '$lib/json/game_sizes.json';

  function factionImgSrc(factionPath) {
    return factionPath
      .replace('/src/lib/json/factions', 'images')
      .replace('json', 'png');
  }

  onMount(() => {
    let params = Object.fromEntries(page.url.searchParams.entries());

    if (params.gameSize) army.gameSizeLabel = params.gameSize;
    if (params.faction) army.factionPath = `/src/lib/json/factions/${params.faction}.json`;
  });
</script>

<Select.Root bind:value={army.gameSizeLabel} type="single">
  <Select.Trigger class="max-w-xs mx-auto mb-3">{army.gameSizeLabel ? army.gameSizeLabel : 'Please select a game size…'}</Select.Trigger>

  <Select.Content>
    {#each Object.entries(gameSizes) as [gameSizeLabel]}
      <Select.Item value="{gameSizeLabel}">{gameSizeLabel}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>

<RadioGroup.Root class="max-w-sm mx-auto" bind:value={army.factionPath}>
  {#each Object.entries(FACTIONS) as [factionPath, faction]}
    <Label>
      <RadioGroup.Item class="sr-only peer" value={factionPath} />
      <img class="box-border bg-primary/10 border border-primary cursor-pointer p-2 hover:bg-secondary/40 peer-data-[state=checked]:bg-secondary/40 ring-ring ring-offset-background ring-offset-2 peer-focus:ring-2
      " alt={faction.name} src={factionImgSrc(factionPath)}>
    </Label>
  {/each}
</RadioGroup.Root>
