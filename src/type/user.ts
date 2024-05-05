interface IUserService {
  getUsers: grpc.handleUnaryCall<GetUsersRequest, GetUsersResponse>;
}

interface GetUsersRequest {}

interface GetUsersResponse {
  users: any[]; // Define a more detailed structure based on your actual data schema
}
