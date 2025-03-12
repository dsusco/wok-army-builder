<script>
  import { Button } from '$lib/components/ui/button/index.js';
  import army from '$lib/components/army.svelte.js';

  let
    { name,
      rank,
      character,
      type,
      counts,
      ranksRemaining,
      optionList } = $props(),
    count = $derived.by(() => {
      if (optionList === undefined) {
        return counts.coreList;
      } else {
        return counts.optionLists[optionList];
      }
    }),
    disableDecrement = $derived.by(() => {
      // don't go negative
      if (count < 1) return true;

      return false;
    }),
    disableIncrement = $derived.by(() => {
      // no more than one of each character
      if (character) {
        if (optionList === undefined) {
          // the core list can't add a character if an option list has it
          if (count > 0 || counts.optionLists.some((count) => count > 0)) return true;
        } else {
          // an option list can't add a character if the core list has it
          if (count > 0 || counts.coreList > 0) return true;
        }
      }

      // don't exceed allotted ranks
      if (type === 'Specialist' && optionList !== undefined) {
        if (rank * 3 > ranksRemaining) return true;
      } else {
        if (rank > ranksRemaining) return true;
      }

      return false;
    });

  function setCount (newCount) {
    // don't go negative
    newCount = Math.max(0, newCount);

    // don't exceed allotted ranks
    if (type === 'Specialist' && optionList !== undefined) {
      if ((newCount - count) * rank * 3 > ranksRemaining) newCount = Math.floor(ranksRemaining / (rank * 3));
    } else {
      if ((newCount - count) * rank > ranksRemaining) newCount = Math.floor(ranksRemaining / rank);
    }

    // no more than one of each character
    if (character && newCount > 1) newCount = 1;

    if (optionList === undefined) {
      counts.coreList = newCount;
    } else {
      counts.optionLists[optionList] = newCount;
    }
  }
</script>

<div class="flex items-center gap-1 space-y-1">
  <span class="basis-full">{name} (Rank {rank}{character ? ' Character' : ''})</span>
  <Button class="w-10" disabled={disableDecrement} onclick={() => setCount(count-1)}>-</Button>
  <span class="text-center w-10">{count}</span>
  <Button class="w-10" disabled={disableIncrement} onclick={() => setCount(count+1)}>+</Button>
</div>

<style lang="scss">
</style>
