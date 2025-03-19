<script>
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
  td {
    border: 1px solid;
    padding: .25em .5em;

    &:last-child {
      text-align: right;
    }
  }
</style>
