import { useEffect, useCallback, useRef } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_TIME = 13 * 60 * 1000;    // 13 minutes
const COUNTDOWN_TIME = 2 * 60 * 1000;   // 2 minutes countdown

export function useAutoLogout() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const warningTimeoutRef = useRef<NodeJS.Timeout>();
  const countdownRef = useRef<NodeJS.Timeout>();
  const lastActivityRef = useRef<number>(Date.now());

  const logout = useCallback(() => {
    // Clear all session data
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to login
    window.location.href = '/api/logout';
  }, []);

  const showWarning = useCallback(() => {
    let countdown = 120; // 2 minutes in seconds
    
    const updateCountdown = () => {
      if (countdown <= 0) {
        logout();
        return;
      }
      
      toast({
        title: "Session Expiring Soon",
        description: `You will be logged out in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')} due to inactivity. Click anywhere to continue.`,
        variant: "destructive",
        duration: 1000,
      });
      
      countdown--;
      countdownRef.current = setTimeout(updateCountdown, 1000);
    };
    
    updateCountdown();
  }, [toast, logout]);

  const resetTimer = useCallback(() => {
    if (!isAuthenticated) return;
    
    lastActivityRef.current = Date.now();
    
    // Clear existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (countdownRef.current) clearTimeout(countdownRef.current);
    
    // Set warning timer (13 minutes)
    warningTimeoutRef.current = setTimeout(showWarning, WARNING_TIME);
    
    // Set logout timer (15 minutes)
    timeoutRef.current = setTimeout(logout, SESSION_TIMEOUT);
  }, [isAuthenticated, showWarning, logout]);

  const handleActivity = useCallback(() => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivityRef.current;
    
    // Only reset if it's been more than 30 seconds since last activity
    // This prevents excessive timer resets
    if (timeSinceLastActivity > 30000) {
      resetTimer();
    }
  }, [resetTimer]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Clear all timers if not authenticated
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (countdownRef.current) clearTimeout(countdownRef.current);
      return;
    }

    // Start the timer
    resetTimer();

    // Activity event listeners
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (countdownRef.current) clearTimeout(countdownRef.current);
    };
  }, [isAuthenticated, resetTimer, handleActivity]);

  return {
    resetTimer,
    timeUntilExpiry: SESSION_TIMEOUT,
    warningTime: WARNING_TIME,
    isActive: isAuthenticated
  };
}