# Learning User Menu Slot

### Slot ID: `org.openedx.frontend.layout.header_learning_user_menu.v1`

### Slot ID Aliases
* `learning_user_menu_slot`

## Description

This slot is used to replace/modify/hide the learning user menu.

## Item shape

> **Breaking change.** `items` used to be a flat list of `{ href, message }`. It is
> now a list of **groups**, and each row uses `content` rather than `message`:
>
> ```js
> [{ heading, items: [{ type, href, content, iconName }] }]
> ```
>
> A row is separated from the group above it automatically, so sign out no longer
> needs to be detected by its URL. `iconName` picks the row's leading glyph and is
> a plain string hint, not a component - nothing needs importing from this package.
> Recognised names are `dashboard`, `discover`, `wishlist`, `programs`, `profile`,
> `account`, `signout`, `login` and `register`; an unknown or absent name simply
> renders no icon. `signout` also carries that row's distinct styling, in every
> language. A configuration still supplying `{ href, message }` will render blank
> rows and must be updated.

## Examples

### Modify Items

The following `env.config.jsx` will modify the items in the learning user menu.

![Screenshot of modified items](./images/learning_user_menu_modified_items.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const modifyUserMenu = ( widget ) => {
  widget.content.items = [
    {
      heading: '',
      items: [
        {
          type: 'item',
          href: 'https://openedx.org/',
          content: 'openedx.org',
          iconName: 'dashboard',
        },
        {
          type: 'item',
          href: 'https://docs.openedx.org/en/latest/',
          content: 'Documentation',
        },
        {
          type: 'item',
          href: 'https://discuss.openedx.org/',
          content: 'Forums',
        },
      ],
    },
  ];
  return widget;
};

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_learning_user_menu.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: modifyUserMenu,
        },
      ]
    },
  },
}

export default config;
```

### Replace Menu with Custom Component

The following `env.config.jsx` will replace the items in the learning user menu entirely (in this case with a centered 🗺️ `h1`)

![Screenshot of replaced with custom component](./images/learning_user_menu_custom_component.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_learning_user_menu.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_user_menu_component',
            type: DIRECT_PLUGIN,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🗺️</h1>
            ),
          },
        },
      ]
    },
  },
}

export default config;
```

### Add Custom Components before and after Menu

The following `env.config.jsx` will place custom components before and after the learning user menu (in this case centered `h1`s with 🌞 and 🌚).

![Screenshot of custom components before and after](./images/learning_user_menu_custom_components_before_after.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_learning_user_menu.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_before_user_menu_component',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🌞</h1>
            ),
          },
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_after_user_menu_component',
            type: DIRECT_PLUGIN,
            priority: 90,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🌚</h1>
            ),
          },
        },
      ]
    },
  },
}

export default config;
```
