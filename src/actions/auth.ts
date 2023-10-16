import { type AxiosError } from "axios";
import { toast } from "react-toastify";

import { type WalletTypes } from "~/types/type";
import api from "~/utils/api";
import { store } from "~/application/store";
import {
  type AuthState,
  login,
  logout,
  setAuthLoading,
  setBtcPrice,
  type RecentActivityForm,
  setRecentActivity,
  setSignMessage,
} from "~/reducers/authSlice";
import setAuthToken from "~/utils/setAuthToken";

const { dispatch } = store;

const ordinalExplorer = process.env.NEXT_PUBLIC_INSCRIPTION_URL as string;

export const getBtcPrce = async (): Promise<void> => {
  try {
    const res = await api.get("btc-price");
    dispatch(setBtcPrice(res.data.price));
  } catch (error) {
    console.error(error);
  }
};

export const getSignMessage = async (address: string): Promise<void> => {
  try {
    dispatch(setAuthLoading(true));
    const res = await api.post("/auth/generate-message", { address });
    dispatch(setSignMessage(res.data.message));
    dispatch(setAuthLoading(false));
  } catch (error) {
    console.error(error);
    dispatch(setAuthLoading(false));
  }
};

export const userLogin = async (
  address: string,
  signature: string,
  walletType: WalletTypes,
  pubkey: string
): Promise<void> => {
  try {
    dispatch(setAuthLoading(true));
    const res = await api.post("/auth/login", {
      address,
      signature,
      walletType,
      pubkey,
    });
    setAuthToken(res.data.accessToken as string);
    void loadUser();
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      if (Array.isArray(((error as AxiosError).response as any).data.message))
        ((error as AxiosError).response as any).data.message.map(
          (msg: string) => toast.warn(msg)
        );
      else toast.warn(((error as AxiosError).response as any).data.message);
    dispatch(logout());
  }
};

export const loadUser = async (): Promise<void> => {
  try {
    dispatch(setAuthLoading(true));
    const res = await api.get("/auth/profile");
    dispatch(login(res.data as Partial<AuthState>));
  } catch (err) {
    dispatch(logout());
  }
};

export const updateUserProfile = async ({
  email,
  name,
  paymentAddress,
  bio,
  website,
  twitter,
  facebook,
}: Partial<AuthState>): Promise<void> => {
  try {
    dispatch(setAuthLoading(true));
    const data: Partial<AuthState> = { email, name, bio, paymentAddress };
    if ((website as string).length > 0) data.website = website;
    if ((twitter as string).length > 0) data.twitter = twitter;
    if ((facebook as string).length > 0) data.facebook = facebook;

    const res = await api.post("/user/update", data);
    setAuthToken(res.data.accessToken as string);
    void loadUser();
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST") {
      const errorMessage = ((error as AxiosError).response as any).data.message;
      if (Array.isArray(errorMessage))
        errorMessage.map((msg: string) => toast.warn(msg));
      else toast.warn(errorMessage);
    }
    dispatch(setAuthLoading(false));
  }
};

export const getRecentActivities = async () => {
  try {
    dispatch(setRecentActivity([]));

    const res = await api.get("/buy-now-activity/recent");
    const recentActivityData: RecentActivityForm[] = [];
    (res.data as any[]).forEach((data: any) => {
      recentActivityData.push({
        id: data.inscription.inscriptionId,
        title: data.inscription.collection.name,
        description: data.inscription.collection.description,
        image: `${ordinalExplorer}${data.inscription.inscriptionId}`,
        imgUrl: data.inscription.collection.imgUrl,
        price: data.price,
      });
    });
    dispatch(setRecentActivity(recentActivityData));
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST") {
      ((error as AxiosError).response as any).data.message.map((msg: string) =>
        toast.warn(msg)
      );
    }
  }
};
