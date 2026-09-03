# Learning Logged Out Items Slot

### Slot ID: `org.openedx.frontend.layout.header_learning_logged_out_items.v1`

### Slot ID Aliases
* `learning_logged_out_items_slot`

## Description

This slot is used to replace/modify/hide the items shown on the learning header when the user is logged out.

## Item shape

> **Breaking change.** Each entry used to be `{ href, message, variant }`, where
> `variant` was a Paragon button variant. Entries are now
> `{ type, href, content, iconName, variant }`: `content` replaces `message`, and
> `variant` is `'register'` (outlined) or `'signin'` (filled) rather than a Paragon
> variant name.
>
> `variant` says which entry is the primary action instead of relying on order.
> Without it, among two or more entries the last is treated as primary; a single
> entry with no `variant` renders as the outlined style and warns, because "last of
> the list" and "the only entry" are the same position. Set `variant` explicitly
> whenever you supply just one. A configuration still supplying `{ href, message }`
> will render blank buttons and must be updated.

## Examples

### Modify Items

The following `env.config.jsx` will modify the items shown on the learning header when the user is logged out.

![Screenshot of modified items](./images/learning_logged_out_items_modified_items.png)

```jsx
import { PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const modifyLoggedOutItems = ( widget ) => {
  widget.content.buttonsInfo = [
    {
      type: 'item',
      href: 'https://docs.openedx.org/en/latest/',
      content: 'Documentation',
      variant: 'register',
    },
    {
      type: 'item',
      href: 'https://openedx.org/',
      content: 'openedx.org',
      variant: 'signin',
    },
  ];
  return widget;
};

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_learning_logged_out_items.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Modify,
          widgetId: 'default_contents',
          fn: modifyLoggedOutItems,
        },
      ]
    },
  },
}

export default config;
```

### Replace with Custom Component

The following `env.config.jsx` will replace the items shown in the learning header when the user is logged out entirely (in this case with a centered 🗺️ `h1`)

![Screenshot of replaced with custom component](./images/learning_logged_out_items_custom_component.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_learning_logged_out_items.v1': {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_logged_out_items_component',
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

### Add Custom Components before and after

The following `env.config.jsx` will place custom components before and after the items shown in the learning header when the user is logged out (in this case centered `h1`s with 🌜 and 🌛).

![Screenshot of added custom components before and after](./images/learning_logged_out_items_custom_components_before_after.png)

```jsx
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

const config = {
  pluginSlots: {
    'org.openedx.frontend.layout.header_learning_logged_out_items.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_before_logged_out_items_component',
            type: DIRECT_PLUGIN,
            priority: 10,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🌜</h1>
            ),
          },
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_after_logged_out_items_component',
            type: DIRECT_PLUGIN,
            priority: 90,
            RenderWidget: () => (
              <h1 style={{textAlign: 'center'}}>🌛</h1>
            ),
          },
        },
      ]
    },
  },
}

export default config;
```

