import { IPresenter, IInteractor, IViewModel } from '../types';

class TemplatePresenter implements IPresenter {
  
  constructor(public interactor: IInteractor, public viewModel: IViewModel) {}

  componentDidMount() {}
  componentWillUnmount() {}
}
export { TemplatePresenter };
