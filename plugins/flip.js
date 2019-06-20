import { TimelineMax, TweenMax } from "gsap";

export default {
  open(p) {
    let tl = new TimelineMax();
    let rect = p.grow.getBoundingClientRect();

    // set el to be fixed
    tl.set(p.grow, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 1
    });

    tl.to(p.grow, 0.75, {
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      padding: 0
    });

    tl.to(
      p.flip,
      0.75,
      {
        rotationY: rect.right < window.innerWidth / 2 ? 180 : -180
      },
      0
    );
  },
  close(p) {
    let tl = new TimelineMax();

    let rect = p.container.getBoundingClientRect();
    tl.to(p.grow, 0.75, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      padding: p.padding
    });

    tl.to(
      p.flip,
      0.75,
      {
        rotationY: 0
      },
      0
    );

    let callback = () => {
      tl.set(p.grow, { clearProps: "all" });
      tl.set(p.flip, { clearProps: "all" });
    };
    tl.eventCallback("onComplete", callback());
  }
};
