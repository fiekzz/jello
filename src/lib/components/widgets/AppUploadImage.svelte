<script lang="ts">
	import Input from "../ui/input/input.svelte";
	import Label from "../ui/label/label.svelte";

    interface AppUploadImageProps {
        imageFile: FileList | undefined;
    }

    let { imageFile = $bindable() }: AppUploadImageProps = $props();

</script>



<div class="flex w-full flex-col">
	<div>
		<label
			for="project_image"
			class="flex h-30 w-30 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 p-2 text-center hover:bg-gray-100"
		>
			{#if imageFile && imageFile.length > 0}
				<img
					src={URL.createObjectURL(imageFile[0])}
					alt={imageFile[0].name}
					class="h-30 w-30 object-cover"
				/>
			{:else}
				<p class="text-gray-500">No image selected</p>
			{/if}
		</label>
		<Input bind:files={imageFile} id="project_image" type="file" accept="image/*" hidden />
	</div>
</div>
