<script lang="ts">
	import FontAwesome from '$lib/components/widgets/FontAwesome.svelte';
	import { faExternalLinkAlt, faTwitter, faDiscord } from '$lib/components/widgets/icons/icons';
</script>

<!-- Footer -->
<footer class="bg-darker-bg py-12 px-8">
	<div class="max-w-6xl mx-auto">
		<div
			class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 md:gap-0"
		>
			<div>
				<h3 class="mb-2 text-2xl font-bold font-recoleta">Jello</h3>
				<p class="opacity-70 m-0">Simplify your way to translating today!</p>
			</div>
			<div class="flex gap-8">
				<a
					href="/"
					class="text-white no-underline opacity-70 transition-opacity duration-300 hover:opacity-100 inline-flex items-baseline gap-1"
				>
					<span>Home</span>
					<FontAwesome iconDef={faExternalLinkAlt} size="12px" className="translate-y-[-1px]" />
				</a>
				<a
					href="/pricing"
					class="text-white no-underline opacity-70 transition-opacity duration-300 hover:opacity-100 inline-flex items-baseline gap-1"
				>
					<span>Pricing</span>
					<FontAwesome iconDef={faExternalLinkAlt} size="12px" className="translate-y-[-1px]" />
				</a>
				<a
					href="/examples"
					class="text-white no-underline opacity-70 transition-opacity duration-300 hover:opacity-100 inline-flex items-baseline gap-1"
				>
					<span>Examples</span>
					<FontAwesome iconDef={faExternalLinkAlt} size="12px" className="translate-y-[-1px]" />
				</a>
			</div>
		</div>

		<!-- Bottom Row: Rights Reserved + Social Links -->
		<div
			class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white border-opacity-10 gap-4 md:gap-0"
		>
			<p class="opacity-50 text-sm">Jello All Rights Reserved</p>
			<div class="flex gap-6">
				<a
					href="#"
					class="text-white no-underline opacity-70 transition-opacity duration-300 hover:opacity-100 inline-flex items-center gap-2"
				>
					<FontAwesome iconDef={faTwitter} size="18px" className="flex-shrink-0" />
					<span class="leading-none">Twitter</span>
				</a>
				<a
					href="#"
					class="text-white no-underline opacity-70 transition-opacity duration-300 hover:opacity-100 inline-flex items-center gap-2"
				>
					<FontAwesome iconDef={faDiscord} size="18px" className="flex-shrink-0" />
					<span class="leading-none">Discord</span>
				</a>
			</div>
		</div>
	</div>
</footer>
