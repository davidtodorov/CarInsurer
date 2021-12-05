export interface EventResponse {
    _id: string,
    date: Date;
    description: string;
    images: string[],
    insurance: {
        car: {
            plateNumber: string,
            owner: {
                firstName: string,
                lastName: string
            }
        },
    };
}