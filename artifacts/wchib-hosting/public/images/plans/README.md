Plan imagery. Filenames follow the plan slug, e.g. `stone.webp`.

Two files per plan, because the two slots have different aspect ratios:

| File | Slot | Aspect ratio | Source size |
|---|---|---|---|
| `<slug>.webp` | Plans grid card | 16:7 | 960 x 420 |
| `<slug>-detail.webp` | Individual plan page | 1.15:1 | 1200 x 1040 |

Both are optional. Set `image` and/or `detailImage` in `src/data/plans.ts`; the
detail page falls back to `image` when `detailImage` is null. Frames use
`object-fit: cover`, so artwork is cropped, not letterboxed.

Export lossy WebP at q80-90 and keep each file under 100 KB.
