import ProjectList from "../functions/projectList.js";

gsap.registerPlugin(Flip, ScrollTrigger, Text);

export default class Project {
  constructor() {
    // declaring variables
    this.projectSection = document.querySelector(".projects_section");

    this._createprojects();
    this._projectSectionTag();
  }

  _createprojects() {
    this.projectList = new ProjectList();
  }

  _projectSectionTag() {
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
                                  <a href="${project.pagelink}" class="project__cta" data-text=" Case Study">View ${project.type}</a>
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
      this.projectSection.append(projectListTags);

      //   dividerLine animation
      const projectWrapperTags = document.querySelectorAll(".project__wrapper");

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
    });
  }
}
