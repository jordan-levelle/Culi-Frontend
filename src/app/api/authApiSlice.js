import { setAuth, sendLogout } from "./authSlice";
import apiSlice from "./apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		sendLogin: builder.mutation({
			query: (body) => ({
				url: "/user/signin",
				method: "POST",
				body,
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setAuth(data.user));
				} catch (err) {
					dispatch(sendLogout());
				}
			},
		}),

		logout: builder.mutation({
			query: () => ({
				url: "/user/signout",
				method: "POST",
			}),
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(sendLogout());
				} catch (err) {
					console.error(err);
				}
			},
		}),
	}),
});

export const { useSendLoginMutation, useLogoutMutation } = authApiSlice;
