<script>
	import { Dialog as DialogPrimitive } from "bits-ui";
	import X from "@lucide/svelte/icons/x";
	import * as Dialog from "./index.js";
	import { cn } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, portalProps, children, ...restProps } = $props();
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		bind:ref
		class={cn(
			"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] bg-background border-primary sm:rounded-lg h-fit p-6 grid gap-4 my-auto mx-auto fixed inset-0 z-50 w-[100dvw] sm:w-[90dvw] max-w-6xl shadow-lg duration-200",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		<DialogPrimitive.Close
			class="ring-offset-background focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
		>
			<X class="size-4" />
			<span class="sr-only">Close</span>
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
</Dialog.Portal>
