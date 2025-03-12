<script>
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import { cn } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, level = 3, children, ...restProps } = $props();
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		bind:ref
		class={cn(
			"bg-primary ring-offset-background rounded-t-md px-4 py-3 text-primary-foreground font-bold flex flex-1 items-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-primary/90 data-[state=closed]:rounded-b-md hover:underline [&[data-state=open]>svg]:rotate-180",
			className
		)}
		{...restProps}
	>
		<ChevronDown class="size-4 shrink-0 transition-transform duration-200" />
		{@render children?.()}
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
