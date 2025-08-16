/**
 * Utility functions to safely handle browser extension interactions
 * Prevents "Unchecked runtime.lastError" messages in console
 */

// Type declarations for Chrome extension API
declare global {
  interface Window {
    chrome?: {
      runtime?: {
        sendMessage: (
          extensionId: string, 
          message: any, 
          options?: any, 
          responseCallback?: (response: any) => void
        ) => void;
        lastError?: { message: string };
        getManifest?: () => any;
        onConnect?: any;
      };
    };
  }
}

interface ChromePort {
  onDisconnect: {
    addListener: (callback: () => void) => void;
  };
}

/**
 * Safely check if chrome.runtime is available
 */
export const hasChromeRuntime = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.chrome !== 'undefined' && 
         typeof window.chrome.runtime !== 'undefined';
};

/**
 * Safely send message to chrome extension with error handling
 */
export const safeSendMessage = async (
  extensionId: string, 
  message: any, 
  options?: any
): Promise<any> => {
  if (!hasChromeRuntime()) {
    return null;
  }

  return new Promise((resolve) => {
    try {
      window.chrome!.runtime!.sendMessage(
        extensionId, 
        message, 
        options || {},
        (response: any) => {
          // Check for runtime errors and handle gracefully
          if (window.chrome!.runtime!.lastError) {
            console.warn('Chrome extension communication error:', 
                        window.chrome!.runtime!.lastError.message);
            resolve(null);
          } else {
            resolve(response);
          }
        }
      );
    } catch (error) {
      console.warn('Error sending message to chrome extension:', error);
      resolve(null);
    }
  });
};

/**
 * Safely check if a specific chrome extension is available
 */
export const isExtensionAvailable = (): boolean => {
  if (!hasChromeRuntime()) {
    return false;
  }

  try {
    // Attempt to check if extension is available
    return !!window.chrome!.runtime!.getManifest;
  } catch (error) {
    return false;
  }
};

/**
 * Add event listener for extension port disconnect to handle cleanup
 */
export const handleExtensionPortDisconnect = (port: ChromePort): void => {
  if (!hasChromeRuntime()) {
    return;
  }

  port.onDisconnect.addListener(() => {
    if (window.chrome!.runtime!.lastError) {
      console.warn('Extension port disconnected:', 
                  window.chrome!.runtime!.lastError.message);
    }
  });
};
