<script lang="ts">
    import imgTest from './assets/test.jpg';
    import boop from './lib/boop';
</script>

<main>
    <div class="root" use:boop={{selector: 'img', variablesOnNode: true}}>
        <img src={imgTest} alt="test"/>
    </div>
</main>

<style>
    main {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .root {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 400px;
        height: 300px;
        pointer-events: none;
        user-select: none;
    }
</style>
