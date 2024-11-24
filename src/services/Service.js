import {
  getBloodTypesApi,
  getOneBloodTypeApi,
  getDonorsApi,
  getOneDonorApi,
  addDonorApi,
  updateDonorApi,
  deleteDonorApi,
  updateHospitalApi,
  getHospitalsApi,
  addHospitalApi,
  addContactMsgApi,
  updateContactApi,
  getContactsApi,
  addReplyMessageApi,
} from "../helpers/fakebackend_helper";

// Blood Types Service
export const fetchBloodTypes = async () => {
  try {
    const response = await getBloodTypesApi();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch BloodTypes", error);
    return { error: "Failed to fetch BloodTypes" };
  }
};

export const fetchOneBloodType = async (id) => {
  try {
    const response = await getOneBloodTypeApi(id);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch a single BloodType", error);
    return { error: "Failed to fetch the BloodType" };
  }
};

// Donors Service
export const fetchDonors = async () => {
  try {
    const response = await getDonorsApi();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Donors", error);
    return { error: "Failed to fetch Donors" };
  }
};

export const fetchOneDonor = async (id) => {
  try {
    const response = await getOneDonorApi(id);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch a single Donor", error);
    return { error: "Failed to fetch the Donor" };
  }
};

export const addDonor = async (donorData) => {
  try {
    const response = await addDonorApi(donorData);
    return response.data;
  } catch (error) {
    console.error("Failed to add Donor", error);
    return { error: "Failed to add Donor" };
  }
};

export const updateDonorStatus = async (donorId, status) => {
  try {
    const response = await updateDonorApi(donorId, { status });
    return response.data;
  } catch (error) {
    console.error("Failed to update donor status", error);
    return { error: "Failed to update donor status" };
  }
};

export const deleteDonor = async (id) => {
  try {
    const response = await deleteDonorApi(id);
    return response.data;
  } catch (error) {
    console.error("Failed to delete Donor", error);
    return { error: "Failed to delete Donor" };
  }
};



export const fetchHospitals = async () => {
  try {
    const response = await getHospitalsApi();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Hospitals", error);
    return { error: "Failed to fetch Hospitals" };
  }
};

export const addHospital = async (hosData) => {
  try {
    const response = await addHospitalApi(hosData);
    return response.data;
  } catch (error) {
    console.error("Failed to add Hospital", error);
    return { error: "Failed to add Hospital" };
  }
};

export const updateHospitalStatus = async (donorId, status) => {
  try {
    const response = await updateHospitalApi(donorId, { status });
    return response.data;
  } catch (error) {
    console.error("Failed to update Hospital status", error);
    return { error: "Failed to update Hospital status" };
  }
};



export const addContactMsg = async (Data) => {
  try {
    const response = await addContactMsgApi(Data);
    return response.data;
  } catch (error) {
    console.error("Failed to add ContactMsg", error);
    return { error: "Failed to add ContactMsg" };
  }
};

export const fetchContacts = async () => {
  try {
    const response = await getContactsApi();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Contacts", error);
    return { error: "Failed to fetch Contacts" };
  }
};

export const updateContactStatus = async (id, status) => {
  try {
    const response = await updateContactApi(id, { status });
    console.log('Data to update : ' , response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update Contact status", error);
    return { error: "Failed to update Contact status" };
  }
};

export const addReplyMessage = async (Data) => {
  try {
    console.log("Data fil serv : " , Data)
    if (!Data.contactId || !Data.replyMessage) {
      throw new Error('Missing required fields: contactId or reply');
    }
    
    const response = await addReplyMessageApi(Data);
        return response.data;
  } catch (error) {
    console.error("Failed to add ReplyMessage", error.message, error.response ? error.response.data : null);
    return { error: `Failed to add ReplyMessage: ${error.message}` };
  }
};
