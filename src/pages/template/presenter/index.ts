import { IPresenter, IViewModel } from '../types';
import { TemplateInteractor } from '../interactor';

class TemplatePresenter implements IPresenter {
  constructor(public interactor: TemplateInteractor, public viewModel: IViewModel) {}

  componentDidMount() {}
  componentWillUnmount() {}
}
export { TemplatePresenter };
