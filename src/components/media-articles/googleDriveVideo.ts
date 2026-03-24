/** Extract Google Drive file id from a `/file/d/{id}/...` URL. */
export function googleDriveFileIdFromUrl(url: string): string | null {
  const m = url.match(/\/file\/d\/([^/?#]+)/);
  return m?.[1] ?? null;
}

export function googleDriveVideoEmbedUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/** Public Drive file used for “Watch demo” after the request-demo flow (embed in modal). */
export const WATCH_DEMO_DRIVE_FILE_URL =
  'https://drive.google.com/file/d/1oq4vzNoM_j-nmnFN5AsUNo8ZQPZF6vX9/view';

export function getWatchDemoEmbedUrl(): string | null {
  const id = googleDriveFileIdFromUrl(WATCH_DEMO_DRIVE_FILE_URL);
  return id ? googleDriveVideoEmbedUrl(id) : null;
}
