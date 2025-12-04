export interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
}

export interface MerchantListResponse {
  status: number;
  message: string;
  data: Merchant[];
}

export interface MerchantDetail {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}

export interface MerchantDetailResponse {
  status: number;
  message: string;
  data: MerchantDetail;
}