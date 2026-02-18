import axios from 'axios';
import { API_ENDPOINTS } from './endpoints';
import { parseUnits } from './unitParsers';
import { Unit } from './dataTypes';

const getForces = (force: string) => new Promise<Unit[]>((resolve, reject) => {
    axios.get(API_ENDPOINTS.FORCE_ORG + force)
      .then(response => {
        // response.data may already be a parsed object or a JSON string
        const parsed = parseUnits(response.data);
        resolve(parsed);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        reject(error);
      });
    });

export default getForces;