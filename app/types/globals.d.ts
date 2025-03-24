// src/globals.d.ts

export {}; // This makes the file an external module so we can safely augment the global scope

// Interfaces as defined in your profile code
interface User {
    username: string;
    countryCode?: string;
    biography?: string;
    sellerStatus?: string;
    businessType?: string;
    profileImage?: string;
}

interface UserInformation {
    username: string;
    password: string;
}

// Declare Swal as a global variable (using var with any type)


// Augment the global Window interface with your custom properties
declare global {
    interface Window {
        userinformation: UserInformation;
        buildProfileCard: () => Promise<void>;
        fetchProfileImage: (imageIdentifier: string) => Promise<string | null>;
    }
}
