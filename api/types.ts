// Server type
export type TServer = {
  id: string;
  name: string;
  type: string;
  status: string;
};

// List of servers response type
export type TServersListResponse = {
  servers: TServer[];
};

// Create server request type
export type TCreateServerRequest = {
  name: string;
  type: string;
};

// Create server response type
export type TCreateServerResponse = {
  server: TServer;
};

// Fetch server response type
export type TFetchServerResponse = {
  server: TServer;
};
