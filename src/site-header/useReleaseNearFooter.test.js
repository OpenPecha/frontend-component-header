import { act, renderHook } from '@testing-library/react';
import useReleaseNearFooter from './useReleaseNearFooter';

/**
 * A minimal ResizeObserver stub: jsdom doesn't implement one at all, and the
 * hook only needs `observe`/`disconnect` to exist and the constructor's
 * callback to be reachable so a test can invoke it directly to simulate a
 * resize.
 */
class MockResizeObserver {
  constructor(callback) {
    this.callback = callback;
    MockResizeObserver.instances.push(this);
  }

  observe() {}

  disconnect() {
    this.disconnected = true;
  }
}
MockResizeObserver.instances = [];

describe('useReleaseNearFooter', () => {
  let footer;

  beforeEach(() => {
    jest.useFakeTimers();
    MockResizeObserver.instances = [];
    global.ResizeObserver = MockResizeObserver;

    footer = document.createElement('footer');
    document.body.appendChild(footer);

    // Below the fold to start: the common case (a normal page load) shouldn't
    // release the header before anything has happened.
    jest.spyOn(footer, 'getBoundingClientRect').mockReturnValue({ top: 2000 });
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
  });

  afterEach(() => {
    footer.remove();
    delete global.ResizeObserver;
    jest.useRealTimers();
  });

  it('reports the footer as not in view when it is below the fold', () => {
    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(false);
  });

  it('reports the footer as in view when it already fits inside the viewport', () => {
    footer.getBoundingClientRect.mockReturnValue({ top: 400 });

    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(true);
  });

  it('marks every reading before the first scroll or resize as instant', () => {
    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.instant).toBe(true);

    footer.getBoundingClientRect.mockReturnValue({ top: 400 });
    act(() => {
      MockResizeObserver.instances[0].callback();
      jest.runOnlyPendingTimers();
    });

    // Still nothing the visitor did - a body resize alone doesn't count.
    expect(result.current.inView).toBe(true);
    expect(result.current.instant).toBe(true);
  });

  it('stops marking readings instant once the visitor actually scrolls', () => {
    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.instant).toBe(true);

    act(() => {
      window.dispatchEvent(new Event('scroll'));
      jest.runOnlyPendingTimers();
    });
    expect(result.current.instant).toBe(false);

    // And it stays that way for later readings too, including ones a body
    // resize triggers - the visitor has already been seen scrolling once.
    footer.getBoundingClientRect.mockReturnValue({ top: 400 });
    act(() => {
      MockResizeObserver.instances[0].callback();
      jest.runOnlyPendingTimers();
    });
    expect(result.current.inView).toBe(true);
    expect(result.current.instant).toBe(false);
  });

  it('recomputes on a body resize with no scroll or resize event - the loading-spinner-to-real-content case', () => {
    // Starts short: exactly the state a page is in while a loading spinner is
    // still showing, before the real (taller) content has replaced it.
    footer.getBoundingClientRect.mockReturnValue({ top: 400 });
    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(true);

    // The real content arrives, pushing the footer below the fold - but
    // nothing here is a scroll, a resize, or the footer itself being added or
    // removed, so only the ResizeObserver on the body has any way to notice.
    footer.getBoundingClientRect.mockReturnValue({ top: 2000 });
    act(() => {
      MockResizeObserver.instances[0].callback();
      jest.runOnlyPendingTimers();
    });

    expect(result.current.inView).toBe(false);
    // And this correction is exactly the case that must not animate.
    expect(result.current.instant).toBe(true);
  });

  it('still recomputes on scroll when ResizeObserver is unavailable', () => {
    delete global.ResizeObserver;
    footer.getBoundingClientRect.mockReturnValue({ top: 400 });

    const { result } = renderHook(() => useReleaseNearFooter());
    expect(result.current.inView).toBe(true);

    footer.getBoundingClientRect.mockReturnValue({ top: 2000 });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      jest.runOnlyPendingTimers();
    });

    expect(result.current.inView).toBe(false);
  });

  it('disconnects the ResizeObserver on unmount', () => {
    const { unmount } = renderHook(() => useReleaseNearFooter());
    const observer = MockResizeObserver.instances[0];

    unmount();

    expect(observer.disconnected).toBe(true);
  });
});
