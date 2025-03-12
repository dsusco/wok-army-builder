<script>
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, ...restProps } = $props();
</script>

<TabsPrimitive.List
	bind:ref
	class={cn(
		"bg-primary text-primary-foreground inline-flex justify-center py-2",
		className
	)}
	{...restProps}
/>
