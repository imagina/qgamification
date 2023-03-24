import crud from '@imagina/qcrud/_services/baseService'

class Tour {
  constructor() {
    this.tour = null
  }

  //start the tour
  async start(systemName, forceStart = false) {
    //Get data
    let tour = await this.getTourData(systemName)
    //Validate tour
    if (tour && (!tour.completed || forceStart) && tour.steps.length) {
      //create the tour
      this.createTour(tour)
      //Start the tour
      this.callMethod('start')
    }
  }

  //Get the tour information
  getTourData(systemName) {
    return new Promise(resolve => {
      //Request Params
      const requestParams = {
        refresh: true,
        params: {include: 'activities', filter: {"markAsCompleted": true, "field": 'system_name'}}
      }
      //Request
      crud.show('apiRoutes.qgamification.categories', systemName, requestParams).then(response => {
        resolve({
          completed: response.data.userCompleted,
          steps: response.data.activities.map(act => ({
            icon: act.options.icon,
            title: act.title,
            content: act.description,
            element: act.options.tourElement,
            position: act.options.tourElementPosition
          }))
        })
      }).catch(error => {
        resolve(null)
      })
    })
  }

  //Create the tour
  createTour(tour) {
    //Init class tour
    this.tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: {enabled: true},
        scrollTo: {behavior: 'smooth', block: 'center'}
      }
    });
    //Set steps
    tour.steps.forEach(({title, icon, content, element, position}, index) => {
      this.callMethod('addStep', {
        //title: `<div class="title-tour text-blue-grey">${title}</div>`,
        text: `<div class="info-tour">
                <div class="text-center text-blue-grey text-h6 q-mb-sm">${title}</div>
                <div class="info-tour-icon text-center q-mb-md">
                  <i class="${icon} text-primary" style="font-size: 30px"></i>
                </div>
                <div class="info-tour-text">${content}</div>
              </div>`,
        attachTo: {element: element, on: position},
        buttons: this.getTourActions(index, tour.steps.length),
      });
    });
  }

  //return the tour Actions by index
  getTourActions(index, stepLength) {
    //Instance the actions
    const actions = {
      finish: {
        action: () => this.callMethod('complete'),
        classes: 'tour-primary',
        text: 'Finalizar'
      },
      next: {
        action: () => this.callMethod('next'),
        classes: 'tour-primary',
        text: 'Siguiente'
      },
      back: {
        action: () => this.callMethod('back'),
        classes: 'tour-secondary',
        text: 'Atrás'
      }
    }
    //Instance the Response
    return ((index + 1) == stepLength) ? [actions.finish] :
      (index == 0) ? [actions.next] : [actions.back, actions.next]
  }

  //Call dynamic methods from the tour class
  callMethod(name, params = null) {
    this.tour[name](params)
  }
}

const tour = new Tour();
export default tour;
export {tour};
