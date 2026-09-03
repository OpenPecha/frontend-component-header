import React, { useId } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Menu, MenuTrigger, MenuContent } from '../Menu';
import { GlobeIcon } from './icons';
import LanguageOptions from './LanguageOptions';
import messages from '../Header.messages';

/**
 * The globe button and its language list. Shown on wide screens only; below the
 * collapse breakpoint the same options appear inside the burger menu instead.
 *
 * Menu supplies the open/close behaviour - outside click, Escape, arrow keys and
 * the aria-haspopup/aria-expanded wiring - and closing the other open menu, since
 * clicking this trigger counts as a click outside that one.
 */
const LanguageMenu = () => {
  const intl = useIntl();
  const triggerId = useId();
  const label = intl.formatMessage(messages['header.label.language.menu']);

  return (
    <Menu className="nav-locale-wrap" transitionClassName="nav-menu-anim" transitionTimeout={160}>
      <MenuTrigger
        tag="button"
        type="button"
        id={triggerId}
        className="nav-locale"
        aria-label={label}
        title={label}
      >
        <GlobeIcon />
      </MenuTrigger>
      <MenuContent className="nav-menu nav-menu-lang" role="menu" aria-labelledby={triggerId}>
        <LanguageOptions />
      </MenuContent>
    </Menu>
  );
};

export default LanguageMenu;
