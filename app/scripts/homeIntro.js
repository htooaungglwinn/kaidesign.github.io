import ProjectList from "../functions/projectList.js";

gsap.registerPlugin(Flip, ScrollTrigger);

export default class HomeIntro {
  constructor() {
    this.state = null;
    this.introSection = document.querySelector(".intro");

    this.imagesWrapper = document.querySelector(".intro__images");
    this.images = [...this.imagesWrapper.querySelectorAll("img")];

    this.titleLines = 'h1 [data-animation="text-reveal"] > *';
    this.subTitleLine = 'h3 [data-animation="text-reveal"] > *';

    this._loadInitialState();
    this._createPareallexImages();
    this._getFinalState();
    this._setInitialState();
    this._fadeUpImages();
    this._createPinnedSection();
  }

  _loadInitialState() {
    // The fullwidth image is also scaled bigger at first so that...
    gsap.set(".fullwidth-image img", {
      scale: 1.08,
    });

    gsap.set(".fullwidth-image__text", {
      y: 70,
      opacity: 0,
    });

    // animate textline
    gsap.set(this.dividerLine, {
      scaleX: 0,
      opacity: 1,
    });
  }

  _createPareallexImages() {
    // you have to pass in scrollTrigger object into the timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.introSection,
        start: "top top",
        end: "bottom top",
        scrub: 0.2,
      },
    });

    this.images.forEach((image) => {
      tl.to(
        image,
        {
          ease: "none",
          yPercent: gsap.utils.random(-100, -50),
        },
        "<"
      );
    });
  }

  _getFinalState() {
    // to set images to the initial postitions they will aimate
    this.imagesWrapper.classList.remove("initial");

    // moving images to center
    gsap.set([this.images], {
      xPercent: 0,
      yPercent: 0,
    });

    // Gsap State to record stuff to animate from
    this.state = Flip.getState([this.images]);
  }

  _setInitialState() {
    // to set images to the initial postitions they will aimate
    this.imagesWrapper.classList.add("initial");

    // changing transform origins of the images to top left
    gsap.set(this.images, {
      xPercent: -50,
      yPercent: -50,
      y: 70,
    });
  }

  _fadeUpImages() {
    // without onComplete callback, both animations will start at once
    return gsap.to([this.images], {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: "power3.inOut",
      stagger: 0.1,
      onComplete: () => this._animateImages(),
    });
  }

  _animateImages() {
    // animating with Flip
    Flip.to(this.state, {
      duration: 2,
      ease: "expo.inOut",
      stagger: 0.15,
      onComplete: () => this._revealContent(),
    });
  }

  _revealContent() {
    const tl = gsap.timeline({
      defaults: {
        y: 0,
        duration: 2,
        ease: "expo.inOut",
      },
    });

    tl.to(this.titleLines, {
      stagger: 0.2,
    }).to(
      this.subTitleLine,
      {
        ease: "expo.inOut",
      },
      "<+0.4"
    );

    return tl;
  }

  // Pinned section animation
  _createPinnedSection() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".fullwidth-image",
        stat: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
        ease: "expo.out",
      },
    });

    tl.to(".fullwidth-image__overlay", {
      opacity: 0.6,
    })
      .to(
        ".fullwidth-image",
        {
          // you need percentages in clip-path values
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        0
      )
      .to(
        ".fullwidth-image img",
        {
          scale: 1,
        },
        0
      )
      .to(
        ".fullwidth-image__text",
        {
          opacity: 1,
          y: 0,
        },
        "<+=0.1"
      );
  }
}
