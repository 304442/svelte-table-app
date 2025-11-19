<script lang="ts">
  import type { SelectProps } from '$lib/types';

  interface Props extends SelectProps {}

  let {
    value,
    onselect = undefined,
    options,
    placeholder = 'Select an option',
    disabled = false,
    class: className = ''
  }: Props = $props();

  const baseClasses = 'compact-input border-slate-300 text-slate-900 bg-white focus:border-primary focus:ring-primary/20';

  const selectClasses = $derived(`${baseClasses} ${className}`);

  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    onselect?.(target.value);
  }
</script>

<select {value} {disabled} class={selectClasses} onchange={handleChange}>
  <option value="" disabled selected={!value}>{placeholder}</option>
  {#each options as option}
    <option value={option.value} selected={value === option.value}>
      {option.label}
    </option>
  {/each}
</select>