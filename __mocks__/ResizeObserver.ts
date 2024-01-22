class MockResizeObserver {
  observe: jest.Mock;
  unobserve: jest.Mock;
  disconnect: jest.Mock;

  constructor(callback: ResizeObserverCallback) {
    this.observe = jest.fn((target: Element) => {});
    this.unobserve = jest.fn((target: Element) => {});
    this.disconnect = jest.fn(() => {});
  }
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

export default MockResizeObserver;
