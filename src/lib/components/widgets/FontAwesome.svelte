<script lang="ts">
	import { icon, type IconDefinition } from '@fortawesome/fontawesome-svg-core';

	export let iconDef: IconDefinition;
	export let size: string = '1em';
	export let color: string = 'currentColor';
	export let className: string = '';

	$: iconSvg = icon(iconDef);
	$: svgString = iconSvg ? iconSvg.html[0] : '';
</script>

<span class="inline-block {className}" style="width: {size}; height: {size}; color: {color};">
	{@html svgString}
</span>

<style>
	span :global(svg) {
		width: 100%;
		height: 100%;
		fill: currentColor;
	}
</style>
