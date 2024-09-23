export interface IServerResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
