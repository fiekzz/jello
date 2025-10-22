<script lang="ts">
	import FontAwesome from '$lib/components/widgets/FontAwesome.svelte';
	import { faBolt, faKey, faCode, faRocket } from '$lib/components/widgets/icons/icons';
</script>

<!-- Product Boost Section -->
<section class="bg-dark-bg py-24 px-8">
	<div class="text-center max-w-2xl mx-auto mb-16">
		<div
			class="inline-flex items-center gap-2 bg-yellow-500 bg-opacity-10 text-yellow-500 px-4 py-2 rounded-full text-sm mb-6"
		>
			<FontAwesome iconDef={faBolt} size="18px" />
			How it works
		</div>
		<h2 class="text-4xl mb-4 font-bold font-recoleta">
			Everything you need to boost your products
		</h2>
		<p class="opacity-80 leading-relaxed">
			Streamline your development workflow with our comprehensive suite of translation tools, from
			simple text conversion to complex document processing and real-time chat translation.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
		<div
			class="relative bg-gradient-to-br from-[#121212] to-[#242424] rounded-xl p-[1px] transition-all duration-200 group"
		>
			<div class="absolute inset-0 bg-gradient-to-br from-[#242424] to-[#363636] rounded-xl"></div>
			<div
				class="relative bg-gradient-to-br from-[#121212] to-[#242424] rounded-xl p-8 text-center"
			>
				<div class="h-30 mb-6 flex items-center justify-center">
					<div
						class="w-20 h-20 bg-gradient-to-br from-primary-orange to-primary-orange-light rounded-full flex items-center justify-center"
					>
						<FontAwesome iconDef={faKey} size="2rem" color="white" />
					</div>
				</div>
				<h3 class="text-xl mb-3 font-semibold">Generate Your Key</h3>
				<p class="opacity-80 leading-relaxed text-sm">
					Create secure API keys instantly with customizable permissions and usage limits for your
					translation projects.
				</p>
			</div>
		</div>

		<div
			class="relative bg-gradient-to-br from-[#121212] to-[#242424] rounded-xl p-[1px] transition-all duration-200 group"
		>
			<div class="absolute inset-0 bg-gradient-to-br from-[#242424] to-[#363636] rounded-xl"></div>
			<div
				class="relative bg-gradient-to-br from-[#121212] to-[#242424] rounded-xl p-8 text-center"
			>
				<div class="h-30 mb-6 flex items-center justify-center">
					<div
						class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center"
					>
						<FontAwesome iconDef={faCode} size="2rem" color="white" />
					</div>
				</div>
				<h3 class="text-xl mb-3 font-semibold">Request JSON Code</h3>
				<p class="opacity-80 leading-relaxed text-sm">
					Send translation requests with simple JSON payloads and receive accurate results in
					real-time with detailed metadata.
				</p>
			</div>
		</div>

		<div
			class="relative bg-gradient-to-br from-[#121212] to-[#242424] rounded-xl p-[1px] transition-all duration-200 group"
		>
			<div class="absolute inset-0 bg-gradient-to-br from-[#242424] to-[#363636] rounded-xl"></div>
			<div
				class="relative bg-gradient-to-br from-[#121212] to-[#242424] rounded-xl p-8 text-center"
			>
				<div class="h-30 mb-6 flex items-center justify-center">
					<div
						class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center"
					>
						<FontAwesome iconDef={faRocket} size="2rem" color="white" />
					</div>
				</div>
				<h3 class="text-xl mb-3 font-semibold">Implement In Your Product</h3>
				<p class="opacity-80 leading-relaxed text-sm">
					Integrate seamlessly with comprehensive SDKs, detailed documentation, and 24/7 developer
					support for rapid deployment.
				</p>
			</div>
		</div>
	</div>
</section>
