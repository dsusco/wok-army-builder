<script>
  import ModelTR from '$lib/components/model_tr.svelte';
  import army from '$lib/components/army.svelte.js';
</script>

<table>
  <tbody>
    <tr>
      <td><b>Player Name:</b></td>
      <td><b>Faction:</b> {army.faction.name}</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>Round</th>
      <th>Game Result</th>
      <th>Motivation</th>
      <th><abbr title="Leadership">LD</abbr> Points</th>
      <th>Rank Points</th>
      <th>Opponent</th>
    </tr>
  </thead>
  <tbody>
    {#each { length: 5 }, index }
      <tr>
        <td>{index + 1}</td>
        <td><abbr title="Win">W</abbr>/<abbr title="Loss">L</abbr>/<abbr title="Tie">T</abbr></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    {/each}
  </tbody>
</table>

<table>
  <caption>Core List</caption>
  <thead>
    <tr>
      <th>Model Name</th>
      <th>Type</th>
      <th>Quantity</th>
    </tr>
  </thead>

  {#each army.MODEL_TYPES as type}
    <tbody>
      {#each army.faction[type] as model}
        <ModelTR {...model} {type} count={army.models[model.name].counts.coreList} />
      {/each}
    </tbody>
  {/each}
</table>

{#each { length: army.gameSize['Option Lists'] }, index }
  <table>
    <caption>Option List #{index + 1}</caption>
    <thead>
      <tr>
        <th>Model Name</th>
        <th>Type</th>
        <th>Quantity</th>
      </tr>
    </thead>

    {#each army.OPTION_TYPES as type}
      <tbody>
        {#each army.faction[type] as model}
          <ModelTR {...model} {type} count={army.models[model.name].counts.optionLists[index]} />
        {/each}
      </tbody>
    {/each}
  </table>
{/each}
