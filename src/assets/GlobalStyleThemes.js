module.exports = {
  '@border-radius-base': '4px', // major border radius
  '@white': '#fff', //
  '@box-shadow-base':
  '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)', // major shadow for layers
  
  /* -------------------- Colors -------------------------------- */
  '@primary-color': '#405CEE', // primary color for all components
  '@highlight-color': '#405CEE',
  '@link-color': '#405CEE', // link color
  '@success-color': '#52c41a', // success state color
  '@warning-color': '#faad14', // warning state color
  '@error-color': '#f5222d', // error state color
  '@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
  '@text-color': 'rgba(0, 0, 0, 0.65)', // major text color
  '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
  '@disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
  '@border-color-base': '#405CEE', // major border color
  
  /* ---------- Base Scaffolding Variables ---------------------- */
  '@font-family': '"Poppins", sans-serif',
  '@font-size-base': '14px', // major texnpm t font size
  
  /* -------------------- Layout ------------------------------- */
  '@layout-body-background': '#f0f2f5',
  '@layout-header-background': '@white',
  '@layout-header-height': '64px',
  '@layout-header-padding': '0 50px',
  '@layout-header-color': '@text-color',
  '@layout-footer-padding': '24px 50px',
  '@layout-footer-background': '@layout-body-background',
  '@layout-sider-background': '@layout-header-background',
  '@layout-trigger-height': '48px',
  '@layout-trigger-background': '#002140',
  '@layout-trigger-color': '#fff',
  '@layout-zero-trigger-width': '36px',
  '@layout-zero-trigger-height': '42px',
  
  // Layout light theme
  '@layout-sider-background-light': '#fff',
  '@layout-trigger-background-light': '#fff',
  '@layout-trigger-color-light': '@text-color',
  
  /* --------------------- Buttons -------------------------------- */
  '@btn-font-weight': '400',
  '@btn-border-radius-base': '@border-radius-base',
  '@btn-border-radius-sm': '@border-radius-base',
  '@btn-border-width': '@border-width-base',
  '@btn-border-style': '@border-style-base',
  '@btn-shadow': '0 2px 0 rgba(0, 0, 0, 0.015)',
  '@btn-primary-shadow': '0 2px 0 rgba(0, 0, 0, 0.045)',
  '@btn-text-shadow': '0 -1px 0 rgba(0, 0, 0, 0.12)',
  
  '@btn-primary-color': '#fff',
  '@btn-primary-bg': '@primary-color',
  
  '@btn-default-color': '@text-color',
  '@btn-default-bg': '@component-background',
  '@btn-default-border': '@border-color-base',
  
  '@btn-danger-color': '#fff',
  '@btn-danger-bg': '@error-color',
  '@btn-danger-border': '@error-color',
  
  '@btn-disable-color': '@disabled-color',
  '@btn-disable-bg': '@disabled-bg',
  '@btn-disable-border': '@border-color-base',
  
  '@btn-default-ghost-color': '@component-background',
  '@btn-default-ghost-bg': 'transparent',
  '@btn-default-ghost-border': '@component-background',
  
  '@btn-font-size-lg': '@font-size-lg',
  '@btn-font-size-sm': '@font-size-base',
  '@btn-padding-horizontal-base': '@padding-md - 1px',
  '@btn-padding-horizontal-lg': '@btn-padding-horizontal-base',
  '@btn-padding-horizontal-sm': '@padding-xs - 1px',
  
  '@btn-height-base': '@height-base',
  '@btn-height-lg': '@height-lg',
  '@btn-height-sm': '@height-sm',
  
  '@btn-line-height': '@line-height-base',
  
  '@btn-circle-size': '@btn-height-base',
  '@btn-circle-size-lg': '@btn-height-lg',
  '@btn-circle-size-sm': '@btn-height-sm',
  
  '@btn-square-size': '@btn-height-base',
  '@btn-square-size-lg': '@btn-height-lg',
  '@btn-square-size-sm': '@btn-height-sm',
  '@btn-square-only-icon-size': '@font-size-base + 2px',
  '@btn-square-only-icon-size-sm': '@font-size-base',
  '@btn-square-only-icon-size-lg': '@btn-font-size-lg + 2px',
  
  '@btn-group-border': '@primary-5',
  
  '@btn-link-hover-bg': 'transparent',
  '@btn-text-hover-bg': 'rgba(0, 0, 0, 0.018)',
  
  /* --------------------- Menu ---------------------------------- */
  '@menu-inline-toplevel-item-height': '40px',
  '@menu-item-height': '40px',
  '@menu-item-group-height': '@line-height-base',
  '@menu-collapsed-width': '80px',
  '@menu-bg': '@component-background',
  '@menu-popup-bg': '@component-background',
  '@menu-item-color': '@text-color',
  '@menu-inline-submenu-bg': '@background-color-light', //change to white
  '@menu-highlight-color': '@primary-color',
  '@menu-highlight-danger-color': '@error-color',
  '@menu-item-active-bg': '@primary-6',
  '@menu-item-active-danger-bg': '@red-1',
  '@menu-item-active-border-width': '3px',
  '@menu-item-group-title-color': '@text-color-secondary',
  '@menu-item-vertical-margin': '4px',
  '@menu-item-font-size': '@font-size-base',
  '@menu-item-boundary-margin': '8px',
  '@menu-item-padding': '0 20px',
  '@menu-horizontal-line-height': '46px',
  '@menu-icon-margin-right': '10px',
  '@menu-icon-size': '@menu-item-font-size',
  '@menu-icon-size-lg': '@font-size-lg',
  '@menu-item-group-title-font-size': '@menu-item-font-size',
  
  // dark theme
  '@menu-dark-color': '@text-color-secondary-dark',
  '@menu-dark-danger-color': '@error-color',
  '@menu-dark-bg': '@layout-header-background',
  '@menu-dark-arrow-color': '#fff',
  '@menu-dark-inline-submenu-bg': '#000c17',
  '@menu-dark-highlight-color': '#fff',
  '@menu-dark-item-active-bg': '@primary-color',
  '@menu-dark-item-active-danger-bg': '@error-color',
  '@menu-dark-selected-item-icon-color': '@white',
  '@menu-dark-selected-item-text-color': '@white',
  '@menu-dark-item-hover-bg': 'transparent',
  
  /* -------------------------------- Dropdown -------------------------------- */
  '@dropdown-selected-color': '@primary-color',
  '@dropdown-menu-submenu-disabled-bg': '@component-background',
  
  /* --------------------------------- Select --------------------------------- */
  '@select-border-color': '@border-color-base',
  '@select-item-selected-color': '@text-color',
  '@select-item-selected-font-weight': '600',
  '@select-dropdown-bg': '@component-background',
  '@select-item-selected-bg': '@primary-1',
  '@select-item-active-bg': '@item-hover-bg',
  '@select-dropdown-vertical-padding': '@dropdown-vertical-padding',
  '@select-dropdown-font-size': '@dropdown-font-size',
  '@select-dropdown-line-height': '@dropdown-line-height',
  '@select-dropdown-height': '32px',
  '@select-background': '@component-background',
  '@select-clear-background': '@select-background',
  '@select-selection-item-bg': '@background-color-base',
  '@select-selection-item-border-color': '@border-color-split',
  '@select-single-item-height-lg': '40px',
  '@select-multiple-item-height':
  '@input-height-base - @input-padding-vertical-base * 2; // Normal 24p',
  '@select-multiple-item-height-lg': '32px',
  '@select-multiple-item-spacing-half':
  'ceil((@input-padding-vertical-base / 2))',
  '@select-multiple-disabled-background': '@input-disabled-bg',
  '@select-multiple-item-disabled-color': '#bfbfbf',
  '@select-multiple-item-disabled-border-color': '@select-border-color',
  

};
