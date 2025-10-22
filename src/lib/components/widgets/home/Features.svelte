<script lang="ts">
	// import FontAwesome from '$lib/FontAwesome.svelte';
    import FontAwesome from '$lib/components/widgets/FontAwesome.svelte'
	import { faTerminal, faBolt, faTachometerAlt } from '$lib/components/widgets/icons/icons';
</script>

<!-- Features Section -->
<section class="bg-dark-bg py-24 px-8">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<!-- Section Header -->
			<div
				class="inline-flex items-center gap-2 bg-primary-orange bg-opacity-10 text-primary-orange px-4 py-2 rounded-full text-sm mb-6 font-medium"
			>
				<FontAwesome iconDef={faBolt} size="18px" />
				Features
			</div>
			<h2 class="text-4xl md:text-5xl font-bold font-recoleta mb-6">Why Choose Jello</h2>
			<p class="text-gray-400 text-lg max-w-2xl mx-auto">
				Discover the powerful features that make our language converter the fastest and most
				reliable solution for your global communication needs.
			</p>
		</div>

		<!-- Feature Cards Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- Feature 1: Full Customization -->
			<div
				class="group relative bg-gradient-to-br from-primary-orange/10 via-primary-orange-light/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary-orange/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-orange/10"
			>
				<div
					class="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				></div>
				<div class="relative z-10 flex items-center space-x-4">
					<!-- Icon Container -->
					<div
						class="w-12 h-12 bg-gradient-to-br from-primary-orange to-primary-orange-light rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
					>
						<FontAwesome iconDef={faTerminal} size="1.5rem" color="white" />
					</div>
					<div>
						<h3
							class="text-lg font-bold mb-2 group-hover:text-primary-orange transition-colors duration-300"
						>
							Full Customization
						</h3>
						<p class="text-gray-400 text-sm leading-relaxed">
							Tailor every aspect of the translation process to match your specific requirements.
						</p>
					</div>
				</div>
			</div>

			<!-- Feature 2: High Speed Experience -->
			<div
				class="group relative bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary-orange/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-orange/10"
			>
				<div
					class="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				></div>
				<div class="relative z-10 flex items-center space-x-4">
					<!-- Icon Container -->
					<div
						class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
					>
						<FontAwesome iconDef={faBolt} size="1.5rem" color="white" />
					</div>
					<div>
						<h3
							class="text-lg font-bold mb-2 group-hover:text-primary-orange transition-colors duration-300"
						>
							Lightning Fast
						</h3>
						<p class="text-gray-400 text-sm leading-relaxed">
							Experience blazing-fast translation speeds with optimized infrastructure.
						</p>
					</div>
				</div>
			</div>

			<!-- Feature 3: Interactive Dashboard -->
			<div
				class="group relative bg-gradient-to-br from-green-500/10 via-green-400/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary-orange/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-orange/10"
			>
				<div
					class="absolute inset-0 bg-gradient-to-br from-primary-orange/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				></div>
				<div class="relative z-10 flex items-center space-x-4">
					<!-- Icon Container -->
					<div
						class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
					>
						<FontAwesome iconDef={faTachometerAlt} size="1.5rem" color="white" />
					</div>
					<div>
						<h3
							class="text-lg font-bold mb-2 group-hover:text-primary-orange transition-colors duration-300"
						>
							Interactive Dashboard
						</h3>
						<p class="text-gray-400 text-sm leading-relaxed">
							Monitor usage, track metrics, and manage projects from one interface.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
