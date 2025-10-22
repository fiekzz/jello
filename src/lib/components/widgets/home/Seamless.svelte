<script lang="ts">
	import FontAwesome from '$lib/components/widgets/FontAwesome.svelte';
	import { faBolt } from '$lib/components/widgets/icons/icons';
</script>

<!-- Seamless Section -->
<section class="bg-dark-bg py-24 px-8 text-center">
	<div class="mb-6 flex justify-center">
		<div
			class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
		>
			<FontAwesome iconDef={faBolt} size="2.5rem" color="white" />
		</div>
	</div>
	<h2 class="text-4xl mb-4 font-bold font-recoleta">
		Seamless and super fast with our <span class="text-primary-orange">Jello</span>
	</h2>
	<p class="opacity-80 text-lg">
		Experience the power of advanced AI-driven translation technology trusted by thousands of
		developers worldwide.
	</p>
</section>
