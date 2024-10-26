import { Context } from "../../context";

export interface GetVariableByIdRequest {
    id: string;
}

export interface GetVariableByIdResponse {
    id: string;
    // Add other necessary fields
}

export interface EntriesRepository {
    getVariableById(request: GetVariableByIdRequest, context: Context): Promise<GetVariableByIdResponse>;
}
