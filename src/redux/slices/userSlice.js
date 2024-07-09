// const SToken = localStorage.getItem("S_token");
// const Sdb_token = localStorage.getItem("S_db_token");

// import {
//   createAsyncThunk,
//   createSlice,
//   PayloadAction,
//   SerializedError,
// } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_BASE_URL } from "components/common/ApiUrl";
// import { toastError, toastSuccess } from "helpers/toastHelper";
// import { RootState } from "redux/store";

// const initialState = {
//   sectionList: [],
//   isLoading: false,
//   error: null,
// };

// interface SectionDetails {
//   title: string;
//   grade_id: number[];
// }

// export const createSectionAsync = createAsyncThunk(
//   "section/create",
//   async (credentials: SectionDetails, { rejectWithValue }) => {
//     const token = localStorage.getItem("client_token");
//     const db_token = localStorage.getItem("client_db_token");
//     try {
//       const response = await axios.post(
//         ${API_BASE_URL}/section/create,
//         credentials,
//         {
//           headers: {
//             Authorization: Bearer ${token || SToken},
//             "db-token": db_token || Sdb_token,
//           },
//         }
//       );

//       if (response.data.success) {
//         toastSuccess(response.data.message);
//         return response.data.data;
//       } else {
//         toastError(response.data.message);
//         return rejectWithValue(response.data);
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || "Unknown error occurred";
//       toastError(errorMessage);
//       return rejectWithValue({
//         message: errorMessage,
//         status: error.response?.status,
//       });
//     }
//   }
// );

// const sectionsSlice = createSlice({
//   name: "sectionState",
//   initialState,
//   reducers: {
//     sectionData: (state: any, action) => {
//       state.sectionList.push(action.payload);
//     },
//     resetSectionList: () => initialState,
//     clearSectionError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createSectionAsync.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(createSectionAsync.fulfilled, (state: any, action) => {
//         state.isLoading = false;
//         state.sectionList = [...state.sectionList, action.payload];
//       })
//       .addCase(createSectionAsync.rejected, (state, action: any) => {
//         state.isLoading = false;
//         state.error = action.payload.message || "Unknown error occurred";
//       });
//   },
// });

// export const { resetSectionList, clearSectionError } = sectionsSlice.actions;
// export default sectionsSlice.reducer;

// export const selectSectionDataList = (state: RootState) =>
//   state.sectionState?.sectionList ?? [];

// // section list slice //

// interface ErrorPayload {
//   message: string;
//   status: number;
// }

// interface SectionListDetails {}

// interface SectionListState {
//   sectionDataList: SectionListDetails[];
//   isLoading: boolean;
//   error: string | null;
//   totalPages: number;
//   count: number;
// }

// const sectionListInitialState: SectionListState = {
//   sectionDataList: [],
//   isLoading: false,
//   error: null,
//   totalPages: 0,
//   count: 0,
// };

// export const SectionListAsync = createAsyncThunk(
//   "section/create/list",
//   async (
//     {
//       gradeId,
//       sectionId,
//       statusId,
//       searchQuery,
//       page = 1,
//       pageSize = 10,
//     }: {
//       gradeId?: number[];
//       sectionId?: number[];
//       statusId?: boolean;
//       searchQuery?: string;
//       page?: number;
//       pageSize?: number;
//     },
//     { rejectWithValue }
//   ) => {
//     const token = localStorage.getItem("client_token");
//     const db_token = localStorage.getItem("client_db_token");

//     try {
//       const filter: any = {};
//       if (gradeId) filter.grade_id = gradeId;
//       if (sectionId) filter.id = sectionId;
//       if (statusId !== undefined) filter.status = statusId;
//       if (searchQuery) filter.title = searchQuery;

//       const response = await axios.post(
//         ${API_BASE_URL}/section/list,
//         {
//           filter,
//           range: {
//             page,
//             pageSize,
//           },
//         },
//         {
//           headers: {
//             Authorization: Bearer ${token || SToken},
//             "db-token": db_token || Sdb_token,
//           },
//         }
//       );

//       if (response.data.success) {
//         const sections = Object.values(response.data.data);
//         const count = response.data.count;
//         return { sections, count };
//       } else {
//         toastError(response.data.message);
//         return rejectWithValue(response.data);
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || "Unknown error occurred";
//       toastError(errorMessage);
//       return rejectWithValue({
//         message: errorMessage,
//         status: error.response?.status,
//       });
//     }
//   }
// );

// export const sectionListSlice = createSlice({
//   name: "sectionListState",
//   initialState: sectionListInitialState,
//   reducers: {
//     clearSectionList: () => sectionListInitialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(SectionListAsync.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         SectionListAsync.fulfilled,
//         (state, action: PayloadAction<any>) => {
//           state.isLoading = false;
//           state.sectionDataList = action.payload.sections;
//           state.count = action.payload.count;
//         }
//       )
//       .addCase(SectionListAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         if (action.payload) {
//           state.error = (action.payload as { message: string }).message;
//         } else {
//           state.error = "Unknown error occurred";
//         }
//       });
//   },
// });

// export const { clearSectionList } = sectionListSlice.actions;
// export const sectionListReducer = sectionListSlice.reducer;

// export const DisplaySectionDataList = (state: RootState) =>
//   state.sectionListState?.sectionDataList ?? [];
// export const selectSectionListCount = (state: RootState) =>
//   state.sectionListState.count;

// // // update section values//

// interface ErrorPayload {
//   message: string;
//   status: number;
// }
// interface UpdateSectionDetails {
//   [x: string]: any;
//   title: string;
//   grade_id: number[];
//   teacher_id: string[];
//   description: string;
// }

// interface UpdateSectionState {
//   updateSectionList: UpdateSectionDetails[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialUpdatedState: UpdateSectionState = {
//   updateSectionList: [],
//   isLoading: false,
//   error: null,
// };
// export const updateSectionAsync = createAsyncThunk(
//   "section/update",
//   async (
//     { id, sectionDetails }: { id: any; sectionDetails: UpdateSectionDetails },
//     { rejectWithValue }
//   ) => {
//     const token = localStorage.getItem("client_token");
//     const db_token = localStorage.getItem("client_db_token");

//     try {
//       const response = await axios.post(
//         ${API_BASE_URL}/section/update/${id},
//         sectionDetails,
//         {
//           headers: {
//             Authorization: Bearer ${token || SToken},
//             "db-token": db_token || Sdb_token,
//           },
//         }
//       );

//       if (response?.data?.success) {
//         toastSuccess(response?.data?.message);
//         return response.data.updatedClassesData;
//       } else {
//         toastError(response?.data?.message);
//         return rejectWithValue(response?.data);
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || "Unknown error occurred";
//       toastError(errorMessage);
//       return rejectWithValue({
//         message: errorMessage,
//         status: error.response?.status,
//       });
//     }
//   }
// );

// // update section slice //
// export const updateSectionSlice = createSlice({
//   name: "updateSectionState",
//   initialState: initialUpdatedState,
//   reducers: {
//     clearUpdatedSection: (state) => {
//       state.updateSectionList = [];
//       state.error = null;
//       state.isLoading = false;
//     },
//   },
//   extraReducers: (builder: any) => {
//     builder
//       .addCase(updateSectionAsync.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         updateSectionAsync.fulfilled,
//         (state, action: PayloadAction<UpdateSectionDetails>) => {
//           state.isLoading = false;
//           const index = state.updateSectionList.findIndex(
//             (section) => section.id === action.payload.id
//           );
//           if (index !== -1) {
//             state.updateSectionList[index] = action.payload;
//           }
//         }
//       )
//       .addCase(
//         updateSectionAsync.rejected,
//         (state, action: PayloadAction<ErrorPayload | SerializedError>) => {
//           state.isLoading = false;
//           state.error = action.payload.message || null;
//         }
//       );
//   },
// });

// export const { clearUpdatedSection } = updateSectionSlice.actions;
// export const updateSectionReducer = updateSectionSlice.reducer;
// export const selectUpdateSectionDataList = (state: RootState) => {
//   return state.updateSectionState?.updateSectionList ?? [];
// };

// //Delete section Value //

// interface ErrorPayload {
//   message: string;
//   status: number;
// }

// interface DeleteSectionState {
//   isLoading: boolean;
//   error: string | null;
// }

// const initialDeleteState: DeleteSectionState = {
//   isLoading: false,
//   error: null,
// };

// export const deleteSectionAsync = createAsyncThunk(
//   "section/delete",
//   async (id: string, { rejectWithValue }) => {
//     const token = localStorage.getItem("client_token");
//     const db_token = localStorage.getItem("client_db_token");

//     try {
//       const response = await axios.post(
//         ${API_BASE_URL}/section/delete/${id},
//         null,
//         {
//           headers: {
//             Authorization: Bearer ${token || SToken},
//             "db-token": db_token || Sdb_token,
//           },
//         }
//       );

//       if (response?.data?.success) {
//         toastSuccess(response?.data?.message);
//       } else {
//         toastError(response?.data?.message);
//         return rejectWithValue(response?.data);
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || "Unknown error occurred";
//       toastError(errorMessage);
//       return rejectWithValue({
//         message: errorMessage,
//         status: error.response?.status,
//       });
//     }
//   }
// );

// export const deleteSectionSlice = createSlice({
//   name: "deleteSectionState",
//   initialState: initialDeleteState,
//   reducers: {
//     clearDeleteSection: (state) => {
//       state.isLoading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(deleteSectionAsync.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteSectionAsync.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(deleteSectionAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         if (action.payload) {
//           state.error = (action.payload as { message: string }).message;
//         } else {
//           state.error = "Unknown error occurred";
//         }
//       });
//   },
// });

// export const { clearDeleteSection } = deleteSectionSlice.actions;
// export const deleteSectionReducer = deleteSectionSlice.reducer;

// // handle section status //

// interface ErrorPayload {
//   message: string;
//   status: number;
// }
// interface UpdateSectionStatusDetails {
//   id: any;
// }
// interface RejectValue {
//   message: string;
// }

// interface UpdateSectionStatusState {
//   updateSectionStatusList: UpdateSectionStatusDetails[];
//   isLoading: boolean;
//   error: string | null;
// }

// const initialUpdatedStatusState: UpdateSectionStatusState = {
//   updateSectionStatusList: [],
//   isLoading: false,
//   error: null,
// };

// export const updateSectionStatusAsync = createAsyncThunk<
//   { id: number; active: boolean },
//   UpdateSectionStatusDetails,
//   {
//     state: RootState;
//     rejectValue: RejectValue;
//   }
// >("section/update/status", async ({ id }, { rejectWithValue }) => {
//   const token = localStorage.getItem("client_token");
//   const db_token = localStorage.getItem("client_db_token");

//   try {
//     const response = await axios.post(
//       ${API_BASE_URL}/section/change-status/${id},
//       {},
//       {
//         headers: {
//           Authorization: Bearer ${token || SToken},
//           "db-token": db_token || Sdb_token,
//         },
//       }
//     );

//     if (response?.data?.success) {
//       toastSuccess(response?.data?.message);
//       return { id, active: response.data.data.status };
//     } else {
//       toastError(response?.data?.message);
//       return rejectWithValue({ message: response?.data?.message });
//     }
//   } catch (error: any) {
//     const errorMessage =
//       error.response?.data?.message || "Unknown error occurred";
//     toastError(errorMessage);
//     return rejectWithValue({ message: errorMessage });
//   }
// });

// export const updateSectionStatusSlice = createSlice({
//   name: "updateSectionStatusState",
//   initialState: initialUpdatedStatusState,
//   reducers: {
//     clearUpdatedSectionStatus: (state) => {
//       state.updateSectionStatusList = [];
//       state.error = null;
//       state.isLoading = false;
//     },
//   },
//   extraReducers: (builder: any) => {
//     builder
//       .addCase(updateSectionStatusAsync.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         updateSectionStatusAsync.fulfilled,
//         (state, action: PayloadAction<{ id: number; active: boolean }>) => {
//           const index = state.updateSectionStatusList.findIndex(
//             (school) => school.id === action.payload.id
//           );
//           if (index !== -1) {
//             state.updateSectionStatusList[index].currentStatus =
//               action.payload.active;
//           } else {
//             state.updateSectionStatusList.push({
//               id: action.payload.id,
//               currentStatus: action.payload.active,
//             });
//           }
//           state.isLoading = false;
//         }
//       )
//       .addCase(
//         updateSectionStatusAsync.rejected,
//         (state, action: PayloadAction<ErrorPayload | SerializedError>) => {
//           state.isLoading = false;
//           state.error = action.payload.message || null;
//         }
//       );
//   },
// });

// export const { clearUpdatedSectionStatus } = updateSectionStatusSlice.actions;
// export const updateSectionStatusReducer = updateSectionStatusSlice.reducer;
// export const selectUpdateSectionStatusDataList = (state: RootState) => {
//   return state.updateSectionStatusState?.updateSectionStatusList ?? [];
// };























// // import {createSlice} from '@reduxjs/toolkit';

// // const initialState = {
// //   username: '',
// //   isLoggedIn: false,
// // };

// // const userSlice = createSlice({
// //   name: 'user',
// //   initialState,
// //   reducers: {
// //     setUsername: (state, action) => {
// //       state.username = action.payload;
// //     },
// //     setLoggedIn: (state, action) => {
// //       state.isLoggedIn = action.payload;
// //     },
// //   },
// // });

// // export const {setUsername, setLoggedIn} = userSlice.actions;
// // export default userSlice.reducer;
