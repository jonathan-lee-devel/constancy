<script>
    import Counter from "../components/Counter.svelte";
</script>

<div class="w-full flex justify-center items-center pt-5">
    <h1 class="text-3xl font-bold underline-offset-2">Welcome to Constancy</h1>
</div>
<div class="w-full flex justify-center items-center">
    <Counter />
</div>

<style lang="postcss">
    :global(html) {
        background-color: dimgrey;
    }
</style>
