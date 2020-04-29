<!-- copyright 2019, stefano bovio @allyoucanmap. -->
<script>
  import Item from './Item.svelte';
    export let layers = [];
</script>
<style>
  div {
    position: relative;
    display: flex;
    width: 200px;
    height: calc(100% - 16px);
    margin: 8px;
    padding: 4px;
    background-color: #334;
    border: 1px solid #223;
    overflow-y: auto;
  }
</style>

<div>
    {#each layers as layer}
    <Item
      properties={layer}/>
    {/each}
</div>