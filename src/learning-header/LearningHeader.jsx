import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import AnonymousUserMenu, { useLoggedOutItems } from './AnonymousUserMenu';
import LogoSlot from '../plugin-slots/LogoSlot';
import CourseInfoSlot from '../plugin-slots/CourseInfoSlot';
import LearningHelpSlot from '../plugin-slots/LearningHelpSlot';
import LearningUserMenuSlot from '../plugin-slots/LearningUserMenuSlot';
import LanguageMenu from '../site-header/LanguageMenu';
import ProfileMenu from '../site-header/ProfileMenu';
import MobileNavMenu from '../site-header/MobileNavMenu';
import { courseInfoDataShape } from './LearningHeaderCourseInfo';
import useAccount from '../useAccount';
import UserbackWidget from '../UserbackWidget';
import messages from './messages';

/**
 * The course player's header.
 *
 * Shares its shell and its controls with the site header - see `SiteHeader` in
 * `../site-header/` - so the locale button, the avatar and the account menu look
 * and behave identically in both, including the collapse into a burger below
 * the breakpoint. What differs is what stands beside the logo: the course
 * title here, navigation links there - so the burger has no nav-link rows of
 * its own to show, only the language list, the account rows and, when
 * configured, a Help row.
 *
 * Styling comes entirely from `@edx/brand/paragon/header`, which an application
 * has to import for this markup to look right.
 */
const LearningHeader = ({
  courseOrg, courseNumber, courseTitle, intl, showUserDropdown,
}) => {
  const { authenticatedUser } = useContext(AppContext);
  const account = useAccount();
  const loggedOutItems = useLoggedOutItems();

  const loggedIn = authenticatedUser !== null;

  // The burger's only nav-link-shaped row: Help, when there's somewhere for it
  // to go and someone signed in to see it - the same condition the wide
  // layout's LearningHelpSlot is shown under. Read locally rather than through
  // the slot: the burger's other rows (nav links on the site header, this
  // header's own Help row) aren't individually slotted either, only the whole
  // menu is.
  const supportUrl = getConfig().SUPPORT_URL;
  const helpNavItems = (loggedIn && supportUrl) ? [{
    content: intl.formatMessage(messages.help),
    href: supportUrl,
  }] : [];

  // Two groups rather than one, so the rows are drawn with a separator above sign
  // out. `iconName` picks the leading glyph for a row: it is a hint, not a
  // component, so an application supplying its own rows through the slot needs no
  // import from this package, and an unknown or absent name simply renders no
  // icon. Sign out is identified by it too, which keeps its distinct styling
  // working in every language.
  const userMenu = !loggedIn ? [] : [
    {
      heading: '',
      items: [
        {
          type: 'item',
          href: `${getConfig().LMS_BASE_URL}/dashboard`,
          content: intl.formatMessage(messages.dashboard),
          iconName: 'dashboard',
        },
        {
          type: 'item',
          href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`,
          content: intl.formatMessage(messages.profile),
          iconName: 'profile',
        },
        {
          type: 'item',
          href: getConfig().ACCOUNT_SETTINGS_URL,
          content: intl.formatMessage(messages.account),
          iconName: 'account',
        },
        // Order History link removed
        // Uncomment the following lines if you want to re-enable Order History
        // ...(getConfig().ORDER_HISTORY_URL ? [{
        //   type: 'item',
        //   href: getConfig().ORDER_HISTORY_URL,
        //   content: intl.formatMessage(messages.orderHistory),
        // }] : []),
      ],
    },
    {
      heading: '',
      items: [
        {
          type: 'item',
          href: getConfig().LOGOUT_URL,
          content: intl.formatMessage(messages.signOut),
          iconName: 'signout',
        },
      ],
    },
  ];

  return (
    <header className="site-nav site-nav-learning learning-header">
      <a className="nav-skip sr-only sr-only-focusable" href="#main-content">
        {intl.formatMessage(messages.skipNavLink)}
      </a>

      <div className="nav-left">
        {/*
          The logo keeps its own slot rather than being folded into the site
          header's brand lockup, so an application can still replace it. `Logo`
          spreads its extra attributes after its own class, so this one wins.
        */}
        <LogoSlot
          href={`${getConfig().LMS_BASE_URL}`}
          src={getConfig().LOGO_URL}
          alt={getConfig().SITE_NAME}
          className="nav-brand nav-brand-learning"
        />
        <div className="nav-course-title course-title-lockup">
          <CourseInfoSlot courseOrg={courseOrg} courseNumber={courseNumber} courseTitle={courseTitle} />
        </div>
      </div>

      {showUserDropdown && (
        <div className="nav-actions">
          {loggedIn && <LearningHelpSlot />}
          <LanguageMenu />
          {loggedIn ? (
            <ProfileMenu
              menu={userMenu}
              avatar={account.avatar}
              avatarLoading={account.loading}
              username={authenticatedUser.username}
              name={account.name}
              email={account.email}
              // The rows go through this header's own slot, so an application
              // customising the learning account menu keeps that extension point.
              renderItems={(menu) => <LearningUserMenuSlot items={menu} />}
            />
          ) : (
            <AnonymousUserMenu />
          )}
          {/*
            Last, not first: below the collapse breakpoint everything else in
            this row is display:none, so the burger ends up the only visible
            control - on the right, where .nav-actions already sits.
          */}
          <MobileNavMenu
            navItems={helpNavItems}
            userMenu={userMenu}
            loggedOutItems={loggedOutItems}
            loggedIn={loggedIn}
            avatar={account.avatar}
            avatarLoading={account.loading}
            username={loggedIn ? authenticatedUser.username : null}
            name={account.name}
            email={account.email}
            // Same slot the wide layout's ProfileMenu routes through, so a
            // customised account menu looks the same at every screen width.
            renderItems={(menu) => <LearningUserMenuSlot items={menu} />}
          />
        </div>
      )}

      <UserbackWidget />
    </header>
  );
};

LearningHeader.propTypes = {
  courseOrg: courseInfoDataShape.courseOrg,
  courseNumber: courseInfoDataShape.courseNumber,
  courseTitle: courseInfoDataShape.courseTitle,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true,
};

export default injectIntl(LearningHeader);
