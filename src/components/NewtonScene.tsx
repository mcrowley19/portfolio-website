import sceneUrl from "../assets/scene.png";
import appleUrl from "../assets/apple-cropped.png";

export function NewtonScene() {
  return (
    <div className="newton-scene-wrap">
      <style>{css}</style>
      <div
        className="newton-scene"
        role="img"
        aria-label="Etching of Isaac Newton sitting under an apple tree, reading a book."
      >
        <div
          className="newton-bg"
          style={{ backgroundImage: `url(${sceneUrl})` }}
          aria-hidden="true"
        />
        <img
          className="newton-apple"
          src={appleUrl}
          alt=""
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

const css = `
.newton-scene {
  /* Scene file is 253 x 409. Container preserves that aspect (190 x 307)
     so the etching isn't stretched. */
  --scene-w: 190px;
  --scene-h: 307px;

  /* Apple natural size, as % of scene box */
  --apple-w: 6.7194%;  /* 17 / 253 */
  --apple-h: 5.1345%;  /* 21 / 409 */

  /* Keyframe positions (top-left of apple), as % of scene box.
     Scene is mirrored (scaleX(-1)), so x values are also mirrored:
     mirrored_x = 100% - original_x - apple_w */
  --start-x: 68.0000%;  /* in the canopy directly above Newton's head */
  --start-y: 18.0000%;  /* high in the tree */
  --bonk-x:  68.0000%;  /* same column — straight vertical fall */
  --bonk-y:  52.0000%;  /* apple-top so its bottom touches Newton's head */
  /* After bonk: roll off outward (Newton is on the right post-mirror,
     so the apple drifts further right) and fall to the grass. */
  --rest-x:  60.0000%;
  --rest-y:  88.0000%;  /* ≈360/409, on the grass beside Newton */

  position: relative;
  width: var(--scene-w);
  height: var(--scene-h);
}

.newton-bg {
  position: absolute;
  inset: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  image-rendering: -webkit-optimize-contrast;
  transform: scaleX(-1);
}

@media (min-width: 720px) {
  .newton-scene {
    width: calc(var(--scene-w) * 1.25);
    height: calc(var(--scene-h) * 1.25);
  }
}

.newton-apple {
  position: absolute;
  width: var(--apple-w);
  height: var(--apple-h);
  left: var(--start-x);
  top: var(--start-y);
  transform-origin: 50% 100%;
  /* Phase 1: fall from tree to head
     Phase 2: squash on impact
     Phase 3: roll/drop straight from head to grass (no second arc)
     Phase 4: small settle bounce on landing
     Only Phase 1 uses fill-mode both (to hold the start position during the
     initial delay). Later phases use forwards so they don't fill backward
     over earlier phases. */
  animation:
    newton-fall   450ms cubic-bezier(0.55, 0, 0.85, 0.3) 300ms both,
    newton-squash  80ms ease-out                          750ms forwards,
    newton-drop-x 500ms ease-out                          830ms forwards,
    newton-drop-y 500ms cubic-bezier(0.4, 0, 0.7, 0.2)    830ms forwards,
    newton-spin   500ms ease-out                          830ms forwards,
    newton-land   200ms ease-out                         1330ms forwards;
}

@keyframes newton-fall {
  from { top: var(--start-y); }
  to   { top: var(--bonk-y); }
}
@keyframes newton-squash {
  from { top: var(--bonk-y); transform: scaleY(1); }
  to   { top: var(--bonk-y); transform: scaleY(0.75); }
}
@keyframes newton-drop-x {
  from { left: var(--bonk-x); }
  to   { left: var(--rest-x); }
}
@keyframes newton-drop-y {
  from { top: var(--bonk-y); }
  to   { top: var(--rest-y); }
}
@keyframes newton-spin {
  from { transform: scaleY(1) rotate(0deg); }
  to   { transform: scaleY(1) rotate(25deg); }
}
@keyframes newton-land {
  0%   { transform: scaleY(1)    rotate(25deg); }
  30%  { transform: scaleY(0.85) rotate(25deg); }
  65%  { transform: scaleY(1.05) rotate(25deg); }
  100% { transform: scaleY(1)    rotate(25deg); }
}

@media (prefers-reduced-motion: reduce) {
  .newton-apple {
    animation: none;
    left: var(--rest-x);
    top: var(--rest-y);
    transform: rotate(25deg);
  }
}
`;
