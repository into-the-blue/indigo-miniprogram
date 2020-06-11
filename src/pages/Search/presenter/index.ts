import { IPresenter, IViewModel } from '../types';
import { SearchInteractor } from '../interactor';
import { IPOI } from '@/types';
import Taro from '@tarojs/taro';

class SearchPresenter implements IPresenter {
  constructor(public interactor: SearchInteractor, public viewModel: IViewModel) {}

  componentDidMount() {}
  componentWillUnmount() {}

  onPressSearchResult = (result: IPOI) => {
    Taro.navigateBack();
    this.viewModel.getProps.next('Feed_setMapFocusedPosition', {
      data: {
        type: 'customLocation',
        payload: result,
      },
    });
  };

  onChange = (value: string) => {
    this.interactor.onChangeInput(value);
    return value;
  };
}
export { SearchPresenter };
