<!-- copyright 2019, stefano bovio @allyoucanmap. -->
<script>
    export let vertical = false;
    export let style = '';
</script>
<style>
    .container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
    }
    .container :global(.container) {
        width: initial;
        height: initial;
    }
    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
    .body {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow-y: auto;
        pointer-events: none;
    }
    .center {
        flex: 1;
        position: relative;
    }
    .center :global(*) {
        pointer-events: auto;
    }
    .left {
        order: -1;
        pointer-events: auto;
    }
    .right {
        order: 1;
        pointer-events: auto;
    }
    .header, .footer {
        z-index: 1;
    }
    .container.vertical {
        flex-direction: column;
    }
    .container.vertical .body {
        flex-direction: row;
    }
</style>

<div
    class="container"
    class:vertical={vertical}
    {style}>
    <div class="background">
        <slot name="background" />
    </div>
    <div class="header">
        <slot name="header" />
    </div>
    <div class="body">
        <div class="center">
            <slot />
        </div>
        <div class="left">
            <slot name="left" />
        </div>
        <div class="right">
            <slot name="right" />
        </div>
    </div>
    <div class="footer">
        <slot name="footer" />
    </div>
</div>