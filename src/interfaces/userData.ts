export interface userData {
    gender?: 'male' | 'female' | 'unknown';
    date_of_birth?: Date;
    current_weight?: number;
    current_height?: number;
    goal_id?: number;
    // goal_status: 'in Process' | 'finished';
    target_weight?: number;
    form_status?: number; // if formstatus true that mean the form is completed and registred
    // if formstatus false that mean the form is not completed
}
