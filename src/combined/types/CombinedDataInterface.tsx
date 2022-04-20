interface SwimDetails {
    event?: string;
    distance?: string;
    swimstyle?: string;
    points?: string;
    swimtime?: string;
} 
export interface CombinedInterface {
    firstname: string;
    lastname: string;
    place?: string;
    combinedpoints: string;
    birthdate: string;
    clubname: string;
    combined_name: string;
    data?: SwimDetails[]
}