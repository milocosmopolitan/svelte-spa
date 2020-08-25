<script>
    import { createEventDispatcher } from 'svelte';
    import { _, locale, locales } from 'svelte-i18n';

    export let value = 'en';
    const dispatch = createEventDispatcher();
    function handleLocaleChange(event) {
        event.preventDefault();
        console.log('handleLocaleChange', value, event.target.value)
        dispatch('locale-changed', event.target.value);
    }
</script>

<style>
    .locale-selector {
        display: flex;
        justify-content: center;
    }
    .select {
        margin: 0 1rem 1rem;
    }
</style>

<ul class="lang">
    {#each $locales as item}
      <li>
        <span
          class="a"
          class:selected={$locale.includes(item)}
          href={`#!${item}`}
          on:click={() => ($locale = item)}>
          {$_('languages.' + item.replace('-', '_'))}
        </span>
      </li>
    {/each}
  </ul>

<!-- <div class="locale-selector">
    <div class="select">
        <select value={value} on:blur={handleLocaleChange}>
            <option value="en">English</option>
            <option value="ko">한국어</option>
        </select>
    </div>
</div> -->
