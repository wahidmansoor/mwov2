import { EnhancedPalliativeCareModule } from '../palliative-care/EnhancedPalliativeCareModule';

/**
 * Legacy ComprehensivePalliativeCare component redirects to new Enhanced module
 * This maintains backward compatibility while providing the new world-class functionality
 */
export function ComprehensivePalliativeCare() {
  return <EnhancedPalliativeCareModule />;
}

// Default export for compatibility
export default ComprehensivePalliativeCare;