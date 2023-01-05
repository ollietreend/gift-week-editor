<script>
  import ajax from '@codexteam/ajax';
  import { IconPicture } from '@codexteam/icons';
  import { ALLOWED_TYPES } from '../../image';

  export let file;

  const browse = async () => {
    const files = await ajax.selectFiles({
      accept: ALLOWED_TYPES.join(', '),
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
