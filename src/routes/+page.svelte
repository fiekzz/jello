<script lang="ts">
	import Features from '$lib/components/widgets/home/Features.svelte';
	import ProductBoost from '$lib/components/widgets/home/ProductBoost.svelte';
	import Seamless from '$lib/components/widgets/home/Seamless.svelte';
	import FAQ from '$lib/components/widgets/home/FAQ.svelte';
	import Footer from '$lib/components/widgets/home/Footer.svelte';
</script>

<svelte:head>
	<title>Jello</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen bg-hero-bg bg-cover bg-center bg-no-repeat">
	<div class="absolute inset-0 bg-black bg-opacity-40"></div>

	<nav class="relative z-[2] flex justify-between items-center px-4 md:px-8 py-6">
		<div class="text-2xl font-bold text-white font-recoleta">Jello</div>
		<ul class="flex list-none gap-4 md:gap-8 m-0 p-0">
			<li>
				<a href="/" class="text-white no-underline transition-opacity duration-300 hover:opacity-80"
					>Home</a
				>
			</li>
			<li>
				<a
					href="/pricing"
					class="text-white no-underline transition-opacity duration-300 hover:opacity-80"
					>Pricing</a
				>
			</li>
			<li>
				<a
					href="/sign-in"
					class="text-white no-underline bg-primary-orange px-4 py-2 rounded-md transition-all duration-300 hover:bg-primary-orange-light"
					>Login</a
				>
			</li>
		</ul>
	</nav>

	<div class="relative z-[1] flex flex-col min-h-[calc(100vh-80px)] px-4">
		<!-- Main content centered -->
		<div class="flex-1 flex items-center justify-center">
			<div class="text-center max-w-4xl">
				<h1 class="text-3xl md:text-6xl lg:text-6xl font-bold mb-6 leading-tight font-recoleta">
					The Most Rapid API-Powered Language Converter
				</h1>
				<p class="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
					Transform your applications with lightning-fast, AI-driven translation capabilities.
					Seamlessly integrate multilingual support and connect with global audiences instantly.
				</p>
				<button
					class="bg-primary-orange text-white px-6 py-2 rounded-md text-lg font-medium transition-all duration-300 hover:bg-primary-orange-light hover:transform hover:scale-105 shadow-lg"
				>
					Get Started
				</button>
			</div>
		</div>

		<!-- Scroll text positioned at bottom -->
		<div class="text-center mb-16">
			<p class="text-white text-sm opacity-60 animate-bounce">Scroll for more details</p>
		</div>
	</div>
</section>

<!-- All Other Sections as Components -->
<Features />
<ProductBoost />
<Seamless />
<FAQ />
<Footer />
