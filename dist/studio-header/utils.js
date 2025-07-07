import { getConfig } from '@edx/frontend-platform';
import messages from './messages';
const getUserMenuItems = _ref => {
  let {
    studioBaseUrl,
    logoutUrl,
    intl,
    isAdmin
  } = _ref;
  let items = [{
    href: `${studioBaseUrl}`,
    title: intl.formatMessage(messages['header.user.menu.studio'])
  }, {
    href: `${logoutUrl}`,
    title: intl.formatMessage(messages['header.user.menu.logout'])
  }];
  if (isAdmin) {
    items = [{
      href: `${studioBaseUrl}`,
      title: intl.formatMessage(messages['header.user.menu.studio'])
    }, {
      href: `${getConfig().STUDIO_BASE_URL}/maintenance`,
      title: intl.formatMessage(messages['header.user.menu.maintenance'])
    }, {
      href: `${logoutUrl}`,
      title: intl.formatMessage(messages['header.user.menu.logout'])
    }];
  }
  return items;
};
export default getUserMenuItems;
//# sourceMappingURL=utils.js.map