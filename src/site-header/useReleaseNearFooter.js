import { useEffect, useState } from 'react';

/**
 * Whether the page's footer has scrolled into view. The header is `position:
 * sticky` so it stays visible while browsing, but it should get out of the way
 * once the footer arrives rather than sit pinned on top of it.
 *
 * The footer comes from a separate package (`@edx/frontend-component-footer`)
 * this header has no import-time connection to. By default it's found by its
 * standard HTML landmark (`footer`), since a page normally renders exactly one -
 * but that is only a default: an application with more than one `<footer>` on
 * the page, or that renders the footer some other way, can pass `footerSelector`
 * to say precisely which element this should watch.
 *
 * A single MutationObserver stays connected for as long as this header is
 * mounted, watching in both directions: the footer may not exist in the DOM
 * yet when this effect first runs (like this header, it renders through a
 * plugin slot, which can resolve its content after the initial paint), and an
 * already-found footer can later be removed and replaced - a route change
 * that remounts its plugin slot, for instance. Either way is noticed from the
 * mutation itself rather than waiting on a scroll or resize to stumble onto
 * the change. The steady state - the footer just sitting there, the page
 * churning elsewhere - stays cheap: with a node already in hand, each callback
 * only checks whether that specific node was among a mutation's removals,
 * which touches nothing but a list already on hand; a real layout read only
 * happens once something has actually changed.
 *
 * Plain scroll + `getBoundingClientRect` rather than IntersectionObserver: the
 * same "has the footer's top edge entered the viewport" check, but as a number
 * comparison, which is easier to reason about than a specific observer setup.
 */
const useReleaseNearFooter = (footerSelectorProp) => {
  // `|| 'footer'` rather than a default parameter: a default only substitutes
  // for `undefined`, but this can also arrive as `''`. The plugin framework's
  // own prop-merging (used by the slot that renders this header) coerces any
  // falsy value a deployment's plugin config sets for this prop into the
  // literal string '' - and `document.querySelector('')` throws, rather than
  // matching nothing, so an empty selector has to be treated the same as an
  // absent one here rather than trusted to already be a valid selector.
  const footerSelector = footerSelectorProp || 'footer';
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    let footerNode = document.querySelector(footerSelector);
    let ticking = false;
    let rafId = null;

    const checkFooterVisibility = () => {
      ticking = false;
      setFooterInView(!!footerNode && footerNode.getBoundingClientRect().top < window.innerHeight);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(checkFooterVisibility);
      }
    };

    // Finds the selector inside a single added node's own subtree, without
    // re-querying the whole document on every mutation elsewhere on the page.
    const findInNode = (node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
      }
      if (node.matches(footerSelector)) {
        return node;
      }
      return node.querySelector(footerSelector);
    };

    // Is `footerNode` itself, or an ancestor of it, among the nodes a mutation
    // removed? A whole container can be torn down at once - the footer never
    // appears in `removedNodes` on its own in that case, only its ancestor
    // does - so this checks for that the same way `findInNode` checks
    // descendants of an added node.
    const removalContainsFooter = (removedNodes) => {
      for (let i = 0; i < removedNodes.length; i += 1) {
        const removed = removedNodes[i];
        if (removed === footerNode
          || (removed.nodeType === Node.ELEMENT_NODE && removed.contains(footerNode))) {
          return true;
        }
      }
      return false;
    };

    const footerObserver = new MutationObserver((mutations) => {
      if (footerNode) {
        const wasRemoved = mutations.some((mutation) => removalContainsFooter(mutation.removedNodes));
        if (wasRemoved) {
          footerNode = null;
          checkFooterVisibility();
        }
        return;
      }
      for (let i = 0; i < mutations.length; i += 1) {
        const { addedNodes } = mutations[i];
        for (let j = 0; j < addedNodes.length; j += 1) {
          const found = findInNode(addedNodes[j]);
          if (found) {
            footerNode = found;
            checkFooterVisibility();
            return;
          }
        }
      }
    });
    footerObserver.observe(document.body, { childList: true, subtree: true });

    checkFooterVisibility();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      footerObserver.disconnect();
    };
  }, [footerSelector]);

  return footerInView;
};

export default useReleaseNearFooter;
