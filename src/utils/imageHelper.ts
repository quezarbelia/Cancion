/**
 * Helper to resolve Google Drive URLs to direct image streams or local assets.
 * Converts drive.google.com share links into direct https://lh3.googleusercontent.com/d/{id}
 */

const LOCAL_DRIVE_MAP: Record<string, string> = {
  '1LiElN8VGxFGfVTsbbsVngqcm6s4-Tt6G': '/memories/memory-1.jpg',
  '1Enq3IqhZ4-lDzTCkarRVGBfDUnCPxYIh': '/memories/memory-2.jpg',
  '1-FIaLW4STgEqkBZ09yQELVDFils2OqdP': '/memories/memory-3.jpg',
  '1d_INg2kiWzGkbmJPH5aXVcsA5XmhnwOe': '/memories/memory-4.jpg',
  '1-D03ilS945KWmd-JTWYIh0RZGWb3cxjY': '/cover-una-gerbera.jpg',
};

export function getOptimizedImageUrl(url?: string): string {
  if (!url) return '';

  // Extract Google Drive ID if present
  const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    const id = driveMatch[1];
    // Return local fast asset if mapped
    if (LOCAL_DRIVE_MAP[id]) {
      return LOCAL_DRIVE_MAP[id];
    }
    // Otherwise return direct Google User Content thumbnail
    return `https://lh3.googleusercontent.com/d/${id}`;
  }

  return url;
}
