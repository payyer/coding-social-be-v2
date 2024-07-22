import { IGetAllJob, IGetJobDetail } from "../../type/job";
import { apiSlice } from "../apiSlice";

export const homeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllJob: build.query<IGetAllJob, void>({
      query: () => `job`,
    }),
    getJob: build.query<IGetJobDetail, string>({
      query: (_id) => `job/detail/${_id}`,
    }),

    createJob: build.mutation<{_id:string}, FormData>({
      query(body) {
        return {
          url: "job",
          method: "POST",
          body,
        };
      },
    }),
  }),
  overrideExisting: true,
});
export const { useGetAllJobQuery, useCreateJobMutation, useGetJobQuery } = homeApi;
