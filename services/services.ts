import axios from "axios";

interface getSeparationProps {
  apiKey: string;
  modelName: string;
  calledMethod: string;
  methodProperties: {
    CityName?: string;
    StreetName?: string;
    SettlementRef?: string;
    FindByString?: string;
    Limit: string;
    Language: string;
    WarehouseId?: string;
  };
}

interface ApiResponse {
  success: boolean;
  errors?: string;
  data: {
    Description?: string;
    Addresses: {
      Present: string;
      DeliveryCit: string;
      MainDescription: string;
      Ref: string;
    }[];
  }[];
}

export const novaPoshtaApi = axios.create({
  baseURL: process.env.NOVA_POSHTA_URL,
});

export const getSeparation = async (
  body: getSeparationProps
): Promise<ApiResponse> => {
  try {
    const { data, status } = await novaPoshtaApi.post<ApiResponse>(``, body);
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${status}`);
    }
    return data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
