const JSD_KEY = "3e9d626c-4a48-45aa-821a-8f1d77f4d462";
const JSD_BASE_URL = "https://jsd-widget.atlassian.com";
/** Loaded inside the widget iframe (derived from the official embed snippet). */
const JSD_IFRAME_SCRIPT_SRC = "https://jsd-widget.atlassian.com/assets/iframe.js";

const WIDGET_IFRAME_ID = "jsd-widget";
const WIDGET_IFRAME_NAME = "JSD widget";

let mountPromise: Promise<void> | null = null;

function isMobileUserAgent(): boolean {
  return typeof navigator !== "undefined" && navigator.userAgent.includes("Mobi");
}

/**
 * Resizes the outer iframe to match widget content (ported from Atlassian embed.js).
 */
class WidgetIframeSizer {
  constructor(
    private readonly iframeDoc: Document,
    private readonly setStyle: (prop: string, value: string) => void
  ) {
    const observer = new MutationObserver(
      isMobileUserAgent()
        ? () => this.mobileMutationCallback()
        : () => this.desktopMutationCallback()
    );
    observer.observe(this.iframeDoc.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  }

  private desktopMutationCallback() {
    if (this.iframeDoc.querySelector(".expanded")) {
      this.setStyle("transition", "height 1s");
    } else {
      this.setStyle("transition", "height 0s");
    }
    this.setSizeToFitContent();
  }

  private mobileMutationCallback() {
    if (this.iframeDoc.querySelector("#help-button")) {
      this.setSizeToFitContent();
    } else {
      this.setSizeToFullScreen();
    }
  }

  private setSizeToFitContent() {
    const root = this.iframeDoc.querySelector("#react-root");
    if (root) {
      this.setStyle("height", "1px");
      this.setStyle("width", "1px");
      this.setStyle("height", `${root.clientHeight + 10}px`);
      this.setStyle("width", `${this.iframeDoc.body.scrollWidth + 10}px`);
    }
  }

  private setSizeToFullScreen() {
    this.setStyle("height", "100%");
    this.setStyle("width", "100%");
  }
}

/**
 * Host iframe + inner document bootstrap (same behavior as jsd-widget embed.js after DOMContentLoaded).
 * Dynamic injection of embed.js does not work: it only listens for DOMContentLoaded, which has already fired.
 */
class JsdWidgetHost {
  private readonly el: HTMLIFrameElement;
  private readonly iframeDocument: Document;

  constructor(
    iframeJsSrc: string,
    embeddable: { key: string; jsdEmbedded: string; baseUrl: string }
  ) {
    const { iframe, doc } = this.createAndInsertIframe(document.body);
    this.el = iframe;
    this.iframeDocument = doc;
    this.applyCss();
    this.writeDocument(iframeJsSrc, embeddable);
    new WidgetIframeSizer(this.iframeDocument, this.css.bind(this));
  }

  private createAccessibilityDescription(parent: HTMLElement) {
    const d = document.createElement("div");
    d.id = "jsd-widget-description";
    d.setAttribute("aria-hidden", "true");
    d.style.position = "absolute";
    d.style.left = "-10000px";
    d.style.width = "1px";
    d.style.height = "1px";
    d.style.overflow = "hidden";
    d.textContent = "Jira Service Management Widget";
    parent.appendChild(d);
  }

  private createAndInsertIframe(parent: HTMLElement): {
    iframe: HTMLIFrameElement;
    doc: Document;
  } {
    this.createAccessibilityDescription(parent);
    const iframe = document.createElement("iframe");
    iframe.scrolling = "no";
    iframe.name = WIDGET_IFRAME_NAME;
    iframe.id = WIDGET_IFRAME_ID;
    iframe.title = WIDGET_IFRAME_NAME;
    iframe.setAttribute("aria-label", WIDGET_IFRAME_NAME);
    iframe.setAttribute("role", "application");
    iframe.setAttribute("aria-describedby", "jsd-widget-description");
    iframe.setAttribute("tabindex", "0");
    parent.appendChild(iframe);
    const win = iframe.contentWindow;
    if (!win) {
      throw new Error("Can't setup jsd-widget iframe");
    }
    return { iframe, doc: win.document };
  }

  private applyCss() {
    this.css("height", "1px");
    this.css("width", "1px");
    this.css("position", "fixed");
    this.css("border", "0");
    this.css("bottom", "0");
    this.css("right", "0");
    this.css("z-index", "9999999999999");
    this.css("outline", "none");
    this.css("background", "transparent");
  }

  private writeDocument(
    iframeJsSrc: string,
    embeddable: { key: string; jsdEmbedded: string; baseUrl: string }
  ) {
    const scriptTag = `<script type="application/javascript" src="${iframeJsSrc}"><\/script>`;
    /** Must be a single-quoted HTML attribute value; bare JSON breaks parsing at the first `"`. */
    const embedPayload = JSON.stringify(embeddable);
    this.iframeDocument.open();
    this.iframeDocument.write(`<html>
                <head><base href='${embeddable.baseUrl}' /></head>
                <body data-embeddable='${embedPayload}'>
                    <div id="react-root" role="main" aria-label="Help Center Widget Content"></div>
                    ${scriptTag}
                </body>
             </html>`);
    this.iframeDocument.close();
  }

  private css(prop: string, value: string) {
    this.el.style.setProperty(prop, value);
  }
}

/**
 * Mounts the Jira Service Management help widget once (equivalent to the official embed snippet).
 * Does not load embed.js: that script only runs its initializer on DOMContentLoaded, so late injection never mounts the widget.
 */
export function ensureAtlassianJsdEmbedScript(): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  if (document.querySelector(`iframe#${WIDGET_IFRAME_ID}`)) {
    return Promise.resolve();
  }

  if (mountPromise) {
    return mountPromise;
  }

  mountPromise = new Promise((resolve, reject) => {
    try {
      if (document.querySelector(`iframe#${WIDGET_IFRAME_ID}`)) {
        resolve();
        return;
      }
      new JsdWidgetHost(JSD_IFRAME_SCRIPT_SRC, {
        key: JSD_KEY,
        jsdEmbedded: "",
        baseUrl: JSD_BASE_URL,
      });
      resolve();
    } catch (e) {
      mountPromise = null;
      reject(
        e instanceof Error ? e : new Error("Failed to mount Jira Service Desk widget")
      );
    }
  });

  return mountPromise;
}

/**
 * Clicks the in-iframe launcher once it exists (same-origin `about:blank` document written by the host).
 * The outer page cannot open the panel without this—the widget only shows a small control until clicked.
 */
function clickJsdHelpButtonWhenReady(maxWaitMs = 20000): Promise<void> {
  return new Promise((resolve) => {
    const deadline = Date.now() + maxWaitMs;

    const tick = () => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        `iframe#${WIDGET_IFRAME_ID}`
      );
      if (!iframe) {
        if (Date.now() < deadline) {
          setTimeout(tick, 50);
        } else {
          resolve();
        }
        return;
      }

      try {
        const btn = iframe.contentDocument?.querySelector<HTMLElement>(
          "#help-button"
        );
        if (btn) {
          btn.click();
          resolve();
          return;
        }
      } catch {
        // Document closed or inaccessible
      }

      if (Date.now() < deadline) {
        setTimeout(tick, 50);
      } else {
        resolve();
      }
    };

    tick();
  });
}

/** Mounts the widget (if needed) and opens the help / request panel. */
export async function openAtlassianSupportWidget(): Promise<void> {
  await ensureAtlassianJsdEmbedScript();
  await clickJsdHelpButtonWhenReady();
}
