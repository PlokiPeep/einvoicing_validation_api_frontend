import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const APIService = () => {
  const user = useAuth();

  let headers = {
    "Content-type": "application/json",
  };

  const getBase = () => {
    if (user && user.user && user.user.token) {
      headers.Authorization = 'Bearer ' + user.user.token;
    }

    console.log(user)
    
    return axios.create({
      baseURL: "http://churros.eba-pyyazat7.ap-southeast-2.elasticbeanstalk.com/",
      // baseURL:"http://localhost:8000/",
      headers: headers,
      mode: 'cors',
    });
  }

  const login = (email, password) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    return getBase().post("/auth_login/v2",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  const register = (name, email, password) => {
    return getBase().post("/auth_register/v2",
    {
      name: name,
      email: email,
      password: password
    },
    {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  };

  const listValidInvoices = (verbose) => {
    return getBase().get("/invoice_processing/list_all/v2",
    {
      params: {
        is_valid: true,
        verbose: verbose,
      }
    })
  };

  const listInvalidInvoices = (verbose) => {
    return getBase().get("/invoice_processing/list_all/v2",
    {
      params: {
        is_valid: false,
        verbose: verbose,
      }
    })
  };

  const invoiceProcessingQuery = (query, from_date, to_date) => {
    return getBase().get("/invoice_processing/query/v2",
    {
      params: {
        query: query,
        from_date: from_date,
        to_date: to_date
      }
    })
  };

  const uploadInvoice = (name, invoice) => {
    return getBase().post("/invoice_processing/upload_text/v2",
    {
      name: name,
      text: invoice
    });
  };

  const getInvoice = (id) => {
    return getBase().post("/invoice_processing/get/v2",
    {},
    {
      params: {
        invoice_id: parseInt(id),
        verbose: true
      }
    });
  };

  const getLintReport = (invoice_id, newInvoice) => {
    if (newInvoice) {
      return getBase().post("/invoice_processing/lint/v2",
      {
        name: 'test',
        text: newInvoice
      },
      {
        params: {
          invoice_id: invoice_id,
        }
      });
    } else {
      return getBase().post("/invoice_processing/lint/v2",
      null,
      {
        params: {
          invoice_id: invoice_id,
        }
      });
    }
  };

  const deleteInvoice = (id) => {
    return getBase().delete('/invoice_processing/delete/v2',
    {
      params: {
        invoice_id: parseInt(id),
      }
    });
  };
  
  const virtualWarehouseCoords = (n_clusters, from_date, to_date) => {
    return getBase().get("/virtual_warehouse_coords",
    {
      params: {
        n_clusters: n_clusters,
        from_date: from_date,
        to_date: to_date
      }
    })
  };

  return {
    login,
    register,
    invoiceProcessingQuery,
    listValidInvoices,
    listInvalidInvoices,
    uploadInvoice,
    getInvoice,
    getLintReport,
    deleteInvoice,
    virtualWarehouseCoords
  };
}

export default APIService;
