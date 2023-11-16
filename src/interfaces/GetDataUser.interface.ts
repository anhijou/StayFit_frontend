export interface GetDataUser {
    data: any;
    id: number;
    name: string;
    email: string;
    gender: string | null;
    form_status: number;
    date_of_birth: string | null;
    role_id: number;
    current_height: number | null;
    current_weight: number | null;
    phone: string | null;
    goal_id: number | null;
    target_weight: number | null;
    goal_status: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    password: string | null;
    profile_image: string | null;
    profileImagePath: string | null;
}