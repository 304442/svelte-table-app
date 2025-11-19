<script lang="ts">
  interface Props {
    onclick?: (event: MouseEvent) => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
  }

  let {
    onclick = undefined,
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    class: className = ''
  }: Props = $props();

  const baseClasses = 'inline-flex items-center justify-center rounded font-medium transition-all duration-200 focus:outline-none';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-primary-700 text-white hover:from-primary-600 hover:to-primary-800 focus:ring-2 focus:ring-primary/50 shadow-sm',
    secondary: 'bg-white border border-slate-300 text-slate-900 hover:bg-slate-50 focus:ring-2 focus:ring-slate-500/20',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  };

  const sizeClasses = {
    sm: 'px-1 py-1 text-xs leading-none',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95';

  const buttonClasses = $derived(`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`);
</script>

<button {type} {disabled} {onclick} class={buttonClasses}>
  {#snippet children()}
    {@render children()}
  {/snippet}
</button>