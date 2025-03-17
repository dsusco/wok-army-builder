<script>
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, ...restProps } = $props();
</script>

<TabsPrimitive.Content
	bind:ref
	class={cn(
		"pb-3 px-3 ring-offset-background focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 clear-right",
		className
	)}
	{...restProps}
/>
