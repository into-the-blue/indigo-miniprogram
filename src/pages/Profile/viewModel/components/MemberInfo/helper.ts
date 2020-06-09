import { TMemberType } from '@/types';

export const mapMemberType = (type: TMemberType) => {
  switch (type) {
    case '5': {
      return '普通会员';
    }
    case '14': {
      return '稍好的\n会员';
    }
    case '30': {
      return '包月会员';
    }
    case 'friend': {
      return '同学';
    }
    case 'sponsor': {
      return '赞助者';
    }
    case 'lifelongMember': {
      return '终身会员';
    }
    default: {
      return type;
    }
  }
};
