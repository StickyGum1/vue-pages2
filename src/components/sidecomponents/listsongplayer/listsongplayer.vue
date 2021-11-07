<template>
    <div class="wrapper-main-list-song">
        <div class="wrapper-list-player">
            <h1>This is list player content</h1>
        </div>
        <div class="wrapper-list-player-overlay">
        </div>
    </div>
</template>

<script>
export default {
    name: "list-song-player"
}
</script>

<style scoped>

.wrapper-main-list-song {
    opacity: 0;
    visibility: hidden;
    position: fixed;
    inset: 0% 0 0 0;
    z-index: 1000;
}

.wrapper-list-player {
    position: absolute;
    inset: 0 0 90px 0;
    background-color:transparent;
    z-index: 1001;
}

.wrapper-list-player-overlay {
    position: absolute;
    inset: 0;
    background: url(/image/background/blurbg.jpg);
    background-size: cover;
    z-index: 1000;
}
</style>