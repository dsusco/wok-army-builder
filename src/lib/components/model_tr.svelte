<script>
  import army from '$lib/components/model_tr.svelte';

  let
    { name,
      rank,
      character,
      type,
      count } = $props();

</script>

<tr class={ [ { hidden: count < 1 } ] }>
  <td>{name}</td>
  <td>Rank {rank}{character ? ' Character ' : ''} {type}</td>
  <td>{count}</td>
</tr>

<style lang="scss">
  th,
  td {
    border: 1px solid;
  }

  th {
    text-transform: uppercase;
  }

  th,
  td {
    padding: .25em .5em;
  }

  td:last-child {
    text-align: right;
  }
</style>
