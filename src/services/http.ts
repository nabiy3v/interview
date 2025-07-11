import axios from 'axios';

export const http = axios.create({ baseURL: 'http://157.180.27.123:8002/api/v1' });
