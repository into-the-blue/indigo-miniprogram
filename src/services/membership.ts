import { apiClient } from '@/utils';
import { TMemberType, TMemberPurchaseSource } from '@/types';

export class MembershipService {
  static getFreeMembershipInfo = async (): Promise<{
    enable: boolean;
    remainingRedeemTimes: number;
  }> => {
    const { data } = await apiClient.get('/member/promo');
    return data.data;
  };

  /**
   *
   *
   * @param {TMemberType} type
   * @param {TMemberPurchaseSource} source
   * @returns {(Promise<{
   *     code: 301 | 302 | 1;
   *     message: string;
   *     success: boolean;
   *   }>)}
   * code: 301 cannot purchase a inferior membership
   * 302 exceed free membership quota
   */
  static new = async (
    type: TMemberType,
    source: TMemberPurchaseSource,
  ): Promise<{
    code: 301 | 302 | 1;
    message: string;
    success: boolean;
  }> => {
    const { data } = await apiClient.post('/member/new', {
      source,
      type,
    });
    return {
      code: data.code,
      message: data.message,
      success: data.success,
    };
  };

  /**
   *
   *
   * @static
   * @memberof MembershipService
   * check if user can purchase the membership
   */
  static canPurchase = async (): Promise<{ success: boolean; message: string; code: 301 }> => {
    const { data } = await apiClient.get('/member/can_purchase');
    return {
      success: data.success,
      message: data.message,
      code: data.code,
    };
  };
}
