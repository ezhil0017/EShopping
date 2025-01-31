import Axios from '../utils/Axios.js';
import { SummaryApi } from '../../common/summaryApi';

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
