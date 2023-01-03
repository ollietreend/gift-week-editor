<script>
  import ajax from '@codexteam/ajax';
  import { IconPicture } from '@codexteam/icons';

  export let file;

  const browse = async () => {
    const files = await ajax.selectFiles({
      accept: 'image/png, image/jpeg, image/gif, image/svg+xml',
      multiple: false,
    });
    file = files[0];
  };
</script>

<div class="cdx-button" on:click={browse}>
  {@html IconPicture}
  Select an Image
</div>

<style>
  .cdx-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
