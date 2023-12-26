import HomeIntro from "./app/scripts/homeIntro.js";
import Projects from "./app/scripts/projects.js";

class App {
  constructor() {
    this._createLenis();
    this._render();
    this._createHomeIntro();
    this._createProjects();
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
    // this.lenis.render();
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

// new App();

// window.addEventListener("DOMContentLoaded", () => {
//   new App();
// });

// Initialize App after the document is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app._onDocumentLoaded(); // Start Lenis animation after the document is fully loaded
  app._render(); // Start rendering animation
});
