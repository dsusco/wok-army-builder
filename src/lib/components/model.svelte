<script>
  import { getContext, onMount } from 'svelte';
  import { page } from '$app/state';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Dialog from "$lib/components/ui/dialog";
  import army from '$lib/components/army.svelte.js';

  const { setDialogModel } = getContext('dialogContext');

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

  onMount(() => {
    let params = Object.fromEntries(page.url.searchParams.entries());

    if (params.models) {
      let paramCounts = JSON.parse(params.models)[Object.keys(army.models).indexOf(name)];

      if (optionList === undefined) {
        setCount(paramCounts[0]);
      } else {
        setCount(paramCounts[optionList + 1]);
      }
    }
  });
</script>

<div class="flex items-center gap-1 space-y-1">
  <span class="basis-full overflow-x-hidden text-nowrap">
    {name}
    (Rank {rank}{character ? ' Character' : ''})
    <Dialog.Trigger onclick={() => setDialogModel(name)}>
      <span class="sr-only">Open {name} Card Dialog</span>
      <i class="fa fa-info-circle p-3 -ml-1"></i>
    </Dialog.Trigger>
  </span>
  <Button class="w-10" disabled={disableDecrement} onclick={() => setCount(count-1)}>-</Button>
  <span class="text-center w-10">{count}</span>
  <Button class="w-10" disabled={disableIncrement} onclick={() => setCount(count+1)}>+</Button>
</div>
