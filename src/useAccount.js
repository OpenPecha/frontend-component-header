import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@edx/frontend-platform/react';

/**
 * The signed-in account's photo, name and email.
 *
 * One request covers all three, because every header that wants any of them wants
 * the rest: the bar shows the photo (or initials derived from the name), and the
 * account menu shows the name and email together beneath it.
 *
 * Reads `authenticatedUser` and the config from AppContext itself rather than
 * taking them as arguments, the way `useLanguageSelection` does - a header only
 * ever wants this for the visitor who is actually signed in.
 *
 * @returns {{loading: boolean, avatar: ?string, name: ?string, email: ?string}}
 */
const useAccount = () => {
  const { authenticatedUser, config } = useContext(AppContext);

  const [account, setAccount] = useState({
    loading: true, avatar: null, name: null, email: null,
  });

  useEffect(() => {
    const fetchAccount = async () => {
      // If the user is logged out, we are not loading, and there is nothing to show.
      if (authenticatedUser === null) {
        setAccount({
          loading: false, avatar: null, name: null, email: null,
        });
        return;
      }

      // If we don't have a username yet, remain in the loading state.
      if (!authenticatedUser?.username) {
        setAccount({
          loading: true, avatar: null, name: null, email: null,
        });
        return;
      }

      try {
        const baseUrl = config.LMS_BASE_URL || '';
        const apiUrl = `${baseUrl}/api/user/v1/accounts/${authenticatedUser.username}`;
        const response = await fetch(apiUrl, {
          credentials: 'include',
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          // 'large' (120px) rather than 'medium' (50px): the avatar renders at
          // 44px CSS, and a 50px source looks soft on any 2x+ display.
          const imageUrl = data.profile_image?.image_url_large;
          const hasImage = data.profile_image?.has_image;

          setAccount({
            loading: false,
            // Use the fetched image only if it exists and is not a default one,
            // otherwise fall back to initials or the generic icon.
            avatar: imageUrl && hasImage ? imageUrl : null,
            name: data.name || null,
            email: data.email || null,
          });
        } else {
          setAccount({
            loading: false, avatar: null, name: null, email: null,
          });
        }
      } catch (error) {
        setAccount({
          loading: false, avatar: null, name: null, email: null,
        });
      }
    };

    fetchAccount();
  }, [authenticatedUser, config.LMS_BASE_URL]);

  return account;
};

export default useAccount;
