<script>
  import { Label } from '$lib/components/ui/label/index.js';
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import FACTIONS from '$lib/components/factions.svelte.js';
  import army from '$lib/components/army.svelte.js';
  import gameSizes from '$lib/json/game_sizes.json';
</script>

<Select.Root bind:value={army.gameSizeLabel} type="single">
  <Select.Trigger>{army.gameSizeLabel ? army.gameSizeLabel : 'Please select a game size…'}</Select.Trigger>

  <Select.Content>
    {#each Object.entries(gameSizes) as [gameSizeLabel]}
      <Select.Item value="{gameSizeLabel}">{gameSizeLabel}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>

<RadioGroup.Root bind:value={army.factionPath}>
  {#each Object.entries(FACTIONS) as [factionPath, faction]}
    <div>
      <RadioGroup.Item value={factionPath} id={`${faction.name}_faction_radio`} />
      <Label for={`${faction.name}_faction_radio`}>{faction.name}</Label>
    </div>
  {/each}
</RadioGroup.Root>
