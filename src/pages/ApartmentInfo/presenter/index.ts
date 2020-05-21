import { IPresenter, IViewModel } from '../types';
import { ApartmentInfoInteractor } from '../interactor';

class ApartmentInfoPresenter implements IPresenter {
  constructor(public interactor: ApartmentInfoInteractor, public viewModel: IViewModel) {}

  componentDidMount() {}
  componentWillUnmount() {}
}
export { ApartmentInfoPresenter };
