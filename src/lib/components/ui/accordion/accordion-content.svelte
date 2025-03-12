<script>
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, children, ...restProps } = $props();
</script>

<AccordionPrimitive.Content
	bind:ref
	class={cn(
		"border border-current rounded-b-md p-3 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all",
		className
	)}
	{...restProps}
>
	<div>
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>
