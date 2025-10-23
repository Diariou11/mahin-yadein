import woman1 from "@/assets/profiles/woman-1.jpg";
import woman2 from "@/assets/profiles/woman-2.jpg";
import woman3 from "@/assets/profiles/woman-3.jpg";
import woman4 from "@/assets/profiles/woman-4.jpg";
import woman5 from "@/assets/profiles/woman-5.jpg";
import man1 from "@/assets/profiles/man-1.jpg";
import man2 from "@/assets/profiles/man-2.jpg";
import man3 from "@/assets/profiles/man-3.jpg";
import man4 from "@/assets/profiles/man-4.jpg";
import man5 from "@/assets/profiles/man-5.jpg";

const femaleNames = [
  "Aissatou", "Fatoumata", "Mariama", "Kadiatou", "Aminata", "Hawa", 
  "Safiatou", "Ramata", "Aïcha", "Fanta", "Binta", "Mabinty", "Hadja"
];

const womenProfiles = [woman1, woman2, woman3, woman4, woman5];
const menProfiles = [man1, man2, man3, man4, man5];

export const getProfileImage = (name: string): string => {
  // Check if the name is feminine
  const firstName = name.split(' ')[0];
  const isFemale = femaleNames.some(femaleName => 
    firstName.toLowerCase().includes(femaleName.toLowerCase())
  );

  // Get a consistent image based on name hash
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  if (isFemale) {
    return womenProfiles[hash % womenProfiles.length];
  } else {
    return menProfiles[hash % menProfiles.length];
  }
};
