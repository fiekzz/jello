<script lang="ts">
	import FontAwesome from '$lib/components/widgets/FontAwesome.svelte';
	import { faQuestionCircle, faChevronDown } from '$lib/components/widgets/icons/icons';

	let openFaqs = [false, false, false, false, false, false];

	function toggleFaq(index: number) {
		openFaqs[index] = !openFaqs[index];
	}
</script>

<!-- FAQ Section -->
<section class="bg-dark-bg py-24 px-8">
	<div class="text-center max-w-2xl mx-auto mb-12">
		<div
			class="inline-flex items-center gap-2 bg-yellow-500 bg-opacity-10 text-yellow-500 px-4 py-2 rounded-full text-sm mb-6"
		>
			<FontAwesome iconDef={faQuestionCircle} size="18px" />
			FAQ
		</div>
		<h2 class="text-4xl mb-4 font-bold">Frequently ask questions</h2>
		<p class="opacity-80 leading-relaxed">
			Get answers to common questions about our translation API, implementation, and pricing
			structure.
		</p>
	</div>

	<div class="max-w-4xl mx-auto">
		<div class="border-b border-white border-opacity-10 mb-4">
			<div
				class="flex justify-between items-center py-6 cursor-pointer text-lg hover:text-primary-orange transition-colors duration-200"
				on:click={() => toggleFaq(0)}
			>
				<span>How fast is the translation API?</span>
				<div
					class="transition-transform duration-500 ease-in-out flex items-center justify-center {openFaqs[0]
						? 'rotate-180'
						: ''}"
				>
					<FontAwesome iconDef={faChevronDown} size="1rem" className="opacity-70" />
				</div>
			</div>
			<div
				class="overflow-hidden transition-all duration-500 ease-in-out {openFaqs[0]
					? 'max-h-40 opacity-100'
					: 'max-h-0 opacity-0'}"
			>
				<div class="pb-6 text-gray-400 leading-relaxed">
					<p>
						Our API delivers lightning-fast translations with an average response time of under
						200ms. We use optimized infrastructure and smart caching to ensure your applications
						maintain peak performance.
					</p>
				</div>
			</div>
		</div>
		<div class="border-b border-white border-opacity-10 mb-4">
			<div
				class="flex justify-between items-center py-6 cursor-pointer text-lg hover:text-primary-orange transition-colors duration-200"
				on:click={() => toggleFaq(1)}
			>
				<span>What languages are supported?</span>
				<div
					class="transition-transform duration-500 ease-in-out flex items-center justify-center {openFaqs[1]
						? 'rotate-180'
						: ''}"
				>
					<FontAwesome iconDef={faChevronDown} size="1rem" className="opacity-70" />
				</div>
			</div>
			<div
				class="overflow-hidden transition-all duration-500 ease-in-out {openFaqs[1]
					? 'max-h-40 opacity-100'
					: 'max-h-0 opacity-0'}"
			>
				<div class="pb-6 text-gray-400 leading-relaxed">
					<p>
						We support over 100 languages including all major world languages like English, Spanish,
						French, German, Chinese, Japanese, Arabic, and many more. Our language detection
						automatically identifies source languages.
					</p>
				</div>
			</div>
		</div>
		<div class="border-b border-white border-opacity-10 mb-4">
			<div
				class="flex justify-between items-center py-6 cursor-pointer text-lg hover:text-primary-orange transition-colors duration-200"
				on:click={() => toggleFaq(2)}
			>
				<span>How accurate are the translations?</span>
				<div
					class="transition-transform duration-500 ease-in-out flex items-center justify-center {openFaqs[2]
						? 'rotate-180'
						: ''}"
				>
					<FontAwesome iconDef={faChevronDown} size="1rem" className="opacity-70" />
				</div>
			</div>
			<div
				class="overflow-hidden transition-all duration-500 ease-in-out {openFaqs[2]
					? 'max-h-40 opacity-100'
					: 'max-h-0 opacity-0'}"
			>
				<div class="pb-6 text-gray-400 leading-relaxed">
					<p>
						Our AI-powered translation engine achieves 95%+ accuracy for most language pairs. We
						continuously train our models on diverse datasets and offer context-aware translations
						for better results.
					</p>
				</div>
			</div>
		</div>
		<div class="border-b border-white border-opacity-10 mb-4">
			<div
				class="flex justify-between items-center py-6 cursor-pointer text-lg hover:text-primary-orange transition-colors duration-200"
				on:click={() => toggleFaq(3)}
			>
				<span>What pricing plans are available?</span>
				<div
					class="transition-transform duration-500 ease-in-out flex items-center justify-center {openFaqs[3]
						? 'rotate-180'
						: ''}"
				>
					<FontAwesome iconDef={faChevronDown} size="1rem" className="opacity-70" />
				</div>
			</div>
			<div
				class="overflow-hidden transition-all duration-500 ease-in-out {openFaqs[3]
					? 'max-h-40 opacity-100'
					: 'max-h-0 opacity-0'}"
			>
				<div class="pb-6 text-gray-400 leading-relaxed">
					<p>
						We offer flexible pay-as-you-use pricing starting at $0.02 per 1,000 characters. Volume
						discounts are available for enterprise customers, with custom plans for high-volume
						usage.
					</p>
				</div>
			</div>
		</div>
		<div class="border-b border-white border-opacity-10 mb-4">
			<div
				class="flex justify-between items-center py-6 cursor-pointer text-lg hover:text-primary-orange transition-colors duration-200"
				on:click={() => toggleFaq(4)}
			>
				<span>Can I change or cancel my subscription anytime?</span>
				<div
					class="transition-transform duration-500 ease-in-out flex items-center justify-center {openFaqs[4]
						? 'rotate-180'
						: ''}"
				>
					<FontAwesome iconDef={faChevronDown} size="1rem" className="opacity-70" />
				</div>
			</div>
			<div
				class="overflow-hidden transition-all duration-500 ease-in-out {openFaqs[4]
					? 'max-h-40 opacity-100'
					: 'max-h-0 opacity-0'}"
			>
				<div class="pb-6 text-gray-400 leading-relaxed">
					<p>
						Yes! You have complete flexibility with your subscription. You can upgrade, downgrade,
						or cancel your plan at any time through your Settings page. Changes take effect
						immediately, and you'll only be charged for what you use.
					</p>
				</div>
			</div>
		</div>
		<div class="border-b border-white border-opacity-10 mb-4">
			<div
				class="flex justify-between items-center py-6 cursor-pointer text-lg hover:text-primary-orange transition-colors duration-200"
				on:click={() => toggleFaq(5)}
			>
				<span>How do I integrate the API?</span>
				<div
					class="transition-transform duration-500 ease-in-out flex items-center justify-center {openFaqs[5]
						? 'rotate-180'
						: ''}"
				>
					<FontAwesome iconDef={faChevronDown} size="1rem" className="opacity-70" />
				</div>
			</div>
			<div
				class="overflow-hidden transition-all duration-500 ease-in-out {openFaqs[5]
					? 'max-h-40 opacity-100'
					: 'max-h-0 opacity-0'}"
			>
				<div class="pb-6 text-gray-400 leading-relaxed">
					<p>
						Integration is simple with our RESTful API and comprehensive SDKs for popular
						programming languages. Complete documentation, code examples, and 24/7 developer support
						ensure smooth implementation.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
