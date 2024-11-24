import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();

// Blood Types APIs
export const getBloodTypesApi = () => api.get(url.GET_ALL_BLOOD_TYPES);
export const getOneBloodTypeApi = (id) => api.get(`${url.GET_ONE_BLOOD_TYPES}?id=${id}`);

// Donors APIs
export const getDonorsApi = () => api.get(url.GET_ALL_DONORS);
export const getOneDonorApi = (id) => api.get(`${url.GET_ONE_DONOR}?id=${id}`);
export const addDonorApi = (donorData) => api.post(url.ADD_DONOR, donorData);
export const updateDonorApi = (id, donorData) => api.put(url.UPDATE_DONOR.replace(":id", id), donorData);
export const deleteDonorApi = (id) => api.delete(url.DELETE_DONOR.replace(":id", id));



export const getHospitalsApi = () => api.get(url.GET_ALL_HOSPITALS);
export const addHospitalApi = (hosData) => api.post(url.ADD_HOSPITAL, hosData);
export const updateHospitalApi = (id, hosData) => api.put(url.UPDATE_HOSPITAL.replace(":id", id), hosData);


export const addContactMsgApi = (Data) => api.post(url.ADD_CONTACT, Data);
export const getContactsApi = () => api.get(url.GET_ALL_CONTACTS);

export const updateContactApi = (id, data) => api.put(url.UPDATE_CONTACT.replace(":id", id), data);


export const addReplyMessageApi = (Data) => api.post(url.ADD_REPLY, Data);
