const JSD_EMBED_SCRIPT_SRC = "https://jsd-widget.atlassian.com/assets/embed.js";
const JSD_KEY = "3e9d626c-4a48-45aa-821a-8f1d77f4d462";
const JSD_BASE_URL = "https://jsd-widget.atlassian.com";

let loadPromise: Promise<void> | null = null;

/**
 * Injects the Jira Service Desk embed script once (same attributes as the official snippet).
 * Safe to call multiple times; subsequent calls resolve after the first load completes.
 */
export function ensureAtlassianJsdEmbedScript(): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${JSD_EMBED_SCRIPT_SRC}"]`
  );
  if (existing) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.async = true;
    s.src = JSD_EMBED_SCRIPT_SRC;
    s.setAttribute("data-jsd-embedded", "");
    s.setAttribute("data-key", JSD_KEY);
    s.setAttribute("data-base-url", JSD_BASE_URL);
    s.onload = () => resolve();
    s.onerror = () => {
      loadPromise = null;
      reject(new Error("Failed to load Jira Service Desk widget"));
    };
    document.body.appendChild(s);
  });

  return loadPromise;
}
