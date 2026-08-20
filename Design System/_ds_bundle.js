/* @ds-bundle: {"format":4,"namespace":"LaRatatouilleDesignSystem_9f9119","components":[{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"InfoRow","sourcePath":"components/content/InfoRow.jsx"},{"name":"MenuItem","sourcePath":"components/content/MenuItem.jsx"},{"name":"Quote","sourcePath":"components/content/Quote.jsx"},{"name":"SectionHeading","sourcePath":"components/content/SectionHeading.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Rule","sourcePath":"components/core/Rule.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Notice","sourcePath":"components/feedback/Notice.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Label","sourcePath":"components/forms/Input.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"assets/image-slot.js":"fff26d081c8d","components/content/Card.jsx":"224eabc8e98c","components/content/InfoRow.jsx":"0ed7fe208730","components/content/MenuItem.jsx":"bb7b1f928667","components/content/Quote.jsx":"9c38c3755a7f","components/content/SectionHeading.jsx":"bdc927a75412","components/core/Button.jsx":"8afe2cefe5ae","components/core/Icon.jsx":"71804512cb26","components/core/IconButton.jsx":"b8a64503b04e","components/core/Logo.jsx":"068c1f526755","components/core/Rule.jsx":"aad28e256015","components/core/Tag.jsx":"8285455c3219","components/core/Wordmark.jsx":"c48888173a5b","components/feedback/Dialog.jsx":"4493cc7f9ecf","components/feedback/Notice.jsx":"e835fb06a59b","components/forms/Checkbox.jsx":"6636e19114e4","components/forms/Input.jsx":"1eb8b0e94357","components/forms/RadioGroup.jsx":"89499f25008f","components/forms/Select.jsx":"b8bb665c9b0d","components/forms/Textarea.jsx":"098ec9e5d3e8","components/navigation/NavBar.jsx":"6114d85e2add","components/navigation/Tabs.jsx":"1c6088b9422e","ui_kits/website/HomeScreen.jsx":"6db6019d453a","ui_kits/website/HouseScreen.jsx":"93f4105e44b2","ui_kits/website/MenuScreen.jsx":"a1c9a7548707","ui_kits/website/ReserveScreen.jsx":"4f69c454770d","ui_kits/website/Shell.jsx":"84cc9e4048fe"},"inlinedExternals":[],"unexposedExports":[{"name":"fieldShell","sourcePath":"components/forms/Input.jsx"}]} */

(() => {

const __ds_ns = (window.LaRatatouilleDesignSystem_9f9119 = window.LaRatatouilleDesignSystem_9f9119 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }

    // A src write is a newer intent for this slot's content — the host
    // pick path (setImageSlotImage) or an agent edit — so it must win
    // over any encode still in flight from an earlier drop: left live,
    // that encode lands later, passes _ingest's gen guard, and its
    // setSlot silently overwrites the pick (the stored value shadows
    // src in _render). Bumping _gen kills the encode before its own
    // _swapGen clear runs, so clear the dead claim here too — otherwise
    // _releaseMask (gated on !_swapGen) never fires and the pick's
    // spinner is stranded. src ONLY: the pick sets credit/credit-href
    // in the same task, and clearing _swapGen on those would let the
    // same-src branch unmask the old image mid-encode.
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal) {
        this._gen++;
        this._swapGen = 0;
      }
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/image-slot.js", error: String((e && e.message) || e) }); }

// components/content/Card.jsx
try { (() => {
function Card({
  children,
  imageSrc,
  imageAlt = '',
  imageHeight = 220,
  eyebrow,
  title,
  footer,
  href,
  variant = 'outline',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const skins = {
    outline: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      boxShadow: 'none'
    },
    raised: {
      background: 'var(--surface-card)',
      border: '1px solid transparent',
      boxShadow: 'var(--shadow-md)'
    },
    plain: {
      background: 'transparent',
      border: '1px solid transparent',
      boxShadow: 'none'
    }
  }[variant];
  const Tag = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
      ...skins,
      ...(href && hover ? {
        boxShadow: 'var(--shadow-md)',
        transform: 'var(--motion-lift)',
        borderColor: 'var(--border-hairline)'
      } : null),
      ...style
    }
  }, imageSrc && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: imageHeight,
      overflow: 'hidden',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: imageSrc,
    alt: imageAlt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform var(--dur-slow) var(--ease-out)',
      transform: href && hover ? 'scale(1.03)' : 'none'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-12)',
      padding: variant === 'plain' ? '0' : 'var(--space-24)',
      paddingTop: imageSrc ? 'var(--space-24)' : undefined
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-subhead)',
      color: 'var(--text-heading)',
      margin: 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-muted)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-8)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/Quote.jsx
try { (() => {
function Quote({
  children,
  attribution,
  source,
  tone = 'default',
  align = 'left',
  style
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-16)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      font: 'var(--fw-regular) clamp(1.5rem,3vw,2.125rem)/1.32 var(--font-display)',
      color: inverse ? 'var(--text-on-inverse)' : 'var(--text-heading)',
      maxWidth: '30ch',
      textWrap: 'balance'
    }
  }, children), (attribution || source) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)',
      font: 'var(--type-caption)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--pine-200)' : 'var(--text-faint)'
    }
  }, attribution, source && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 1,
      background: 'currentColor',
      opacity: 0.5
    }
  }), source)));
}
Object.assign(__ds_scope, { Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Quote.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'default',
  rule = true,
  style
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-16)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--sage-300)' : 'var(--text-accent)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-section)',
      color: inverse ? 'var(--text-on-inverse)' : 'var(--text-heading)',
      margin: 0,
      maxWidth: '22ch'
    }
  }, title), rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 2,
      background: 'var(--gilt-500)'
    }
  }), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: inverse ? 'var(--text-on-inverse-muted)' : 'var(--text-muted)',
      margin: 0,
      maxWidth: '52ch'
    }
  }, intro));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  fontFamily: 'var(--font-body)',
  fontWeight: 'var(--fw-semibold)',
  letterSpacing: 'var(--ls-caps)',
  textTransform: 'uppercase',
  border: '1px solid transparent',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'var(--transition-control)'
};
const sizes = {
  sm: {
    height: 'var(--control-h-sm)',
    padding: '0 18px',
    fontSize: '11px'
  },
  md: {
    height: 'var(--control-h-md)',
    padding: '0 26px',
    fontSize: 'var(--fs-caption)'
  },
  lg: {
    height: 'var(--control-h-lg)',
    padding: '0 34px',
    fontSize: 'var(--fs-body-sm)'
  }
};
const variants = {
  primary: {
    background: 'var(--surface-accent)',
    color: 'var(--text-on-accent)'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--text-heading)',
    borderColor: 'var(--border-strong)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-heading)'
  },
  inverse: {
    background: 'var(--linen-050)',
    color: 'var(--pine-800)'
  },
  'inverse-outline': {
    background: 'transparent',
    color: 'var(--text-on-inverse)',
    borderColor: 'var(--border-inverse)'
  }
};
const hovers = {
  primary: {
    background: 'var(--pine-800)'
  },
  secondary: {
    borderColor: 'var(--pine-600)',
    color: 'var(--pine-700)'
  },
  ghost: {
    color: 'var(--pine-700)'
  },
  inverse: {
    background: 'var(--linen-200)'
  },
  'inverse-outline': {
    borderColor: 'var(--linen-100)',
    background: 'color-mix(in oklab, var(--linen-100) 10%, transparent)'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href && !disabled ? 'a' : 'button';
  const css = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    width: fullWidth ? '100%' : undefined,
    transform: press && !disabled ? 'var(--motion-press)' : 'none',
    opacity: disabled ? 0.42 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderBottomWidth: '1px',
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    type: Tag === 'button' ? type : undefined,
    disabled: Tag === 'button' ? disabled : undefined,
    onClick: disabled ? undefined : onClick,
    style: css,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = 'https://unpkg.com/lucide-static@0.441.0/icons/';

/** Lucide glyph rendered as a CSS mask so it inherits currentColor. */
function Icon({
  name,
  size = 18,
  strokeColor = 'currentColor',
  style,
  ...rest
}) {
  const url = `url("${CDN}${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flex: '0 0 auto',
      background: strokeColor,
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/content/InfoRow.jsx
try { (() => {
function InfoRow({
  icon,
  label,
  children,
  tone = 'default',
  style
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-16)',
      alignItems: 'flex-start',
      padding: 'var(--space-12) 0',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 17,
    style: {
      marginTop: 4,
      background: inverse ? 'var(--sage-300)' : 'var(--pine-600)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--pine-200)' : 'var(--text-faint)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      color: inverse ? 'var(--text-on-inverse)' : 'var(--text-body)'
    }
  }, children)));
}
Object.assign(__ds_scope, { InfoRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/InfoRow.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  name,
  label,
  size = 'md',
  variant = 'ghost',
  onClick,
  href,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const box = {
    sm: 36,
    md: 44,
    lg: 52
  }[size];
  const glyph = {
    sm: 16,
    md: 18,
    lg: 22
  }[size];
  const skins = {
    ghost: {
      background: 'transparent',
      color: 'var(--text-heading)',
      borderColor: 'transparent'
    },
    outline: {
      background: 'var(--surface-raised)',
      color: 'var(--text-heading)',
      borderColor: 'var(--border-hairline)'
    },
    filled: {
      background: 'var(--surface-accent)',
      color: 'var(--text-on-accent)',
      borderColor: 'transparent'
    },
    inverse: {
      background: 'transparent',
      color: 'var(--text-on-inverse)',
      borderColor: 'transparent'
    }
  };
  const hoverSkins = {
    ghost: {
      color: 'var(--pine-700)'
    },
    outline: {
      borderColor: 'var(--pine-600)',
      color: 'var(--pine-700)'
    },
    filled: {
      background: 'var(--pine-800)'
    },
    inverse: {
      color: 'var(--sage-300)'
    }
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    type: href ? undefined : 'button',
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: box,
      height: box,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      padding: 0,
      transition: 'var(--transition-control)',
      ...skins[variant],
      ...(hover ? hoverSkins[variant] : null),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: glyph
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
/** Monogram roundel: LR in Marcellus inside a double gilt ring. */
function Logo({
  size = 64,
  tone = 'default',
  style
}) {
  const ink = tone === 'inverse' ? 'var(--linen-100)' : 'var(--pine-800)';
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": "La Ratatouille",
    style: {
      width: size,
      height: size,
      flex: '0 0 auto',
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      border: `${Math.max(1, Math.round(size * 0.012))}px solid var(--gilt-500)`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: Math.max(2, Math.round(size * 0.036)),
      borderRadius: '50%',
      border: '1px solid var(--gilt-500)',
      opacity: 0.6
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: size * 0.34,
      letterSpacing: '0.06em',
      color: ink,
      transform: 'translate(0.03em,-0.06em)'
    }
  }, "LR"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: size * 0.16,
      left: '50%',
      width: size * 0.045,
      height: size * 0.045,
      transform: 'translateX(-50%) rotate(45deg)',
      background: 'var(--gilt-500)'
    }
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Rule.jsx
try { (() => {
function Rule({
  variant = 'hairline',
  tone = 'default',
  style
}) {
  const line = tone === 'inverse' ? 'var(--border-inverse)' : 'var(--border-hairline)';
  const gilt = 'var(--gilt-500)';
  if (variant === 'ornament') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 1,
        background: line
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 5,
        height: 5,
        transform: 'rotate(45deg)',
        background: gilt,
        opacity: 0.8
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 1,
        background: line
      }
    }));
  }
  if (variant === 'short') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        width: 56,
        height: 2,
        background: gilt,
        ...style
      }
    });
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: 1,
      width: '100%',
      background: line,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Rule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Rule.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  children,
  tone = 'neutral',
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      background: 'transparent',
      color: 'var(--text-muted)',
      borderColor: 'var(--border-hairline)'
    },
    gold: {
      background: 'var(--gilt-200)',
      color: 'var(--pine-800)',
      borderColor: 'transparent'
    },
    sage: {
      background: 'var(--surface-sage-soft)',
      color: 'var(--sage-800)',
      borderColor: 'transparent'
    },
    pine: {
      background: 'var(--pine-100)',
      color: 'var(--pine-700)',
      borderColor: 'transparent'
    },
    inverse: {
      background: 'color-mix(in oklab, var(--linen-100) 14%, transparent)',
      color: 'var(--text-on-inverse)',
      borderColor: 'var(--border-inverse)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 10px',
      border: '1px solid',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      ...tones,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/MenuItem.jsx
try { (() => {
function MenuItem({
  name,
  description,
  price,
  tags = [],
  origin,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      padding: 'var(--space-20) 0',
      borderBottom: '1px solid var(--border-hairline)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-subhead)',
      color: 'var(--text-heading)',
      margin: 0
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      borderBottom: '1px dotted var(--border-strong)',
      opacity: 0.5,
      transform: 'translateY(-4px)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-price)',
      color: 'var(--text-heading)',
      fontVariantNumeric: 'lining-nums tabular-nums'
    }
  }, price)), description && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-muted)',
      margin: 0,
      maxWidth: '58ch'
    }
  }, description), (tags.length > 0 || origin) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)',
      flexWrap: 'wrap',
      marginTop: 'var(--space-4)'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t,
    tone: "sage"
  }, t)), origin && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-faint)',
      fontStyle: 'italic'
    }
  }, origin)));
}
Object.assign(__ds_scope, { MenuItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/MenuItem.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
function Wordmark({
  size = 28,
  tone = 'default',
  subtitle = 'Cocina mediterránea',
  showSubtitle = true,
  style
}) {
  const tones = {
    default: {
      name: 'var(--pine-800)',
      sub: 'var(--text-muted)',
      rule: 'var(--gilt-500)'
    },
    inverse: {
      name: 'var(--linen-100)',
      sub: 'var(--pine-200)',
      rule: 'var(--gilt-500)'
    },
    mono: {
      name: 'currentColor',
      sub: 'currentColor',
      rule: 'currentColor'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: Math.round(size * 0.18),
      lineHeight: 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: size,
      letterSpacing: '0.04em',
      color: tones.name,
      whiteSpace: 'nowrap'
    }
  }, "La Ratatouille"), showSubtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: Math.round(size * 0.32),
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: tones.rule,
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: Math.max(8, Math.round(size * 0.3)),
      fontWeight: 'var(--fw-medium)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: tones.sub,
      whiteSpace: 'nowrap'
    }
  }, subtitle), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: tones.rule,
      opacity: 0.55
    }
  })));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open = false,
  title,
  eyebrow,
  children,
  footer,
  onClose,
  width = 520
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-24)',
      background: 'var(--veil-dark)',
      backdropFilter: 'blur(3px)',
      animation: `fade var(--dur-base) var(--ease-standard)`
    },
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      padding: 'var(--space-32)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-20)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 'var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h2)',
      lineHeight: 'var(--lh-heading)',
      color: 'var(--text-heading)',
      margin: 0
    }
  }, title)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Schlie\xDFen",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 6,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 18,
    style: {
      background: 'var(--text-muted)'
    }
  }))), /*#__PURE__*/React.createElement(__ds_scope.Rule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-12)',
      justifyContent: 'flex-end'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Notice.jsx
try { (() => {
function Notice({
  children,
  title,
  tone = 'info',
  icon,
  onDismiss,
  style
}) {
  const tones = {
    info: {
      background: 'var(--surface-sunken)',
      border: 'var(--border-hairline)',
      accent: 'var(--ink-500)',
      glyph: icon || 'info'
    },
    success: {
      background: 'var(--surface-sage-soft)',
      border: 'transparent',
      accent: 'var(--sage-600)',
      glyph: icon || 'check'
    },
    notice: {
      background: 'color-mix(in oklab, var(--gilt-200) 55%, var(--linen-050))',
      border: 'transparent',
      accent: 'var(--gilt-500)',
      glyph: icon || 'bell'
    },
    danger: {
      background: 'color-mix(in oklab, var(--state-danger) 8%, var(--linen-050))',
      border: 'transparent',
      accent: 'var(--state-danger)',
      glyph: icon || 'triangle-alert'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      gap: 'var(--space-12)',
      alignItems: 'flex-start',
      padding: 'var(--space-16) var(--space-20)',
      background: tones.background,
      border: `1px solid ${tones.border}`,
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: tones.glyph,
    size: 17,
    style: {
      marginTop: 3,
      background: tones.accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h4)',
      color: 'var(--text-heading)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-sm, var(--type-body))',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-body-sm)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-body)'
    }
  }, children)), onDismiss && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDismiss,
    "aria-label": "Schlie\xDFen",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 4,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 15,
    style: {
      background: 'var(--text-faint)'
    }
  })));
}
Object.assign(__ds_scope, { Notice });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Notice.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  description,
  checked,
  onChange,
  id,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'flex',
      gap: 'var(--space-12)',
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      minHeight: 'var(--hit-min)',
      padding: 'var(--space-6) 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked, e),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: '0 0 auto',
      marginTop: 2,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      borderColor: checked ? 'var(--pine-700)' : 'var(--border-strong)',
      background: checked ? 'var(--pine-700)' : 'var(--surface-raised)',
      borderRadius: 'var(--radius-sm)',
      transition: 'var(--transition-control)'
    }
  }, checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    strokeColor: "var(--text-on-accent)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-faint)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fieldShell = {
  width: '100%',
  font: 'var(--type-body)',
  color: 'var(--text-body)',
  background: 'var(--surface-raised)',
  border: '1px solid var(--border-hairline)',
  borderRadius: 'var(--radius-sm)',
  padding: '0 var(--field-pad-x)',
  transition: 'var(--transition-control)',
  outline: 'none'
};
function Label({
  htmlFor,
  children,
  hint
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, children), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-faint)'
    }
  }, hint));
}
function Input({
  label,
  hint,
  error,
  id,
  type = 'text',
  size = 'md',
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'lg' ? 'var(--control-h-lg)' : size === 'sm' ? 'var(--control-h-sm)' : 'var(--control-h-md)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement(Label, {
    htmlFor: id,
    hint: hint
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...fieldShell,
      height: h,
      borderColor: error ? 'var(--state-danger)' : focus ? 'var(--pine-600)' : 'var(--border-hairline)',
      boxShadow: focus ? 'var(--ring-focus)' : 'none'
    }
  }, rest)), error && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--state-danger)'
    }
  }, error));
}
Object.assign(__ds_scope, { fieldShell, Label, Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
function RadioGroup({
  label,
  name,
  options = [],
  value,
  onChange,
  layout = 'row',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-12)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement(__ds_scope.Label, null, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: layout === 'row' ? 'row' : 'column',
      gap: layout === 'row' ? 'var(--space-8)' : 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const text = typeof o === 'string' ? o : o.label;
    const active = value === v;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      role: "radio",
      "aria-checked": active,
      name: name,
      onClick: () => onChange && onChange(v),
      style: {
        minHeight: 'var(--control-h-md)',
        padding: '0 20px',
        cursor: 'pointer',
        font: 'var(--type-body-sm, var(--type-body))',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-body-sm)',
        border: '1px solid',
        borderRadius: 'var(--radius-sm)',
        transition: 'var(--transition-control)',
        borderColor: active ? 'var(--pine-600)' : 'var(--border-hairline)',
        background: active ? 'var(--surface-accent-soft)' : 'var(--surface-raised)',
        color: active ? 'var(--pine-800)' : 'var(--text-body)'
      }
    }, text);
  })));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  id,
  options = [],
  size = 'md',
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'lg' ? 'var(--control-h-lg)' : size === 'sm' ? 'var(--control-h-sm)' : 'var(--control-h-md)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement(__ds_scope.Label, {
    htmlFor: id,
    hint: hint
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: id,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...__ds_scope.fieldShell,
      height: h,
      appearance: 'none',
      paddingRight: 40,
      cursor: 'pointer',
      borderColor: focus ? 'var(--pine-600)' : 'var(--border-hairline)',
      boxShadow: focus ? 'var(--ring-focus)' : 'none'
    }
  }, rest), options.map(o => {
    const value = typeof o === 'string' ? o : o.value;
    const text = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, text);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'var(--text-muted)',
      pointerEvents: 'none'
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  label,
  hint,
  id,
  rows = 4,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement(__ds_scope.Label, {
    htmlFor: id,
    hint: hint
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: id,
    rows: rows,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...__ds_scope.fieldShell,
      padding: 'var(--space-12) var(--field-pad-x)',
      resize: 'vertical',
      lineHeight: 'var(--lh-body)',
      fontFamily: 'var(--font-body)',
      borderColor: focus ? 'var(--pine-600)' : 'var(--border-hairline)',
      boxShadow: focus ? 'var(--ring-focus)' : 'none'
    }
  }, rest)));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function NavBar({
  links = [],
  activeHref,
  cta,
  tone = 'light',
  sticky = true,
  onNavigate,
  style
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: sticky ? 'sticky' : 'relative',
      top: 0,
      zIndex: 40,
      background: dark ? 'var(--veil-dark)' : 'var(--veil-light)',
      backdropFilter: 'var(--blur-veil)',
      WebkitBackdropFilter: 'var(--blur-veil)',
      borderBottom: `1px solid ${dark ? 'var(--border-inverse)' : 'var(--border-hairline)'}`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      height: 84,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-32)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('#top');
    },
    style: {
      border: 'none',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: 20,
    tone: dark ? 'inverse' : 'default',
    showSubtitle: false
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-32)'
    }
  }, links.map(l => {
    const active = l.href === activeHref;
    return /*#__PURE__*/React.createElement("a", {
      key: l.href,
      href: l.href,
      onClick: e => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate(l.href);
        }
      },
      style: {
        border: 'none',
        paddingBottom: 2,
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-caption)',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: 'var(--ls-caps)',
        textTransform: 'uppercase',
        color: dark ? active ? 'var(--linen-050)' : 'var(--pine-200)' : active ? 'var(--text-heading)' : 'var(--text-muted)',
        borderBottom: `1px solid ${active ? 'var(--pine-600)' : 'transparent'}`
      }
    }, l.label);
  }), cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: dark ? 'inverse' : 'primary',
    href: cta.href,
    onClick: cta.onClick
  }, cta.label), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    name: "phone",
    label: "Anrufen",
    size: "sm",
    variant: dark ? 'inverse' : 'ghost'
  }))));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  onChange,
  align = 'left',
  tone = 'default',
  style
}) {
  const inverse = tone === 'inverse';
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 'var(--space-32)',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      borderBottom: `1px solid ${inverse ? 'var(--border-inverse)' : 'var(--border-hairline)'}`,
      ...style
    }
  }, items.map(it => {
    const v = typeof it === 'string' ? it : it.value;
    const text = typeof it === 'string' ? it : it.label;
    const active = value === v;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": active,
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        appearance: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0 0 var(--space-12)',
        marginBottom: -1,
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-caption)',
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--ls-caps)',
        textTransform: 'uppercase',
        color: active ? inverse ? 'var(--text-on-inverse)' : 'var(--text-heading)' : inverse ? 'var(--pine-200)' : 'var(--text-faint)',
        borderBottom: `2px solid ${active ? 'var(--pine-600)' : 'transparent'}`,
        transition: 'var(--transition-control)'
      }
    }, text);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const {
  Button,
  SectionHeading,
  MenuItem,
  Card,
  Quote,
  Rule,
  Tag,
  InfoRow
} = window.LaRatatouilleDesignSystem_9f9119;
function HomeScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    slot: "hero-home",
    label: "Hero \u2014 Terrasse am Abend",
    eyebrow: "Sanet y Negrals \xB7 Marina Alta",
    title: "Ehrliche, spezielle Mittelmeerk\xFCche",
    sub: "Zwei Deutsche, eine offene K\xFCche in Spanien und vierundzwanzig Pl\xE4tze. Wir kochen, was der Markt am Morgen hergibt.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "inverse",
      onClick: () => onNavigate('/reservieren')
    }, "Tisch reservieren"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "inverse-outline",
      onClick: () => onNavigate('/karte')
    }, "Zur Karte"))
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(32px,6vw,88px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-24)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Das Haus",
    title: "Klein, warm, konsequent",
    intro: "Wir haben in Deutschland gelernt zu kochen und in Spanien gelernt zu wirten."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, "Die Karte wechselt alle zwei Wochen, weil sich der Markt alle zwei Wochen \xE4ndert. Was bleibt, sind die gegrillten Sardinen und die Aubergine \u2014 daran messen uns unsere G\xE4ste, und das ist uns recht."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onNavigate('/haus')
  }, "\xDCber uns"))), /*#__PURE__*/React.createElement(Placeholder, {
    slot: "home-kueche",
    height: 480,
    label: "Foto \u2014 die offene K\xFCche",
    rounded: true
  }))), /*#__PURE__*/React.createElement(Section, {
    tone: "card"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "Aus der K\xFCche",
    title: "Vier Gerichte, die immer bleiben",
    intro: "Ein Auszug. Die vollst\xE4ndige Karte \xE4ndert sich alle zwei Wochen.",
    style: {
      marginBottom: 'var(--space-40)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0 clamp(32px,6vw,72px)'
    }
  }, /*#__PURE__*/React.createElement(MenuItem, {
    name: "Sardinen vom Grill",
    price: "14 \u20AC",
    description: "Mit Zitrone, Meersalz und ger\xF6stetem Brot.",
    origin: "Fisch aus der Lonja de D\xE9nia"
  }), /*#__PURE__*/React.createElement(MenuItem, {
    name: "Gebratene Auberginen",
    price: "16 \u20AC",
    description: "Ras el Hanout, Joghurt, Granatapfel.",
    tags: ["Vegetarisch"]
  }), /*#__PURE__*/React.createElement(MenuItem, {
    name: "Seehecht in Fenchelbutter",
    price: "26 \u20AC",
    description: "Kartoffeln aus Galicien, Zitronenthymian."
  }), /*#__PURE__*/React.createElement(MenuItem, {
    name: "Lammschulter, 6 Stunden",
    price: "29 \u20AC",
    description: "Auberginenp\xFCree, Minze, Granatapfelsud.",
    tags: ["Signature"]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 'var(--space-40)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => onNavigate('/karte')
  }, "Ganze Karte ansehen"))), /*#__PURE__*/React.createElement(Section, {
    tone: "inverse"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(32px,6vw,88px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Quote, {
    tone: "inverse",
    attribution: "Marta R.",
    source: "Google"
  }, "Man merkt in jedem Gang, dass hier zwei Leute kochen, die es ernst meinen."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoRow, {
    icon: "calendar",
    label: "Donnerstags",
    tone: "inverse"
  }, "Mittelmeer-Men\xFC, 6 G\xE4nge \u2014 68 \u20AC"), /*#__PURE__*/React.createElement(Rule, {
    tone: "inverse"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "wine",
    label: "Letzter Freitag im Monat",
    tone: "inverse"
  }, "Weinabend mit Winzern aus Alicante und der Marina Alta"), /*#__PURE__*/React.createElement(Rule, {
    tone: "inverse"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "users",
    label: "Ganzes Haus",
    tone: "inverse"
  }, "Private Dinner ab 18 Personen, auf Anfrage")))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Abende",
    title: "Was demn\xE4chst ansteht",
    style: {
      marginBottom: 'var(--space-32)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--grid-gap)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    href: "#",
    eyebrow: "4. September",
    title: "Mittelmeer-Men\xFC, 6 G\xE4nge",
    imageSrc: null,
    footer: /*#__PURE__*/React.createElement(Tag, {
      tone: "gold"
    }, "Wenige Pl\xE4tze")
  }, "Sechs G\xE4nge quer durchs Mittelmeer, mit Weinbegleitung auf Wunsch. 19:30."), /*#__PURE__*/React.createElement(Card, {
    href: "#",
    eyebrow: "26. September",
    title: "Weinabend Marina Alta",
    footer: /*#__PURE__*/React.createElement(Tag, {
      tone: "sage"
    }, "Pl\xE4tze frei")
  }, "F\xFCnf Winzer, acht Weine, kleine Teller aus der K\xFCche. 20:00."), /*#__PURE__*/React.createElement(Card, {
    href: "#",
    eyebrow: "12. Oktober",
    title: "Markt & Kochen",
    footer: /*#__PURE__*/React.createElement(Tag, null, "Warteliste")
  }, "Morgens auf den Markt in Ondara, mittags gemeinsam kochen und essen."))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HouseScreen.jsx
try { (() => {
const {
  SectionHeading,
  Quote,
  Rule,
  InfoRow,
  Card,
  Button
} = window.LaRatatouilleDesignSystem_9f9119;
function HouseScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    slot: "hero-haus",
    label: "Hero \u2014 das Haus",
    height: 480,
    eyebrow: "Das Haus",
    title: "Zwei Deutsche, eine spanische K\xFCche",
    sub: "Eine offene K\xFCche, vierundzwanzig Pl\xE4tze, mitten in der Calle Mayor von Sanet y Negrals."
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(32px,6vw,88px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-20)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Wie es anfing",
    title: "Aus Deutschland in die Marina Alta"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, "Wir sind gekommen, um ein halbes Jahr zu bleiben. Dann stand das Haus in der Calle Mayor leer \u2014 vierundzwanzig Pl\xE4tze, eine Terrasse zur Stra\xDFe, ein Dorf, das uns gelassen aufgenommen hat."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, "Was wir aus Deutschland mitgebracht haben, ist die Genauigkeit. Was wir hier gelernt haben, ist der lange Abend: dass G\xE4ste bleiben d\xFCrfen, bis die K\xFCche l\xE4ngst geputzt ist."), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(Rule, {
    variant: "short"
  }))), /*#__PURE__*/React.createElement(Placeholder, {
    slot: "haus-portraet",
    height: 420,
    label: "Portr\xE4t \u2014 die Gastgeber",
    rounded: true
  }))), /*#__PURE__*/React.createElement(Section, {
    tone: "card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--grid-gap)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "plain",
    eyebrow: "Markt",
    title: "Jeden Morgen um sieben"
  }, "Fisch aus der Lonja de D\xE9nia, Gem\xFCse vom Wochenmarkt in Ondara. Was nicht gut aussieht, kaufen wir nicht."), /*#__PURE__*/React.createElement(Card, {
    variant: "plain",
    eyebrow: "K\xFCche",
    title: "Offen zum Gastraum"
  }, "Sie sehen, was mit Ihrem Essen passiert. Und wir sehen, wie es Ihnen schmeckt."), /*#__PURE__*/React.createElement(Card, {
    variant: "plain",
    eyebrow: "Haltung",
    title: "Keine Show"
  }, "Kein Schaum, keine Pinzette. Daf\xFCr Fenchelbutter, die drei Tage gezogen hat."))), /*#__PURE__*/React.createElement(Section, {
    tone: "inverse"
  }, /*#__PURE__*/React.createElement(Quote, {
    tone: "inverse",
    align: "center",
    attribution: "Gu\xEDa de restaurantes",
    source: "Alicante"
  }, "Eine der wenigen K\xFCchen an der K\xFCste, die man nach dem ersten Bissen wiedererkennt.")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(32px,6vw,88px)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-24)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Kontakt",
    title: "Kommen Sie vorbei"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoRow, {
    icon: "map-pin",
    label: "Adresse"
  }, "Calle Mayor 14, 03769 Sanet y Negrals"), /*#__PURE__*/React.createElement(Rule, null), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "clock",
    label: "\xD6ffnungszeiten"
  }, "Mi \u2013 So, 19:00 \u2013 23:30", /*#__PURE__*/React.createElement("br", null), "Montag & Dienstag Ruhetag"), /*#__PURE__*/React.createElement(Rule, null), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "phone",
    label: "Telefon"
  }, "+34 966 408 326"), /*#__PURE__*/React.createElement(Rule, null), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "mail",
    label: "E-Mail"
  }, "info@laratatouille.es")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => onNavigate('/reservieren')
  }, "Tisch reservieren"))), /*#__PURE__*/React.createElement(Placeholder, {
    slot: "haus-lageplan",
    height: 380,
    label: "Karte / Lageplan",
    rounded: true
  }))));
}
Object.assign(window, {
  HouseScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HouseScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/MenuScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  SectionHeading,
  MenuItem,
  Tabs,
  Notice,
  Rule,
  Button,
  Tag
} = window.LaRatatouilleDesignSystem_9f9119;
const CARD = {
  'Vorspeisen': [{
    name: 'Sardinen vom Grill',
    price: '14 €',
    description: 'Mit Zitrone, Meersalz und geröstetem Brot.',
    origin: 'Fisch aus der Lonja de Dénia'
  }, {
    name: 'Gebratene Auberginen',
    price: '16 €',
    description: 'Ras el Hanout, Joghurt, Granatapfel.',
    tags: ['Vegetarisch']
  }, {
    name: 'Tomaten vom Feld, Anchovis',
    price: '13 €',
    description: 'Nur im Sommer, und nur wenn sie gut sind.'
  }, {
    name: 'Brot, Olivenöl, Oliven',
    price: '5 €',
    description: 'Sauerteig aus eigener Führung.',
    tags: ['Vegan'],
    origin: 'Olivenöl aus Baena'
  }],
  'Hauptgänge': [{
    name: 'Seehecht in Fenchelbutter',
    price: '26 €',
    description: 'Kartoffeln aus Galicien, Zitronenthymian.'
  }, {
    name: 'Lammschulter, 6 Stunden',
    price: '29 €',
    description: 'Auberginenpüree, Minze, Granatapfelsud.',
    tags: ['Signature']
  }, {
    name: 'Ratatouille, wie bei uns',
    price: '21 €',
    description: 'Langsam geschmort, mit Ei und Estragon.',
    tags: ['Vegetarisch']
  }, {
    name: 'Reis mit Artischocken',
    price: '24 €',
    description: 'Zwei Personen, 40 Minuten Wartezeit.',
    tags: ['Vegan']
  }],
  'Desserts': [{
    name: 'Crema catalana, gebrannt',
    price: '8 €',
    description: 'Mit Orangenschale und Zimt.'
  }, {
    name: 'Feigen in Rotwein',
    price: '9 €',
    description: 'Dazu Schafsjoghurt.',
    tags: ['Vegetarisch']
  }, {
    name: 'Schokolade & Olivenöl',
    price: '9 €',
    description: 'Mit Meersalz.'
  }],
  'Weine': [{
    name: 'Moscatell Sec, Marina Alta',
    price: '5,50 € / 28 €',
    description: 'Trocken ausgebaut, unser Hauswein aus dem Nachbardorf.'
  }, {
    name: 'Monastrell, Alicante',
    price: '7 € / 36 €',
    description: 'Dunkel, warm, mit Kräuternote.'
  }, {
    name: 'Cava Brut Nature',
    price: '6 € / 32 €',
    description: 'Ohne Dosage, drei Jahre auf der Hefe.'
  }]
};
function MenuScreen() {
  const [course, setCourse] = React.useState('Vorspeisen');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    tone: "card",
    style: {
      paddingBottom: 'var(--space-40)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "Die Karte \xB7 September",
    title: "Was heute auf den Tisch kommt",
    intro: "Alle zwei Wochen neu. Was wir nicht auf dem Markt bekommen, steht nicht auf der Karte."
  })), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 'var(--space-32)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: course,
    onChange: setCourse,
    align: "center",
    items: Object.keys(CARD),
    style: {
      marginBottom: 'var(--space-40)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto'
    }
  }, CARD[course].map(d => /*#__PURE__*/React.createElement(MenuItem, _extends({
    key: d.name
  }, d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: 'var(--space-40) auto 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-20)'
    }
  }, /*#__PURE__*/React.createElement(Notice, {
    tone: "info"
  }, "Alle Preise inkl. IVA. Allergene und Zusatzstoffe nennen wir Ihnen gern am Tisch \u2014 sagen Sie uns bitte vor der Bestellung, was Sie nicht essen k\xF6nnen."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-12)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    tone: "sage"
  }, "Vegetarisch"), /*#__PURE__*/React.createElement(Tag, {
    tone: "sage"
  }, "Vegan"), /*#__PURE__*/React.createElement(Tag, {
    tone: "gold"
  }, "Signature"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-faint)'
    }
  }, "Kennzeichnungen auf der Karte")))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-24)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Men\xFC",
    title: "Mittelmeer-Men\xFC, 6 G\xE4nge",
    rule: false,
    intro: "Donnerstags um 19:30, f\xFCr den ganzen Tisch. 68 \u20AC pro Person, mit Weinbegleitung 104 \u20AC."
  }), /*#__PURE__*/React.createElement(Rule, {
    variant: "ornament"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, null, "Men\xFCabend reservieren")))));
}
Object.assign(window, {
  MenuScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/MenuScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ReserveScreen.jsx
try { (() => {
const {
  SectionHeading,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Button,
  Notice,
  Dialog,
  InfoRow,
  Rule
} = window.LaRatatouilleDesignSystem_9f9119;
function ReserveScreen() {
  const [area, setArea] = React.useState('Terrasse');
  const [pax, setPax] = React.useState('2 Personen');
  const [time, setTime] = React.useState('20:00');
  const [news, setNews] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, {
    tone: "card",
    style: {
      paddingBottom: 'var(--space-40)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "Reservierung",
    title: "Einen Tisch f\xFCr Sie",
    intro: "Wir best\xE4tigen jede Anfrage pers\xF6nlich, meist innerhalb von zwei Stunden."
  })), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 'var(--space-32)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.35fr 1fr',
      gap: 'clamp(32px,6vw,72px)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setOpen(true);
    },
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-24)'
    }
  }, done && /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Notice, {
    tone: "success",
    title: "Tisch notiert",
    onDismiss: () => setDone(false)
  }, "Wir schicken Ihnen die Best\xE4tigung per E-Mail. Bis Freitag um ", time, ".")), /*#__PURE__*/React.createElement(Input, {
    id: "r-name",
    label: "Name",
    placeholder: "Ihr Name",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    id: "r-mail",
    label: "E-Mail",
    type: "email",
    hint: "f\xFCr die Best\xE4tigung",
    placeholder: "name@beispiel.de",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    id: "r-date",
    label: "Datum",
    type: "date",
    defaultValue: "2026-09-04"
  }), /*#__PURE__*/React.createElement(Select, {
    id: "r-time",
    label: "Uhrzeit",
    value: time,
    onChange: e => setTime(e.target.value),
    options: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
  }), /*#__PURE__*/React.createElement(Select, {
    id: "r-pax",
    label: "Personen",
    value: pax,
    onChange: e => setPax(e.target.value),
    options: ['1 Person', '2 Personen', '3 Personen', '4 Personen', '5 Personen', '6 Personen']
  }), /*#__PURE__*/React.createElement(Input, {
    id: "r-phone",
    label: "Telefon",
    hint: "optional",
    type: "tel",
    placeholder: "+34 \u2026"
  }), /*#__PURE__*/React.createElement(RadioGroup, {
    label: "Bereich",
    value: area,
    onChange: setArea,
    options: ['Innen', 'Terrasse', "Chef's Table"],
    style: {
      gridColumn: '1 / -1'
    }
  }), /*#__PURE__*/React.createElement(Textarea, {
    id: "r-notes",
    label: "Anmerkungen",
    hint: "optional",
    rows: 4,
    placeholder: "Allergien, Anlass, Kinderstuhl \u2026",
    style: {
      gridColumn: '1 / -1'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "r-news",
    checked: news,
    onChange: setNews,
    label: "Newsletter",
    description: "Alle vier Wochen, neue Karte und Weinabende."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      display: 'flex',
      gap: 'var(--space-16)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg"
  }, "Anfrage senden"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-faint)'
    }
  }, "F\xFCr Gruppen ab sechs Personen rufen Sie uns bitte an."))), /*#__PURE__*/React.createElement("aside", {
    style: {
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-32)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-subhead)',
      color: 'var(--text-heading)',
      margin: '0 0 var(--space-16)'
    }
  }, "Gut zu wissen"), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "clock",
    label: "\xD6ffnungszeiten"
  }, "Mi \u2013 So, 19:00 \u2013 23:30"), /*#__PURE__*/React.createElement(Rule, null), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "hourglass",
    label: "Wartezeit"
  }, "Wir halten Tische 20 Minuten frei."), /*#__PURE__*/React.createElement(Rule, null), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "baby",
    label: "Kinder"
  }, "Kinderstuhl und kleine Portionen, gern."), /*#__PURE__*/React.createElement(Rule, null), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "dog",
    label: "Hunde"
  }, "Auf der Terrasse willkommen."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-24)'
    }
  }, /*#__PURE__*/React.createElement(Notice, {
    tone: "notice"
  }, "Vom 6. bis 20. Januar haben wir Betriebsferien."))))), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    onClose: () => setOpen(false),
    eyebrow: "Reservierung pr\xFCfen",
    title: `Tisch für ${pax.split(' ')[0]}, Freitag ${time}`,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setOpen(false)
    }, "\xC4ndern"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setOpen(false);
        setDone(true);
      }
    }, "Best\xE4tigen"))
  }, "Bereich: ", area, ". Wir halten den Tisch 20 Minuten f\xFCr Sie frei und melden uns per E-Mail."));
}
Object.assign(window, {
  ReserveScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ReserveScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Shell.jsx
try { (() => {
// Kit-level pieces shared by the website screens. Loaded as text/babel; see index.html.
const {
  Wordmark,
  Logo,
  Button,
  IconButton,
  Rule,
  InfoRow,
  Icon,
  SectionHeading
} = window.LaRatatouilleDesignSystem_9f9119;
function Placeholder({
  slot,
  height = 420,
  label = 'Foto hier ablegen',
  rounded = false,
  ratio,
  style
}) {
  return /*#__PURE__*/React.createElement("image-slot", {
    id: slot,
    shape: rounded ? 'rounded' : 'rect',
    radius: rounded ? 8 : undefined,
    placeholder: label,
    style: {
      display: 'block',
      width: '100%',
      height,
      aspectRatio: ratio,
      ...style
    }
  });
}
function Section({
  children,
  tone = 'page',
  id,
  style
}) {
  const bg = {
    page: 'var(--surface-page)',
    card: 'var(--surface-raised)',
    sunken: 'var(--surface-sunken)',
    inverse: 'var(--surface-inverse)'
  }[tone];
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: bg,
      padding: 'var(--section-y) 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter)'
    }
  }, children));
}
function Hero({
  slot = 'hero',
  label = 'Hero-Foto hier ablegen',
  eyebrow,
  title,
  sub,
  actions,
  height = 620
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden',
      background: 'var(--pine-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: slot,
    shape: "rect",
    placeholder: label
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--image-scrim)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      width: '100%',
      margin: '0 auto',
      padding: '0 var(--gutter) clamp(40px,7vw,88px)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-20)',
      maxWidth: 760
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-eyebrow)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--sage-300)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-display)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--linen-050)',
      margin: 0,
      maxWidth: '18ch'
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--linen-100)',
      margin: 0,
      maxWidth: '46ch'
    }
  }, sub), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-12)',
      marginTop: 'var(--space-8)',
      flexWrap: 'wrap',
      pointerEvents: 'auto'
    }
  }, actions))));
}
function Footer({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-inverse)',
      padding: 'var(--space-72) 0 var(--space-40)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr 1fr',
      gap: 'var(--space-40)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-20)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 56,
    tone: "inverse"
  }), /*#__PURE__*/React.createElement(Wordmark, {
    size: 22,
    tone: "inverse",
    subtitle: "Cocina mediterr\xE1nea"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-on-inverse-muted)',
      margin: 0,
      maxWidth: '34ch'
    }
  }, "Ein Restaurant von zwei Deutschen in Spanien. Wir kochen mittelmeerisch, ehrlich und ohne Umschweife."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    name: "instagram",
    label: "Instagram",
    variant: "inverse",
    size: "sm"
  }), /*#__PURE__*/React.createElement(IconButton, {
    name: "facebook",
    label: "Facebook",
    variant: "inverse",
    size: "sm"
  }), /*#__PURE__*/React.createElement(IconButton, {
    name: "mail",
    label: "E-Mail",
    variant: "inverse",
    size: "sm"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoRow, {
    icon: "clock",
    label: "\xD6ffnungszeiten",
    tone: "inverse"
  }, "Mi \u2013 So, 19:00 \u2013 23:30", /*#__PURE__*/React.createElement("br", null), "Montag & Dienstag Ruhetag"), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "map-pin",
    label: "Adresse",
    tone: "inverse"
  }, "Calle Mayor 14", /*#__PURE__*/React.createElement("br", null), "03769 Sanet y Negrals, Alicante")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoRow, {
    icon: "phone",
    label: "Reservierungen",
    tone: "inverse"
  }, "+34 966 408 326"), /*#__PURE__*/React.createElement(InfoRow, {
    icon: "mail",
    label: "E-Mail",
    tone: "inverse"
  }, "info@laratatouille.es"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: 'var(--space-40) auto 0',
      padding: '0 var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(Rule, {
    tone: "inverse"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-24)',
      paddingTop: 'var(--space-20)',
      font: 'var(--type-caption)',
      color: 'var(--text-on-inverse-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 La Ratatouille, Sanet y Negrals"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 'var(--space-24)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#impressum",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--pine-200)',
      borderColor: 'transparent'
    }
  }, "Impressum"), /*#__PURE__*/React.createElement("a", {
    href: "#datenschutz",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--pine-200)',
      borderColor: 'transparent'
    }
  }, "Datenschutz")))));
}
Object.assign(window, {
  Placeholder,
  Section,
  Hero,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.InfoRow = __ds_scope.InfoRow;

__ds_ns.MenuItem = __ds_scope.MenuItem;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Rule = __ds_scope.Rule;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Notice = __ds_scope.Notice;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
