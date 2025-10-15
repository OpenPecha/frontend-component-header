import { useEffect, useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
var UserbackWidget = function UserbackWidget() {
  var _useContext = useContext(AppContext),
    authenticatedUser = _useContext.authenticatedUser;
  useEffect(function () {
    if (window.Userback) {
      return; // Prevent multiple injections
    }
    var userbackAccessToken = getConfig().USERBACK_ACCESS_TOKEN;
    if (!userbackAccessToken) {
      // eslint-disable-next-line no-console -- intentional: warn when access token missing
      console.warn('⚠️ Userback access token not found in config.');
      return;
    }
    window.Userback = window.Userback || {};
    window.Userback.access_token = userbackAccessToken;
    if (authenticatedUser) {
      window.Userback.user_data = {
        id: authenticatedUser.userId,
        info: {
          name: authenticatedUser.username,
          email: authenticatedUser.email
        }
      };
    } else {
      window.Userback.user_data = {
        id: "anon-".concat(Date.now()),
        info: {
          name: 'Anonymous',
          email: ''
        }
      };
    }
    var script = document.createElement('script');
    script.src = 'https://static.userback.io/widget/v1.js';
    script.async = true;
    document.head.appendChild(script);
  }, [authenticatedUser]);
  return null;
};
export default UserbackWidget;
//# sourceMappingURL=UserbackWidget.js.map