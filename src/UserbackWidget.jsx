import { useEffect, useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';

const UserbackWidget = () => {
  const { authenticatedUser } = useContext(AppContext);

  useEffect(() => {
    if (window.Userback) {
      return; // Prevent multiple injections
    }

    window.Userback = window.Userback || {};
    window.Userback.access_token = process.env.USERBACK_ACCESS_TOKEN;

    if (authenticatedUser) {
      window.Userback.user_data = {
        id: authenticatedUser.userId,
        info: {
          name: authenticatedUser.username,
          email: authenticatedUser.email,
        },
      };
    } else {
      window.Userback.user_data = {
        id: `anon-${Date.now()}`,
        info: {
          name: 'Anonymous',
          email: '',
        },
      };
    }

    const script = document.createElement('script');
    script.src = 'https://static.userback.io/widget/v1.js';
    script.async = true;
    document.head.appendChild(script);
  }, [authenticatedUser]);

  return null;
};

export default UserbackWidget;
