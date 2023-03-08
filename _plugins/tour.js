import toures from '@imagina/qsite/_toures';

class Tour {
    constructor() {
        this.tour = null;
    }

    getButtonsByStep(lengthSteps, index) {
        let buttons = [];
        if (lengthSteps === 1 || (lengthSteps - 1) === index) {
            buttons = [
                {
                    action() {
                        return this.complete();
                    },
                    classes: 'tour-primary',
                    text: 'Finalizar'
                }
            ];
        } else {
            if (index === 0) {
                buttons = [
                    {
                        action() {
                            return this.next();
                        },
                        classes: 'tour-primary',
                        text: 'Siguiente'
                    }
                ];
            } else {
                buttons = [
                    {
                        action() {
                            return this.back();
                        },
                        classes: 'tour-secondary',
                        text: 'Atrás'
                    },
                    {
                        action() {
                            return this.next();
                        },
                        classes: 'tour-primary',
                        text: 'Siguiente'
                    }
                ];
            }
        }
        return buttons;
    }

    showTutorialBySteps(steps = []) {
        if (steps.length > 0) {
            this.tour = new Shepherd.Tour({
                defaultStepOptions: {
                    cancelIcon: {
                        enabled: true
                    },
                    scrollTo: { behavior: 'smooth', block: 'center' }
                },
                useModalOverlay: true,
            });
            const stepsLength = steps.length;
            steps.forEach(({ title, icon, content, element, position }, index) => {
                this.tour.addStep({
                    title: `
                            <div class="title-tour text-primary">
                                ${title}
                            </div>
                        `,
                    text: `
                            <div class="info-tour">
                                <div class="info-tour-icon">
                                    <i class="${icon} text-primary"></i>
                                </div>
                                <div class="info-tour-text">
                                    ${content}
                                </div>
                            </div>
                        `,
                    attachTo: {
                        element: element,
                        on: position
                    },
                    buttons: this.getButtonsByStep(stepsLength, index),
                });
            });
            this.tour.start();
        }
    };

    isTutorialWatched(typeTour) {
        const isWatched = localStorage.getItem(typeTour);
        return isWatched ? true : false;
    };

    complete() {
        this.tour.complete();
    };
}

const tour = new Tour();

export default tour;

export { tour };