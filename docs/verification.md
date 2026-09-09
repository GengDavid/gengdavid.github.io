# Redesign verification

Validated on 2026-09-09 using Jekyll 3.10.0 and local Google Chrome through Playwright 1.58.2.

- Production build with strict front matter: passed.
- Safe-mode build with `/preview` as `baseurl`: passed; local asset URLs and canonical URL use the prefix correctly.
- Viewport widths 320, 360, 390, 600, 768, 800, 1024, and 1440: no horizontal overflow; portrait loads.
- All 8 original selected publications and 8 news entries remain present. Four recent Scholar-listed works have been added, giving 12 selected publications. The original homepage backup is byte-identical to `ced9c4b:index.md`.
- Each selected publication has a Paper link checked against its title on an author arXiv page or official proceedings page. The original 3 Code links remain.
- Topic filters return 12 / 1 / 2 / 3 / 2 / 3 / 1 entries for all / reasoning / generation / continual / few-shot / AutoML / graph. Button state and screen-reader status update correctly.
- The introduction heading reads About Me. Main research cards are Multimodal Reasoning, Visual Generation, and Continual Learning; AutoML remains only as a historical publication category.
- Research cards select the matching filter, navigate to publications, and transfer keyboard focus.
- Earlier news expands and collapses using native `details`, including with JavaScript disabled.
- With JavaScript disabled, all publications remain visible and unavailable filter controls remain hidden.
- Printing includes all publications, even when a topic filter is active.
- Keyboard skip link and reduced-motion preference work.
- No JavaScript page errors, failed local asset requests, duplicate HTML IDs, or broken local anchors found.
- Original-content backup, documentation, dependency manifests, and development directories are excluded from the generated public site.

Screenshots and machine-readable browser results are in `previews/`. Desktop and mobile screenshots were also inspected visually. This is local verification; live GitHub Pages deployment and Safari / Firefox were not tested. No commit or push was made.
