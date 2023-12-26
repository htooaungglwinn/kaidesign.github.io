import HomeIntro from "./app/scripts/homeIntro.js";
import Projects from "./app/scripts/projects.js";

class App {
  constructor() {
    this._createLenis();
    this._render();
    this._createHomeIntro();
    this._createProjects();
    // this._createEvents();
  }

  // first, create lenis then redner lenis!!!
  _createLenis() {
    this.lenis = new Lenis({
      lerp: 0.07,
    });
  }

  _createHomeIntro() {
    this.homeIntro = new HomeIntro();
  }

  _createProjects() {
    this.projects = new Projects();
  }

  // after creating lenis, animate scroll with lenis
  _render(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this._render.bind(this));
  }
}

new App();
