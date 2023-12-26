export default class Events {
    constructor() {
        // this._loadInitialStates();

        const joeyGifWrapper = document.querySelector('.title_gif-wrapper');
        const joeyGif = document.querySelector('[data-animation="gif-reveal"]');

                // joey gif
        // this.heyTitleWrapper = document.querySelector('.title_gif-wrapper');
        // this.joeyGif = document.querySelector('[data-animation="gif-reveal"]');

                // // joey gif mouse over function
        // this.heyTitleWrapper.addEventListener("click", () => {
        //     gsap.to(this.joeyGif, {
        //         // xPercent: 88,
        //         // yPercent: -58,
        //         x: '90%',
        //         y: '-70%',
        //         opacity: 1,
        //         scale: 1,
        //         duration: 0.3,
        //         ease: 'expos.out'
        //     })
        // })

        // this.heyTitleWrapper.addEventListener("click", () => {
        //     gsap.to(this.joeyGif, {
        //         x: '0%',
        //         y: '0%',
        //         opacity: 0,
        //         scale: 0.8,
        //         duration: 0.2,
        //         ease: 'expos.inout'
        //     })
        // })


                // gsap.set(this.joeyGif, {
        //     xPercent: 0,
        //     yPercent: 0,
        //     opacity: 0,
        //     scale: 0.8
        // })



        joeyGifWrapper.addEventListener("click", () => {
            gsap.to(joeyGif, {
                xPercent: 80,
                y: -80,
                opacity: 1,
                scale: 1.2,
                ease: 'expos.out',
                duration: 0.8
            })
        })

        joeyGifWrapper.addEventListener("dbclick", () => {
            gsap.to(joeyGif, {
                xPercent: 80,
                y: -80,
                opacity: 0,
                scale: 0.8,
                ease: 'expos.out',
                duration: 0.5
            })
        })

    }


    _loadInitialStates() {
        gsap.set(document.querySelector('[data-animation="gif-reveal"]'), {
            xPercent: 0,
            y: 30,
            opacity: 0
        })
    }
    
}