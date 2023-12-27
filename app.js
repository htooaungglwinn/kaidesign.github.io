import ProjectList from "./app/project_src/projectList.js";

gsap.registerPlugin(Flip, ScrollTrigger);

class App {
  constructor() {
    this._createLenis();
    this._render();

    this.imagesWrapper = document.querySelector(".intro__images");

    // this.images = [...this.imagesWrapper.querySelectorAll("img")];
    if (this.imagesWrapper) {
      // Declaring Variables
      this.state = null;
      this.introSection = document.querySelector(".intro");
      this.navImages = document.querySelectorAll("#nav img");
      this.titleLines = 'h1 [data-animation="text-reveal"] > *';
      this.subTitleLine = 'h3 [data-animation="text-reveal"] > *';
      this.images = [...this.imagesWrapper.querySelectorAll("img")];

      this._loadInitialState();
      this._createPareallexImages();
      this._getFinalState();
      this._setInitialState();
      this._fadeUpImages();
      this._createPinnedSection();

      // Project section
      this.projectSection = document.querySelector(".projects_section");

      this._createprojects();
      this._createProjectSectionTag();
    }

    // this._createHomeIntro();
    // this._createProjects();
  }

  // first, create lenis then redner lenis
  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0.07,
    });
    this.lenis.stop();
  }

  // Start Lenis after the document is fully loaded
  _onDocumentLoaded() {
    this.lenis.start();
  }

  // after creating lenis, animate scroll
  _render(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this._render.bind(this));
  }

  // - - - - - - - - - //
  //  Home intro animation  //
  // - - - - - - - - - //
  _loadInitialState() {
    // nav images are hidden
    this.navImages.forEach((navImg) => {
      gsap.set(navImg, {
        y: 100,
      });
    });

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
      duration: 1.5,
      ease: "expos.inout",
      stagger: 0.1,
      onComplete: () => this._animateImages(),
    });
  }

  _animateImages() {
    // animating with Flip
    Flip.to(this.state, {
      duration: 1.5,
      ease: "expo.inOut",
      stagger: 0.15,
      onComplete: () => this._revealContent(),
    });
  }

  _revealContent() {
    if (this.imagesWrapper) {
      const tl = gsap.timeline({
        defaults: {
          y: 0,
          duration: 1.5,
          ease: "expo.inOut",
        },
      });

      tl.to(this.titleLines, {
        stagger: 0.2,
      }).to(
        this.subTitleLine,
        {
          ease: "expo.inOut",
          onComplete: () => this._revealNav(),
        },
        "<+0.4"
      );

      return tl;
    }
  }

  _revealNav() {
    if (this.imagesWrapper) {
      this.navImages.forEach((navImg) => {
        gsap.to(navImg, {
          y: 0,
          ease: "expos.inout",
          duration: 1,
          stagger: 0.8,
        });
      });
    }
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

  // - - - - - - - - - //
  //  Project section  //
  // - - - - - - - - - //
  _createprojects() {
    this.projectList = new ProjectList();
  }

  _createProjectSectionTag() {
    function elementFromHtml(html) {
      const template = document.createElement("template");

      template.innerHTML = html.trim();

      return template.content.firstElementChild;
    }

    this.projectList.projects.forEach((project) => {
      const projectListTags = elementFromHtml(`
                  <div class="project__wrapper">
                      <div class="project__container">
                          <div class="project__details">
                              <div><h1>${project.name}</h1></div>
                              <h3><p>${project.detail}</p></h3>
                              <div class="divider-line"></div>
                              <p class="project-description">${project.title}</p>
                              <div class="project__cta-wrapper">
                                <a href="#" class="project__cta" data-text=" Case Study">View ${project.type}</a>
                              </div>
                              <h2>0${project.projectId}</h2>
                              <div class="footer-line"></div>
                          </div>
                          <div class="project__image">
                              <img src="${project.coverImage}" alt="">
                          </div>
                      </div>
                  </div>
                  `);

      // Adding event listener to a tag
      const projectCTA = projectListTags.querySelector(".project__cta");
      projectCTA.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = project.pagelink;
      });

      this.projectSection.append(projectListTags);

      //   Project wrapper containers
      // const projectWrapperTags = document.querySelectorAll(".project__wrapper");
      if (this.project__wrapper) {
        const projectWrapperTags =
          this.projectSection.querySelectorAll(".project__wrapper");

        // Looping the parent div and animating the childrens
        projectWrapperTags.forEach((projectWrapper) => {
          const dividerLine = projectWrapper.querySelector(".divider-line");
          const footerLine = projectWrapper.querySelector(".footer-line");
          const projectCta = projectWrapper.querySelector(".project__cta");
          const projectHeader = projectWrapper.querySelector(
            ".project__details h1"
          );
          const projectSubtitle = projectWrapper.querySelector("h3");
          const projectDescription = projectWrapper.querySelector(
            ".project-description"
          );

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: projectWrapper,
              start: "-=250",
              end: "",
              duration: 0.3,
            },
          });

          gsap.set(projectHeader, { y: 190 });
          gsap.set(dividerLine, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(projectCta, { y: 70 });
          gsap.set(footerLine, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(projectSubtitle, { opacity: 0 });
          gsap.set(projectDescription, { opacity: 0 });

          tl.to(projectHeader, { y: 0, ease: "back.out" })
            .to(projectSubtitle, { opacity: 1 }, 0 + 0.1)
            .to(projectDescription, { opacity: 1 }, 0 + 0.1)
            .to(dividerLine, { scaleX: 1 }, 0 + 0.1)
            .to(projectCta, { y: 0, ease: "back.out(2)" }, 0 + 0.1)
            .to(footerLine, { scaleX: 1 }, 0 + 0.3);
        });
        // end of condition
      }
    });
  }
}

// Initialize App after the document is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app._onDocumentLoaded(); // Start Lenis animation after the document is fully loaded
  app._render(); // Start rendering animation
});
