<script>
  import ModelTR from '$lib/components/model_tr.svelte';
  import army from '$lib/components/army.svelte.js';
</script>

<div class="overflow-x-auto">
  <table>
    <caption>Conquest of Kings Record Sheet</caption>
    <tbody>
      <tr>
        <td><b>Player Name:</b></td>
        <td><b>Faction:</b> {army.faction.name}</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="overflow-x-auto">
  <table class="text-center">
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
</div>

<div class="overflow-x-auto">
  <table>
    <caption>Core List</caption>
    <thead>
      <tr>
        <th>Model Name</th>
        <th>Type</th>
        <th>Quantity</th>
      </tr>
    </thead>

    {#if army.initialized}
      {#each army.MODEL_TYPES as type (type)}
        <tbody>
          {#each army.faction[type] as model (model.name)}
            <ModelTR {...model} {type} count={army.models[model.name].counts.coreList} />
          {/each}
        </tbody>
      {/each}
    {/if}
  </table>
</div>

{#each { length: army.gameSize['Option Lists'] }, index }
  <div class="overflow-x-auto">
    <table>
      <caption>Option List #{index + 1}</caption>
      <thead>
        <tr>
          <th>Model Name</th>
          <th>Type</th>
          <th>Quantity</th>
        </tr>
      </thead>

      {#if army.initialized}
        {#each army.OPTION_TYPES as type (type)}
          <tbody>
            {#each army.faction[type] as model (model.name)}
              <ModelTR {...model} {type} count={army.models[model.name].counts.optionLists[index]} />
            {/each}
          </tbody>
        {/each}
      {/if}
    </table>
  </div>
{/each}

<style lang="scss">
  table {
    font-size: calc(14em/16);
    margin: 0 auto 1rem;
    table-layout: fixed;
    width: 45rem;
  }

  caption {
    font-size: 1rem;
    font-weight: bold;
    padding-block: .25em;
    text-transform: uppercase;
  }

  thead {
    border-bottom: 2px solid;
  }

  tbody + tbody {
    border-top: 2px solid;
  }

  th,
  td {
    border: 1px solid;
    padding: .25em .5em;
  }

  th {
    text-transform: uppercase;
  }

  @media print {
    table {
      width: 100%;
    }
  }
</style>
