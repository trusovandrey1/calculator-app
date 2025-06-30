// Utility for generating unique IDs compatible with all environments
export function generateId(): string {
  // Use crypto.randomUUID if available (modern browsers and Node.js 15+)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  
  // Fallback for older environments
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Alternative implementation for better uniqueness
export function generateUniqueId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2)
  const extraRandom = Math.random().toString(36).substring(2)
  
  return `${timestamp}-${randomPart}-${extraRandom}`
}